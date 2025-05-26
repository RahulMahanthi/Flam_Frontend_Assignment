import React from 'react';
import { format } from 'date-fns';
import './Calendar.css'; // Assuming you have a CSS file for styling

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth }) => {
  return (
    <div className="calendar-header">
      <button className="nav-button" onClick={onPrevMonth}>
        ‹
      </button>
      <h2 className="month-year">
        {format(currentDate, 'MMMM yyyy')}
      </h2>
      <button className="nav-button" onClick={onNextMonth}>
        ›
      </button>
    </div>
  );
};

export default CalendarHeader;