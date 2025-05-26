import { useDrag, useDrop } from 'react-dnd';
import { formatDate } from '../utils/dateUtils';

export const useDragEvent = (event) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'event',
    item: { id: event.id, event },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return { isDragging, drag };
};

export const useDropDate = (date, onMoveEvent) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'event',
    drop: (item) => {
      const newDate = formatDate(date);
      if (item.event.date !== newDate) {
        onMoveEvent(item.id, newDate);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return { isOver, canDrop, drop };
};