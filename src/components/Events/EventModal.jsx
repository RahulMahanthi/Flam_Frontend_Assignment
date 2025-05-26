import React from 'react';
import Modal from '../UI/Modal';
import EventForm from './EventForm';
import './Events.css'; // Assuming you have a CSS file for styling

const EventModal = ({
  isOpen,
  onClose,
  selectedDate,
  selectedEvent,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  events
}) => {
  const isEditing = !!selectedEvent;
  const title = isEditing ? 'Edit Event' : 'Add New Event';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <EventForm
        selectedDate={selectedDate}
        selectedEvent={selectedEvent}
        onSubmit={isEditing ? onUpdateEvent : onAddEvent}
        onDelete={isEditing ? onDeleteEvent : null}
        onCancel={onClose}
        events={events}
      />
    </Modal>
  );
};

export default EventModal;