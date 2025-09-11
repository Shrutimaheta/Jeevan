// src/components/SearchInput.tsx

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className="datatable-search">
      <input
        type="search"
        className="form-control form-control-sm"
        placeholder="Search"
        aria-controls="DataTables_Table_0"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
