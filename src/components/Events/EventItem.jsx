import React from 'react';
import { useDragEvent } from '../../hooks/useDragAndDrop';
import { EVENT_CATEGORIES } from '../../utils/constants';
import './Events.css'; // Assuming you have a CSS file for styling

const EventItem = ({ event, onClick }) => {
  const { isDragging, drag } = useDragEvent(event);
  const category = EVENT_CATEGORIES.find(cat => cat.value === event.category);
  
  return (
    <div
      ref={drag}
      className={`event-item ${isDragging ? 'dragging' : ''}`}
      style={{ backgroundColor: category?.color || '#6b7280' }}
      onClick={onClick}
    >
      <div className="event-title">
        {event.title}
      </div>
      {event.time && (
        <div className="event-time">
          {event.time}
        </div>
      )}
      {event.isRecurring && (
        <div className="event-recurring">
          ↻
        </div>
      )}
    </div>
  );
};

export default EventItem;