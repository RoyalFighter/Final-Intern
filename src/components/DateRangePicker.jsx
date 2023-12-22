import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = ({ fromDate, setFromDate, toDate, setToDate }) => {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <div className="flex flex-col items-center">
        <label className="text-sm text-gray-600 mb-1">From</label>
        <DatePicker
          selected={fromDate}
          onChange={(date) => setFromDate(date)}
          selectsStart
          startDate={fromDate}
          endDate={toDate}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      <div className="flex flex-col items-center">
        <label className="text-sm text-gray-600 mb-1">To</label>
        <DatePicker
          selected={toDate}
          onChange={(date) => setToDate(date)}
          selectsEnd
          startDate={fromDate}
          endDate={toDate}
          minDate={fromDate}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
