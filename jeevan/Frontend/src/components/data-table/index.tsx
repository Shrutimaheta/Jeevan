// index.tsx
import React, { useEffect, useState,  useCallback, useMemo } from "react";
import {  Select, Table } from "antd";
import type { DatatableProps } from "../../core/data/interface";
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { FixedSizeList as List } from 'react-window';
import type { TableRowSelection } from 'antd/es/table/interface';

const { Option } = Select;

const Datatable: React.FC<DatatableProps> = ({
  columns,
  dataSource,
  Selection,
  searchText,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [Selections, setSelections] = useState<boolean>(true);
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);

  const debouncedSearchText = useDebouncedValue(searchText, 300);

  useEffect(() => {
    setSelections(Boolean(Selection));
  }, [Selection]);

  // Memoize expensive filtering
  const filteredDataSource = useMemo(() => {
    if (!debouncedSearchText) return dataSource;
    return dataSource.filter((record) =>
      Object.values(record).some((field) =>
        String(field).toLowerCase().includes(debouncedSearchText.toLowerCase())
      )
    );
  }, [debouncedSearchText, dataSource]);

  useEffect(() => {
    setCurrent(1); // Reset to first page on search
  }, [debouncedSearchText, dataSource]);

  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, []);

  const rowSelection: TableRowSelection<any> = useMemo(() => ({
    selectedRowKeys,
    onChange: onSelectChange,
  }), [selectedRowKeys, onSelectChange]);

  const handlePageChange = useCallback((page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
  }, []);

  const paginatedData = useMemo(() =>
    filteredDataSource.slice((current - 1) * pageSize, current * pageSize),
    [filteredDataSource, current, pageSize]
  );

  // Helper to render a row for react-window
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <Table
      className="table-nowrap mb-3"
      rowSelection={Selections ? rowSelection : undefined}
      columns={columns}
      rowHoverable={false}
      dataSource={[paginatedData[index]]}
      pagination={false}
      style={style}
    />
  );

  return (
        <div className="row align-items-center mb-3">
           {/* Table */}
      {paginatedData.length > 50 ? (
        <List
          height={600}
          itemCount={paginatedData.length}
          itemSize={60}
          width="100%"
        >
          {Row}
        </List>
      ) : (
        <Table
          className="table-nowrap mb-3"
          rowSelection={Selections ? rowSelection : undefined}
          columns={columns}
          rowHoverable={false}
          dataSource={paginatedData}
          pagination={false} // disable built-in pagination
        />
      )}
      {/* Left side: show entries */}
      <div className="col-md-6">
        <div className="datatable-length">
          <label htmlFor="page-size-select">
          Showing 
            <Select
              id="page-size-select"
              value={pageSize}
              onChange={(value) => handlePageChange(1, value)} // reset to page 1
              style={{ width: 70, margin: '0 8px' }}
              size="small"
              aria-label="Select number of results per page"
            >
              <Option value={10}>10</Option>
              <Option value={25}>25</Option>
              <Option value={50}>50</Option>
              <Option value={100}>100</Option>
            </Select>
            Results
          </label>
        </div>
      </div>

      {/* Right side: pagination */}
      <div className="col-md-6 d-flex justify-content-end">
        {/* Custom Bootstrap-style Pagination */}
        <nav aria-label="Data table pagination">
          <ul className="pagination mb-0" role="list">
            {/* Prev button */}
            <li className={`paginate_button page-item previous${current === 1 ? ' disabled' : ''}`} id="DataTables_Table_0_previous">
              <a
                className="page-link"
                aria-disabled={current === 1}
                role="link"
                data-dt-idx="previous"
                tabIndex={current === 1 ? -1 : 0}
                onClick={() => current > 1 && handlePageChange(current - 1, pageSize)}
                style={{ cursor: current === 1 ? 'not-allowed' : 'pointer' }}
                aria-label="Go to previous page"
              >
                Prev
              </a>
            </li>
            {/* Page numbers */}
            {Array.from({ length: Math.ceil(filteredDataSource.length / pageSize) }, (_, idx) => {
              const pageNum = idx + 1;
              return (
                <li
                  key={pageNum}
                  className={`paginate_button page-item${current === pageNum ? ' active' : ''}`}
                  role="listitem"
                >
                  <a
                    href="#"
                    className="page-link"
                    role="link"
                    aria-current={current === pageNum ? 'page' : undefined}
                    data-dt-idx={idx}
                    tabIndex={0}
                    onClick={e => {
                      e.preventDefault();
                      if (current !== pageNum) handlePageChange(pageNum, pageSize);
                    }}
                    aria-label={`Go to page ${pageNum}`}
                  >
                    {pageNum}
                  </a>
                </li>
              );
            })}
            {/* Next button */}
            <li className={`paginate_button page-item next${current === Math.ceil(filteredDataSource.length / pageSize) || filteredDataSource.length === 0 ? ' disabled' : ''}`} id="DataTables_Table_0_next">
              <a
                className="page-link"
                aria-disabled={current === Math.ceil(filteredDataSource.length / pageSize) || filteredDataSource.length === 0}
                role="link"
                data-dt-idx="next"
                tabIndex={current === Math.ceil(filteredDataSource.length / pageSize) || filteredDataSource.length === 0 ? -1 : 0}
                onClick={e => {
                  e.preventDefault();
                  if (current < Math.ceil(filteredDataSource.length / pageSize)) handlePageChange(current + 1, pageSize);
                }}
                style={{ cursor: current === Math.ceil(filteredDataSource.length / pageSize) || filteredDataSource.length === 0 ? 'not-allowed' : 'pointer' }}
                aria-label="Go to next page"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default React.memo(Datatable);
