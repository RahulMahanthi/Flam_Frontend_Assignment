import React from 'react';
import CalendarDay from './CalendarDay';
import { getCalendarDays } from '../../utils/dateUtils';
import { DAYS_OF_WEEK } from '../../utils/constants';
import './Calendar.css'; // Assuming you have a CSS file for styling

const CalendarGrid = ({ 
  currentDate, 
  events, 
  onDateClick, 
  onEventClick, 
  onMoveEvent 
}) => {
  const calendarDays = getCalendarDays(currentDate);

  return (
    <div className="calendar-grid">
      <div className="day-headers">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="day-header">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      <div className="days-grid">
        {calendarDays.map(day => (
          <CalendarDay
            key={day.toISOString()}
            date={day}
            currentDate={currentDate}
            events={events}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
            onMoveEvent={onMoveEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;