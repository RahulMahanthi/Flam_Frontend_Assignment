import React, { useState, useEffect } from 'react';
import { formatDate, parseDateTime } from '../../utils/dateUtils';
import { hasEventConflict } from '../../utils/eventUtils';
import { EVENT_CATEGORIES, RECURRENCE_OPTIONS } from '../../utils/constants';

import './Events.css'; // Assuming you have a CSS file for styling
const EventForm = ({
  selectedDate,
  selectedEvent,
  onSubmit,
  onDelete,
  onCancel,
  events
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    category: 'work',
    isRecurring: false,
    recurrence: {
      type: 'none',
      interval: 1,
      customDays: 1
    },
    recurrenceEndDate: ''
  });

  const [errors, setErrors] = useState({});
  const [showConflictWarning, setShowConflictWarning] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      // Editing existing event
      setFormData({
        title: selectedEvent.title || '',
        description: selectedEvent.description || '',
        date: selectedEvent.date || '',
        time: selectedEvent.time || '',
        category: selectedEvent.category || 'work',
        isRecurring: selectedEvent.isRecurring || false,
        recurrence: selectedEvent.recurrence || { type: 'none', interval: 1, customDays: 1 },
        recurrenceEndDate: selectedEvent.recurrenceEndDate || ''
      });
    } else if (selectedDate) {
      // Adding new event
      setFormData(prev => ({
        ...prev,
        date: formatDate(selectedDate),
        time: '09:00'
      }));
    }
  }, [selectedEvent, selectedDate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('recurrence.')) {
      const recurrenceField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        recurrence: {
          ...prev.recurrence,
          [recurrenceField]: type === 'number' ? parseInt(value) || 1 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (formData.isRecurring && formData.recurrence.type !== 'none' && formData.recurrenceEndDate) {
      const startDate = new Date(formData.date);
      const endDate = new Date(formData.recurrenceEndDate);
      if (endDate <= startDate) {
        newErrors.recurrenceEndDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkForConflicts = () => {
    const eventData = {
      ...formData,
      id: selectedEvent?.id
    };

    const hasConflict = hasEventConflict(events, eventData, selectedEvent?.id);
    setShowConflictWarning(hasConflict);
    return hasConflict;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const hasConflict = checkForConflicts();
    
    if (hasConflict && !window.confirm('This event conflicts with an existing event. Do you want to continue?')) {
      return;
    }

    const eventData = {
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim()
    };

    if (selectedEvent) {
      onSubmit(selectedEvent.id, eventData);
    } else {
      onSubmit(eventData);
    }

    onCancel();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(selectedEvent.id);
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="form-group">
        <label htmlFor="title">Event Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={errors.title ? 'error' : ''}
          placeholder="Enter event title"
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={errors.date ? 'error' : ''}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="time">Time *</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
            className={errors.time ? 'error' : ''}
          />
          {errors.time && <span className="error-message">{errors.time}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
        >
          {EVENT_CATEGORIES.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          placeholder="Enter event description (optional)"
        />
      </div>

      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isRecurring"
            checked={formData.isRecurring}
            onChange={handleInputChange}
          />
          Recurring Event
        </label>
      </div>

      {formData.isRecurring && (
        <div className="recurring-options">
          <div className="form-group">
            <label htmlFor="recurrence-type">Repeat</label>
            <select
              id="recurrence-type"
              name="recurrence.type"
              value={formData.recurrence.type}
              onChange={handleInputChange}
            >
              {RECURRENCE_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {formData.recurrence.type !== 'none' && (
            <>
              <div className="form-group">
                <label htmlFor="recurrence-interval">Every</label>
                <input
                  type="number"
                  id="recurrence-interval"
                  name="recurrence.interval"
                  value={formData.recurrence.interval}
                  onChange={handleInputChange}
                  min="1"
                  max="365"
                />
                <span className="interval-label">
                  {formData.recurrence.type === 'daily' && 'day(s)'}
                  {formData.recurrence.type === 'weekly' && 'week(s)'}
                  {formData.recurrence.type === 'monthly' && 'month(s)'}
                  {formData.recurrence.type === 'custom' && 'day(s)'}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="recurrence-end">End Date (optional)</label>
                <input
                  type="date"
                  id="recurrence-end"
                  name="recurrenceEndDate"
                  value={formData.recurrenceEndDate}
                  onChange={handleInputChange}
                  min={formData.date}
                  className={errors.recurrenceEndDate ? 'error' : ''}
                />
                {errors.recurrenceEndDate && (
                  <span className="error-message">{errors.recurrenceEndDate}</span>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {showConflictWarning && (
        <div className="conflict-warning">
          ⚠️ This event conflicts with an existing event at the same time.
        </div>
      )}

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        {onDelete && (
          <button type="button" onClick={handleDelete} className="btn-danger">
            Delete
          </button>
        )}
        <button type="submit" className="btn-primary">
          {selectedEvent ? 'Update Event' : 'Add Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;