import { DateRangePicker } from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useState } from 'react';

// Helper to format date as "11 July 25"
function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short', // changed from 'long' to 'short'
    year: '2-digit',
  });
}

export default function PredefinedDatePicker() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

  const initialSettings = {
    startDate: startOfToday,
    endDate: endOfToday,
    ranges: {
      'Last 30 Days': [
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29, 0, 0, 0, 0),
        endOfToday,
      ],
      'Last 7 Days': [
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0, 0),
        endOfToday,
      ],
      'Last Month': [
        startOfLastMonth,
        endOfLastMonth,
      ],
      'This Month': [
        startOfMonth,
        endOfMonth,
      ],
      Today: [
        startOfToday,
        endOfToday,
      ],
      Yesterday: [
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0, 0),
        new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59, 999),
      ],
    },
    timePicker: false,
    locale: {
      format: 'DD MMM YY', // changed from 'DD MMMM YY' to 'DD MMM YY'
    },
  };

  const [displayValue, setDisplayValue] = useState(
    `${formatDate(startOfToday)} - ${formatDate(endOfToday)}`
  );

  // Always format the input value when the picker is shown
  const handleShow = (_event: any, picker: any) => {
    setDisplayValue(
      `${formatDate(picker.startDate.toDate())} - ${formatDate(picker.endDate.toDate())}`
    );
  };

  const handleApply = (_event: any, picker: any) => {
    setDisplayValue(
      `${formatDate(picker.startDate.toDate())} - ${formatDate(picker.endDate.toDate())}`
    );
  };

  return (
    <div className='reportrange-picker bg-white d-flex align-items-center'>
  
      <i className="ti ti-calendar text-body fs-14 me-1" />
      <DateRangePicker
        initialSettings={initialSettings}
        onApply={handleApply}
        onShow={handleShow}
      >
        <span className="reportrange-picker-field">
          {displayValue}
        </span>
      </DateRangePicker>
    </div>
  );
}
