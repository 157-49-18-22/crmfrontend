import React, { useRef, useState } from 'react';
import './Task.css';

export default function Files({ leadId }) {
  const [files, setFiles] = useState([
    { id: 1, name: 'contract.pdf', size: '2.5MB', date: '2024-07-19' },
    { id: 2, name: 'design.png', size: '1.2MB', date: '2024-07-20' },
  ]);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInput = useRef();

  // File validation constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain', 'text/csv'
  ];

  const validateFile = (file) => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB` };
    }
    
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { isValid: false, message: 'File type not supported. Please upload images, documents, or spreadsheets.' };
    }
    
    return { isValid: true, message: '' };
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Clear previous messages
    setUploadError('');
    setUploadSuccess('');
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      setUploadError(validation.message);
      fileInput.current.value = '';
      return;
    }
    
    // File is valid, add to list
    setFiles([
      ...files,
      { 
        id: Date.now(), 
        name: file.name, 
        size: (file.size/1024/1024).toFixed(1) + 'MB', 
        date: new Date().toISOString().slice(0,10) 
      },
    ]);
    
    setUploadSuccess(`File "${file.name}" uploaded successfully!`);
    fileInput.current.value = '';
    
    // Clear success message after 3 seconds
    setTimeout(() => setUploadSuccess(''), 3000);
  };

  const handleDelete = (id) => setFiles(files.filter(f => f.id !== id));

  return (
    <div className="crm-task-wrapper">
      <div className="crm-task-header">
        <span>Files</span>
      </div>
      
      <div style={{marginBottom: 12}}>
        <input 
          type="file" 
          ref={fileInput} 
          style={{marginBottom: 8}} 
          onChange={handleUpload}
          accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv"
        />
        <div style={{fontSize: '0.8em', color: '#666', marginBottom: 8}}>
          Supported formats: Images (JPG, PNG, GIF, WebP), Documents (PDF, DOC, DOCX), Spreadsheets (XLS, XLSX), Text (TXT, CSV)
          <br />
          Max file size: 10MB
        </div>
        
        {uploadError && (
          <div style={{color: 'red', fontSize: '0.9em', marginBottom: 8}}>
            {uploadError}
          </div>
        )}
        
        {uploadSuccess && (
          <div style={{color: 'green', fontSize: '0.9em', marginBottom: 8}}>
            {uploadSuccess}
          </div>
        )}
      </div>
      
      <ul className="crm-task-list">
        {files.map(file => (
          <li key={file.id} className="crm-task-item">
            <div className="crm-task-main">
              <div className="crm-task-title" style={{fontWeight:500}}>{file.name}</div>
              <div className="crm-task-meta">{file.size} • {file.date}</div>
            </div>
            <div className="crm-task-actions">
              <button className="crm-task-delete-btn" onClick={()=>handleDelete(file.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 