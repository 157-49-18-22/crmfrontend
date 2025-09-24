import React, { useEffect, useState } from 'react';
import './Task.css';
import { validators } from '../utils/validation';

// Static user list for assignment
const users = [
  { id: 1, name: 'Abhishek Kumar' },
  { id: 2, name: 'Ayush Singh' },
  { id: 3, name: 'Komal Sharma' },
];

// Dummy tasksAPI (replace with your actual API import)
import { tasksAPI } from '../services/api';

export default function Task({ leadId }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    due_date: '',
    assigned_to: users[0].id,
  });
  const [error, setError] = useState('');
  
  // Validation states
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  // Fetch tasks for this lead
  useEffect(() => {
    setLoading(true);
    tasksAPI.getAll().then(res => {
      if (res.data && res.data.tasks) {
        setTasks(res.data.tasks.filter(t => t.leadId === leadId));
      }
    }).catch(() => setTasks([])).finally(() => setLoading(false));
  }, [leadId]);

  // Validation handlers
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, title: value }));
    if (titleError) setTitleError('');
    
    if (value && !validators.validateRequired(value).isValid) {
      setTitleError('Title is required');
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setForm(prev => ({ ...prev, description: value }));
    if (descriptionError) setDescriptionError('');
    
    if (value && !validators.validateMaxLength(value, 500).isValid) {
      setDescriptionError('Description should not exceed 500 characters');
    }
  };

  // Blur validation handlers
  const handleTitleBlur = () => {
    if (form.title) {
      const validation = validators.validateRequired(form.title, 'Title');
      if (!validation.isValid) {
        setTitleError(validation.message);
      }
    }
  };

  const handleDescriptionBlur = () => {
    if (form.description) {
      const validation = validators.validateMaxLength(form.description, 500, 'Description');
      if (!validation.isValid) {
        setDescriptionError(validation.message);
      }
    }
  };

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    
    // Validate before submission
    const titleValidation = validators.validateRequired(form.title, 'Title');
    const descriptionValidation = form.description ? validators.validateMaxLength(form.description, 500, 'Description') : { isValid: true, message: '' };
    
    if (!titleValidation.isValid) {
      setTitleError(titleValidation.message);
      return;
    }
    
    if (!descriptionValidation.isValid) {
      setDescriptionError(descriptionValidation.message);
      return;
    }
    
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    
    setError('');
    try {
      const res = await tasksAPI.create({ ...form, leadId });
      setTasks([...tasks, res.data]);
      setForm({ title: '', description: '', due_date: '', assigned_to: users[0].id });
      setShowForm(false);
      setTitleError('');
      setDescriptionError('');
      window.dispatchEvent(new CustomEvent('tasks-updated'));
    } catch (err) {
      setError('Failed to add task');
    }
  };

  // Update status
  const handleStatusChange = async (task, status) => {
    try {
      await tasksAPI.update(task.id, { ...task, status });
      setTasks(tasks.map(t => t.id === task.id ? { ...t, status } : t));
      window.dispatchEvent(new CustomEvent('tasks-updated'));
    } catch {}
  };

  // Delete task
  const handleDelete = async (taskId) => {
    try {
      await tasksAPI.delete(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
      window.dispatchEvent(new CustomEvent('tasks-updated'));
    } catch {}
  };

  const resetForm = () => {
    setForm({ title: '', description: '', due_date: '', assigned_to: users[0].id });
    setTitleError('');
    setDescriptionError('');
    setShowForm(false);
  };

  return (
    <div className="crm-task-wrapper">
      <div className="crm-task-header">
        <span>Tasks</span>
        <button className="crm-task-add-btn" onClick={() => setShowForm(f => !f)}>
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>
      {showForm && (
        <form className="crm-task-form" onSubmit={handleAddTask}>
          <div>
            <input
              className={`crm-task-input ${titleError ? 'crm-task-input-error' : ''}`}
              placeholder="Title"
              value={form.title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              required
            />
            {titleError && <div className="crm-task-error">{titleError}</div>}
          </div>
          
          <div>
            <textarea
              className={`crm-task-input ${descriptionError ? 'crm-task-input-error' : ''}`}
              placeholder="Description (optional, max 500 characters)"
              value={form.description}
              onChange={handleDescriptionChange}
              onBlur={handleDescriptionBlur}
              maxLength={500}
            />
            {descriptionError && <div className="crm-task-error">{descriptionError}</div>}
            {form.description && <div className="crm-task-char-count">{form.description.length}/500</div>}
          </div>
          
          <input
            className="crm-task-input"
            type="date"
            value={form.due_date}
            onChange={e => setForm({ ...form, due_date: e.target.value })}
          />
          
          <select
            className="crm-task-input"
            value={form.assigned_to}
            onChange={e => setForm({ ...form, assigned_to: parseInt(e.target.value) })}
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          
          <div className="crm-task-actions">
            <button type="submit" className="crm-task-submit">Add Task</button>
            <button type="button" className="crm-task-cancel" onClick={resetForm}>Cancel</button>
          </div>
        </form>
      )}
      
      {error && <div className="crm-task-error-message">{error}</div>}
      
      <div className="crm-task-list">
        {tasks.map(task => (
          <div key={task.id} className="crm-task-item">
            <div className="crm-task-content">
              <h4>{task.title}</h4>
              {task.description && <p>{task.description}</p>}
              <div className="crm-task-meta">
                <span>Due: {task.due_date}</span>
                <span>Assigned: {users.find(u => u.id === task.assigned_to)?.name}</span>
              </div>
            </div>
            <div className="crm-task-actions">
              <select
                value={task.status || 'pending'}
                onChange={e => handleStatusChange(task, e.target.value)}
                className="crm-task-status"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button onClick={() => handleDelete(task.id)} className="crm-task-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
