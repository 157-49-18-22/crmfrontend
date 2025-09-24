import React, { useState } from 'react';
import './NewTaskModal.css';
import { validators } from '../utils/validation';

const quickOptions = [
  'In 15 minutes',
  'In 30 minutes',
  'In an hour',
  'Today',
  'Tomorrow',
  'This week',
  'In 7 days',
  'In 30 days',
  'In 1 year',
];

const timeSlots = [
  '12:00AM', '12:30AM', '1:00AM', '1:30AM', '2:00AM', '2:30AM', '3:00AM', '3:30AM',
  '4:00AM', '4:30AM', '5:00AM', '5:30AM', '6:00AM', '6:30AM', '7:00AM', '7:30AM',
  '8:00AM', '8:30AM', '9:00AM', '9:30AM', '10:00AM', '10:30AM', '11:00AM', '11:30AM',
  '12:00PM', '12:30PM', '1:00PM', '1:30PM', '2:00PM', '2:30PM', '3:00PM', '3:30PM',
  '4:00PM', '4:30PM', '5:00PM', '5:30PM', '6:00PM', '6:30PM', '7:00PM', '7:30PM',
  '8:00PM', '8:30PM', '9:00PM', '9:30PM', '10:00PM', '10:30PM', '11:00PM', '11:30PM',
];

function getMonthMatrix(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDay = d.getDay();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  let matrix = [];
  let week = [];
  let dayNum = 1 - firstDay;
  for (let i = 0; i < 6; i++) {
    week = [];
    for (let j = 0; j < 7; j++) {
      let day = new Date(date.getFullYear(), date.getMonth(), dayNum);
      week.push(day);
      dayNum++;
    }
    matrix.push(week);
  }
  return matrix;
}

export default function NewTaskModal({ open, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0,10));
  
  // Validation states
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  if (!open) return null;

  // Validation handlers
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (titleError) setTitleError('');
    
    if (value && !validators.validateRequired(value).isValid) {
      setTitleError('Title is required');
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (descriptionError) setDescriptionError('');
    
    if (value && !validators.validateMaxLength(value, 500).isValid) {
      setDescriptionError('Description should not exceed 500 characters');
    }
  };

  // Blur validation handlers
  const handleTitleBlur = () => {
    if (title) {
      const validation = validators.validateRequired(title, 'Title');
      if (!validation.isValid) {
        setTitleError(validation.message);
      }
    }
  };

  const handleDescriptionBlur = () => {
    if (description) {
      const validation = validators.validateMaxLength(description, 500, 'Description');
      if (!validation.isValid) {
        setDescriptionError(validation.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate before submission
    const titleValidation = validators.validateRequired(title, 'Title');
    const descriptionValidation = description ? validators.validateMaxLength(description, 500, 'Description') : { isValid: true, message: '' };
    
    if (!titleValidation.isValid) {
      setTitleError(titleValidation.message);
      return;
    }
    
    if (!descriptionValidation.isValid) {
      setDescriptionError(descriptionValidation.message);
      return;
    }
    
    if (!title.trim()) return;
    
    onAdd({ title, description, due_date: dueDate });
    setTitle('');
    setDescription('');
    setDueDate(new Date().toISOString().slice(0,10));
    setTitleError('');
    setDescriptionError('');
    onClose();
  };

  return (
    <div className="calendar-newtask-overlay" onClick={onClose}>
      <div className="calendar-newtask-modal" onClick={e => e.stopPropagation()}>
        <div className="calendar-newtask-header">New Task</div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              className={`calendar-newtask-input ${titleError ? 'calendar-newtask-input-error' : ''}`}
              placeholder="Title"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              required
            />
            {titleError && <div className="calendar-newtask-error">{titleError}</div>}
          </div>
          
          <div>
            <textarea
              className={`calendar-newtask-textarea ${descriptionError ? 'calendar-newtask-textarea-error' : ''}`}
              placeholder="Description (optional, max 500 characters)"
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
              maxLength={500}
            />
            {descriptionError && <div className="calendar-newtask-error">{descriptionError}</div>}
            {description && <div className="calendar-newtask-char-count">{description.length}/500</div>}
          </div>
          
          <input
            className="calendar-newtask-input"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
          <div className="calendar-newtask-actions">
            <button type="submit" className="calendar-newtask-save">Save</button>
            <button type="button" className="calendar-newtask-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
} 