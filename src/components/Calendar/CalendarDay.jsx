import React from 'react';
import { format } from 'date-fns';
import { getEventsForDate } from '../../utils/eventUtils';
import { isToday, isSameMonthAsDate } from '../../utils/dateUtils';
import { useDropDate } from '../../hooks/useDragAndDrop';
import EventItem from '../Events/EventItem';
import './Calendar.css'; // Assuming you have a CSS file for styling

const CalendarDay = ({ 
  date, 
  currentDate, 
  events, 
  onDateClick, 
  onEventClick, 
  onMoveEvent 
}) => {
  const dayEvents = getEventsForDate(events, date);
  const { isOver, canDrop, drop } = useDropDate(date, onMoveEvent);
  
  const isCurrentMonth = isSameMonthAsDate(date, currentDate);
  const isTodayDate = isToday(date);

  const dayClasses = [
    'calendar-day',
    !isCurrentMonth && 'other-month',
    isTodayDate && 'today',
    isOver && canDrop && 'drop-target'
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={drop}
      className={dayClasses}
      onClick={() => onDateClick(date)}
    >
      <div className="day-number">
        {format(date, 'd')}
      </div>
      <div className="day-events">
        {dayEvents.slice(0, 3).map(event => (
          <EventItem
            key={`${event.id}-${format(date, 'yyyy-MM-dd')}`}
            event={event}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
          />
        ))}
        {dayEvents.length > 3 && (
          <div className="more-events">
            +{dayEvents.length - 3} more
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;