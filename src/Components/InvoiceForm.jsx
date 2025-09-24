import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaUpload, FaCalendarAlt, FaUsers, FaTags, FaStar, FaProjectDiagram, FaGlobe, FaClock } from 'react-icons/fa';
import { dummyClients, calculateInvoiceTotals, generateInvoiceId } from './InvoiceUtils';
import { validators, inputHandlers } from '../utils/validation';
import InvoiceImg from '../assets/Invoice.png';

export default function InvoiceForm({ invoice, onSave, onCancel, pipelines = [], users = [], priorities = [], tags = [] }) {
  const [realClients, setRealClients] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    clientId: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    clientPhone: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'Draft',
    lineItems: [{ desc: '', qty: 1, price: 0 }],
    taxRate: 18,
    discount: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: '',
    terms: 'Payment due within 30 days',
    projectRef: '',
    template: 'default',
    currency: 'INR',
    // Advanced CRM Features
    pipeline: 'Sales Pipeline',
    stage: 'Initial Contact',
    assignedTo: 'Amit Sharma',
    priority: 'medium',
    tags: [],
    expectedCloseDate: '',
    lastContactDate: new Date().toISOString().split('T')[0],
    source: 'Manual',
    recurring: false,
    recurringInterval: null,
    logo: null,
    // Supplier Details
    supplierName: '',
    supplierGSTIN: '',
    supplierAddress: '',
    supplierContact: '',
    supplierEmail: '',
    // Buyer Details (extended client info)
    buyerGSTIN: '',
    // Product Details (HSN/SAC will be per line item, handled below)
    // Bank Details
    bankName: '',
    bankAccount: '',
    bankIFSC: '',
    bankBranch: '',
    bankUPI: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [tagInput, setTagInput] = useState('');

  // Validation states
  const [supplierNameError, setSupplierNameError] = useState('');
  const [supplierGSTINError, setSupplierGSTINError] = useState('');
  const [supplierContactError, setSupplierContactError] = useState('');
  const [supplierEmailError, setSupplierEmailError] = useState('');
  const [buyerGSTINError, setBuyerGSTINError] = useState('');
  const [bankNameError, setBankNameError] = useState('');
  const [bankAccountError, setBankAccountError] = useState('');
  const [bankIFSCError, setBankIFSCError] = useState('');
  const [bankBranchError, setBankBranchError] = useState('');
  const [bankUPIError, setBankUPIError] = useState('');
  const [lineItemErrors, setLineItemErrors] = useState([]);

  // Fetch real clients from database
  useEffect(() => {
    fetch('/api/leads/emails/public')
      .then(res => res.json())
      .then(data => {
        if (data.emails && data.emails.length > 0) {
          console.log('✅ Real client emails loaded for invoice:', data.emails);
          // Convert emails to client objects
          const clients = data.emails.map((email, index) => ({
            id: `C-${String(index + 1).padStart(3, '0')}`,
            name: email.split('@')[0], // Use email prefix as name
            email: email,
            phone: '+91 9000000000',
            address: 'Address not available',
            company: email.split('@')[1].split('.')[0], // Use domain as company
            website: `www.${email.split('@')[1]}`,
            notes: 'Client from database',
            tags: ['database-client'],
            createdAt: new Date().toISOString().split('T')[0],
            lastContact: new Date().toISOString().split('T')[0]
          }));
          setRealClients(clients);
                 } else {
           console.log('⚠️ No real clients found in database');
           setRealClients([]);
         }
      })
             .catch(err => {
         console.log('❌ Failed to fetch real clients from database');
         setRealClients([]);
       });
  }, []);

  useEffect(() => {
    if (invoice) {
      console.log('Setting form data for editing:', invoice);
      // Map backend data to form format
      const mappedData = {
        id: invoice.id || '',
        clientId: invoice.clientId || '',
        clientName: invoice.clientName || '',
        clientEmail: invoice.clientEmail || '',
        clientAddress: invoice.clientAddress || '',
        clientPhone: invoice.clientPhone || '',
        date: invoice.date || new Date().toISOString().split('T')[0],
        dueDate: invoice.dueDate || '',
        status: invoice.status || 'Draft',
        lineItems: invoice.lineItems || [{ desc: '', qty: 1, price: 0 }],
        taxRate: invoice.taxRate || 18,
        discount: invoice.discount || 0,
        subtotal: invoice.subtotal || 0,
        tax: invoice.tax || 0,
        total: invoice.total || 0,
        notes: invoice.notes || '',
        terms: invoice.terms || 'Payment due within 30 days',
        projectRef: invoice.projectRef || '',
        template: invoice.template || 'default',
        currency: invoice.currency || 'INR',
        // Advanced CRM Features
        pipeline: invoice.pipeline || 'Sales Pipeline',
        stage: invoice.stage || 'Initial Contact',
        assignedTo: invoice.assignedTo || 'Amit Sharma',
        priority: invoice.priority || 'medium',
        tags: invoice.tags || [],
        expectedCloseDate: invoice.expectedCloseDate || '',
        lastContactDate: invoice.lastContactDate || new Date().toISOString().split('T')[0],
        source: invoice.source || 'Manual',
        recurring: invoice.recurring || false,
        recurringInterval: invoice.recurringInterval || null,
        logo: invoice.logo || null,
        // Supplier Details
        supplierName: invoice.supplierName || '',
        supplierGSTIN: invoice.supplierGSTIN || '',
        supplierAddress: invoice.supplierAddress || '',
        supplierContact: invoice.supplierContact || '',
        supplierEmail: invoice.supplierEmail || '',
        // Buyer Details
        buyerGSTIN: invoice.buyerGSTIN || '',
        // Bank Details
        bankName: invoice.bankName || '',
        bankAccount: invoice.bankAccount || '',
        bankIFSC: invoice.bankIFSC || '',
        bankBranch: invoice.bankBranch || '',
        bankUPI: invoice.bankUPI || '',
      };
      setFormData(mappedData);
    }
  }, [invoice]);

  // Initialize line item errors
  useEffect(() => {
    setLineItemErrors(formData.lineItems.map(() => ({ desc: '', qty: '', price: '', hsn: '' })));
  }, [formData.lineItems.length]);

  // Validation handlers
  const handleSupplierNameChange = (e) => {
    const value = e.target.value;
    if (validators.validateAlphabetOnly(value).isValid) {
      setFormData(prev => ({ ...prev, supplierName: value }));
      setSupplierNameError('');
    }
  };

  const handleSupplierGSTINChange = (e) => {
    const value = e.target.value.toUpperCase();
    setFormData(prev => ({ ...prev, supplierGSTIN: value }));
    if (value && !validators.validateGSTIN(value).isValid) {
      setSupplierGSTINError('Please enter a valid 15-character GSTIN');
    } else {
      setSupplierGSTINError('');
    }
  };

  const handleSupplierContactChange = (e) => {
    const value = e.target.value;
    if (validators.validatePhoneNumber(value).isValid) {
      setFormData(prev => ({ ...prev, supplierContact: value }));
      setSupplierContactError('');
    }
  };

  const handleSupplierEmailChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, supplierEmail: value }));
    if (value && !validators.validateEmail(value).isValid) {
      setSupplierEmailError('Please enter a valid email address');
    } else {
      setSupplierEmailError('');
    }
  };

  const handleBuyerGSTINChange = (e) => {
    const value = e.target.value.toUpperCase();
    setFormData(prev => ({ ...prev, buyerGSTIN: value }));
    if (value && !validators.validateGSTIN(value).isValid) {
      setBuyerGSTINError('Please enter a valid 15-character GSTIN');
    } else {
      setBuyerGSTINError('');
    }
  };

  const handleBankNameChange = (e) => {
    const value = e.target.value;
    if (validators.validateAlphabetOnly(value).isValid) {
      setFormData(prev => ({ ...prev, bankName: value }));
      setBankNameError('');
    }
  };

  const handleBankAccountChange = (e) => {
    const value = e.target.value;
    if (validators.validateBankAccount(value).isValid) {
      setFormData(prev => ({ ...prev, bankAccount: value }));
      setBankAccountError('');
    }
  };

  const handleBankIFSCChange = (e) => {
    const value = e.target.value.toUpperCase();
    setFormData(prev => ({ ...prev, bankIFSC: value }));
    if (value && !validators.validateIFSCCode(value).isValid) {
      setBankIFSCError('Please enter a valid 11-character IFSC code');
    } else {
      setBankIFSCError('');
    }
  };

  const handleBankBranchChange = (e) => {
    const value = e.target.value;
    if (validators.validateAlphabetOnly(value).isValid) {
      setFormData(prev => ({ ...prev, bankBranch: value }));
      setBankBranchError('');
    }
  };

  const handleBankUPIChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, bankUPI: value }));
    if (value && !validators.validateUPIID(value).isValid) {
      setBankUPIError('Please enter a valid UPI ID (username@provider)');
    } else {
      setBankUPIError('');
    }
  };

  const handleLineItemChange = (idx, field, value) => {
    const newLineItems = [...formData.lineItems];
    const newLineItemErrors = [...lineItemErrors];

    if (field === 'qty' || field === 'price') {
      if (validators.validatePositiveNumber(value).isValid) {
        newLineItems[idx] = { ...newLineItems[idx], [field]: parseFloat(value) || 0 };
        newLineItemErrors[idx] = { ...newLineItemErrors[idx], [field]: '' };
      }
    } else if (field === 'hsn') {
      if (validators.validateHSNSAC(value).isValid) {
        newLineItems[idx] = { ...newLineItems[idx], [field]: value };
        newLineItemErrors[idx] = { ...newLineItemErrors[idx], [field]: '' };
      }
    } else {
      newLineItems[idx] = { ...newLineItems[idx], [field]: value };
      newLineItemErrors[idx] = { ...newLineItemErrors[idx], [field]: '' };
    }

    setFormData(prev => ({ ...prev, lineItems: newLineItems }));
    setLineItemErrors(newLineItemErrors);
    calculateInvoiceTotals(newLineItems);
  };

  // Blur validation handlers
  const handleSupplierNameBlur = () => {
    if (formData.supplierName) {
      const validation = validators.validateAlphabetOnly(formData.supplierName, 'Supplier Name');
      if (!validation.isValid) {
        setSupplierNameError(validation.message);
      }
    }
  };

  const handleSupplierGSTINBlur = () => {
    if (formData.supplierGSTIN) {
      const validation = validators.validateGSTIN(formData.supplierGSTIN);
      if (!validation.isValid) {
        setSupplierGSTINError(validation.message);
      }
    }
  };

  const handleSupplierContactBlur = () => {
    if (formData.supplierContact) {
      const validation = validators.validatePhoneNumber(formData.supplierContact, 'Supplier Contact');
      if (!validation.isValid) {
        setSupplierContactError(validation.message);
      }
    }
  };

  const handleSupplierEmailBlur = () => {
    if (formData.supplierEmail) {
      const validation = validators.validateEmail(formData.supplierEmail);
      if (!validation.isValid) {
        setSupplierEmailError(validation.message);
      }
    }
  };

  const handleBuyerGSTINBlur = () => {
    if (formData.buyerGSTIN) {
      const validation = validators.validateGSTIN(formData.buyerGSTIN);
      if (!validation.isValid) {
        setBuyerGSTINError(validation.message);
      }
    }
  };

  const handleBankNameBlur = () => {
    if (formData.bankName) {
      const validation = validators.validateAlphabetOnly(formData.bankName, 'Bank Name');
      if (!validation.isValid) {
        setBankNameError(validation.message);
      }
    }
  };

  const handleBankAccountBlur = () => {
    if (formData.bankAccount) {
      const validation = validators.validateBankAccount(formData.bankAccount);
      if (!validation.isValid) {
        setBankAccountError(validation.message);
      }
    }
  };

  const handleBankIFSCBlur = () => {
    if (formData.bankIFSC) {
      const validation = validators.validateIFSCCode(formData.bankIFSC);
      if (!validation.isValid) {
        setBankIFSCError(validation.message);
      }
    }
  };

  const handleBankBranchBlur = () => {
    if (formData.bankBranch) {
      const validation = validators.validateAlphabetOnly(formData.bankBranch, 'Bank Branch');
      if (!validation.isValid) {
        setBankBranchError(validation.message);
      }
    }
  };

  const handleBankUPIBlur = () => {
    if (formData.bankUPI) {
      const validation = validators.validateUPIID(formData.bankUPI);
      if (!validation.isValid) {
        setBankUPIError(validation.message);
      }
    }
  };

  const handleLineItemBlur = (idx, field) => {
    const item = formData.lineItems[idx];
    const newLineItemErrors = [...lineItemErrors];

    if (field === 'qty' && item.qty) {
      const validation = validators.validatePositiveNumber(item.qty, 'Quantity');
      if (!validation.isValid) {
        newLineItemErrors[idx] = { ...newLineItemErrors[idx], qty: validation.message };
      }
    } else if (field === 'price' && item.price) {
      const validation = validators.validateNonNegativeNumber(item.price, 'Price');
      if (!validation.isValid) {
        newLineItemErrors[idx] = { ...newLineItemErrors[idx], price: validation.message };
      }
    } else if (field === 'hsn' && item.hsn) {
      const validation = validators.validateHSNSAC(item.hsn);
      if (!validation.isValid) {
        newLineItemErrors[idx] = { ...newLineItemErrors[idx], hsn: validation.message };
      }
    }

    setLineItemErrors(newLineItemErrors);
  };

  const addLineItem = () => {
    setFormData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { desc: '', qty: 1, price: 0 }]
    }));
  };

  const removeLineItem = (index) => {
    if (formData.lineItems.length > 1) {
      const newLineItems = formData.lineItems.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, lineItems: newLineItems }));
    }
  };

  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setFormData(prev => ({
      ...prev,
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      clientAddress: client.address,
      clientPhone: client.phone
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate totals
    const calculatedTotals = calculateInvoiceTotals(formData.lineItems, formData.taxRate, formData.discount);
    
    // Ensure all required fields have values with defaults
    const invoiceData = {
      ...formData,
      ...calculatedTotals,
      // Ensure required fields have default values if empty
      clientName: formData.clientName || 'Default Client',
      clientEmail: formData.clientEmail || 'client@example.com',
      total: calculatedTotals.total || 1000,
      status: formData.status || 'Draft',
      dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
      notes: formData.notes || 'Invoice description',
      assignedTo: formData.assignedTo || 'Amit Sharma',
      priority: formData.priority || 'Medium',
      pipeline: formData.pipeline || 'Sales Pipeline',
      stage: formData.stage || 'Initial Contact'
    };
    
    console.log('Submitting invoice data with all fields filled:', invoiceData);
    onSave(invoiceData);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(formData.currency === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: formData.currency,
    }).format(amount);
  };

  return (
    <div className="invoice-modal-backdrop">
      <div className="invoice-modal invoice-form-modal" style={{ borderRadius: '18px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', background: 'white', padding: 0 }}>
        <div className="invoice-modal-header" style={{ display: 'flex', alignItems: 'center', background: 'linear-gradient(90deg, #25d366 0%, #009688 100%)', borderTopLeftRadius: '18px', borderTopRightRadius: '18px', padding: '24px 32px', color: 'white', marginBottom: 0 }}>
          <img src={InvoiceImg} alt="Invoice" style={{ width: '36px', height: '36px', marginRight: '16px' }} />
          <h2 style={{ fontWeight: 700, fontSize: '1.6rem', margin: 0, flex: 1 }}>{invoice ? 'Edit Invoice' : 'Create New Invoice'}</h2>
          <button className="invoice-modal-close" onClick={onCancel} style={{ color: 'white', background: 'transparent', border: 'none', fontSize: '2rem', cursor: 'pointer' }}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="invoice-form" style={{ padding: '32px', borderRadius: '0 0 18px 18px', background: 'white' }}>
          {/* Supplier Details */}
          <div className="invoice-form-section" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src={InvoiceImg} alt="Supplier Info" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              <h3 style={{ fontWeight: 600, fontSize: '1.2rem', margin: 0, color: '#009688' }}>Supplier Details</h3>
            </div>
            <div className="invoice-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Supplier Name</label>
                <input type="text" value={formData.supplierName} onChange={handleSupplierNameChange} onBlur={handleSupplierNameBlur} placeholder="Your company name" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {supplierNameError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{supplierNameError}</p>}
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>GSTIN</label>
                <input type="text" value={formData.supplierGSTIN} onChange={handleSupplierGSTINChange} onBlur={handleSupplierGSTINBlur} placeholder="Supplier GSTIN" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {supplierGSTINError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{supplierGSTINError}</p>}
              </div>
              <div style={{ gridColumn: '1/3' }}>
                <label style={{ fontWeight: 500, color: '#333' }}>Supplier Address</label>
                <textarea value={formData.supplierAddress} onChange={e => handleInputChange('supplierAddress', e.target.value)} placeholder="Supplier address" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Contact</label>
                <input type="text" value={formData.supplierContact} onChange={handleSupplierContactChange} onBlur={handleSupplierContactBlur} placeholder="Supplier contact" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {supplierContactError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{supplierContactError}</p>}
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Email</label>
                <input type="email" value={formData.supplierEmail} onChange={handleSupplierEmailChange} onBlur={handleSupplierEmailBlur} placeholder="Supplier email" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {supplierEmailError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{supplierEmailError}</p>}
              </div>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '32px 0' }} />
          {/* Buyer Details (extra GSTIN field) */}
          <div className="invoice-form-section" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src={InvoiceImg} alt="Buyer Info" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              <h3 style={{ fontWeight: 600, fontSize: '1.2rem', margin: 0, color: '#009688' }}>Buyer Details</h3>
            </div>
            <div className="invoice-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>GSTIN</label>
                <input type="text" value={formData.buyerGSTIN} onChange={handleBuyerGSTINChange} onBlur={handleBuyerGSTINBlur} placeholder="Buyer GSTIN" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {buyerGSTINError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{buyerGSTINError}</p>}
              </div>
            </div>
          </div>
          {/* Basic Information */}
          <div className="invoice-form-section" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src={InvoiceImg} alt="Basic Info" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              <h3 style={{ fontWeight: 600, fontSize: '1.2rem', margin: 0, color: '#009688' }}>Basic Information</h3>
            </div>
            <div className="invoice-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Invoice ID</label>
                <input
                  type="text"
                  value={formData.id || generateInvoiceId()}
                  onChange={(e) => handleInputChange('id', e.target.value)}
                  placeholder="Auto-generated"
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                />
              </div>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '32px 0' }} />
          {/* Client Information */}
          <div className="invoice-form-section" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src={InvoiceImg} alt="Client Info" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              <h3 style={{ fontWeight: 600, fontSize: '1.2rem', margin: 0, color: '#009688' }}>Client Information</h3>
            </div>
            <div className="invoice-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Select a client</label>
                <select
                  value={formData.clientId}
                  onChange={(e) => {
                    const client = realClients.find(c => c.id === e.target.value);
                    handleClientSelect(client);
                  }}
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                >
                  <option value="">Select a client</option>
                  {realClients.map(client => (
                    <option key={client.id} value={client.id}>{client.name} ({client.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Client name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  placeholder="Client name"
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Client email</label>
                <input
                  type="email"
                  value={formData.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  placeholder="client@example.com"
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                />
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Client phone</label>
                <input
                  type="text"
                  value={formData.clientPhone}
                  onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                  placeholder="+91 9000000000"
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                />
              </div>
              <div style={{ gridColumn: '1/3' }}>
                <label style={{ fontWeight: 500, color: '#333' }}>Client address</label>
                <textarea
                  value={formData.clientAddress}
                  onChange={(e) => handleInputChange('clientAddress', e.target.value)}
                  placeholder="Client address"
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                />
              </div>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '32px 0' }} />
          {/* CRM Integration */}
          <div className="invoice-form-section" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src={InvoiceImg} alt="CRM" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              <h3 style={{ fontWeight: 600, fontSize: '1.2rem', margin: 0, color: '#009688' }}>CRM Integration</h3>
            </div>
            <div className="invoice-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Pipeline</label>
                <select
                  value={formData.pipeline}
                  onChange={(e) => handleInputChange('pipeline', e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                >
                  {pipelines.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Stage</label>
                <select
                  value={formData.stage}
                  onChange={(e) => handleInputChange('stage', e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                >
                  {pipelines.find(p => p.name === formData.pipeline)?.stages.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Assignee</label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                >
                  {users.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                >
                  {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ gridColumn: '1/3' }}>
                <label style={{ fontWeight: 500, color: '#333' }}>Tags</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }}
                  />
                  <button type="button" onClick={handleAddTag} style={{ background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>Add</button>
                </div>
                <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {formData.tags.map(tag => (
                    <span key={tag} style={{ background: '#e0f7fa', color: '#009688', borderRadius: '6px', padding: '4px 10px', fontSize: '13px', display: 'inline-flex', alignItems: 'center' }}>
                      {tag}
                      <button type="button" onClick={() => handleRemoveTag(tag)} style={{ background: 'none', border: 'none', color: '#009688', marginLeft: '6px', cursor: 'pointer', fontSize: '15px' }}>&times;</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Product Details (add HSN/SAC to each line item) */}
          <div className="invoice-form-section" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src={InvoiceImg} alt="Product Info" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              <h3 style={{ fontWeight: 600, fontSize: '1.2rem', margin: 0, color: '#009688' }}>Product/Service Details</h3>
            </div>
            <div>
              {formData.lineItems.map((item, idx) => (
                <div key={idx} className="product-line-grid">
                  <div>
                    <input 
                      type="text" 
                      value={item.desc} 
                      onChange={e => handleLineItemChange(idx, 'desc', e.target.value)} 
                      placeholder="Description" 
                      style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} 
                    />
                  </div>
                  <div>
                    <input 
                      type="number" 
                      value={item.qty} 
                      onChange={e => handleLineItemChange(idx, 'qty', e.target.value)} 
                      onBlur={() => handleLineItemBlur(idx, 'qty')}
                      placeholder="Qty" 
                      style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} 
                    />
                    {lineItemErrors[idx]?.qty && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{lineItemErrors[idx].qty}</p>}
                  </div>
                  <div>
                    <input 
                      type="number" 
                      value={item.price} 
                      onChange={e => handleLineItemChange(idx, 'price', e.target.value)} 
                      onBlur={() => handleLineItemBlur(idx, 'price')}
                      placeholder="Rate" 
                      style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} 
                    />
                    {lineItemErrors[idx]?.price && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{lineItemErrors[idx].price}</p>}
                  </div>
                  <div>
                    <input 
                      type="text" 
                      value={item.hsn || ''} 
                      onChange={e => handleLineItemChange(idx, 'hsn', e.target.value)} 
                      onBlur={() => handleLineItemBlur(idx, 'hsn')}
                      placeholder="HSN/SAC" 
                      style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} 
                    />
                    {lineItemErrors[idx]?.hsn && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{lineItemErrors[idx].hsn}</p>}
                  </div>
                  <button type="button" onClick={() => removeLineItem(idx)} style={{ background: '#ff6b35', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 12px', fontWeight: '600', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={addLineItem} style={{ background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: 600, marginTop: '10px', cursor: 'pointer' }}>Add Item</button>
            </div>
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '32px 0' }} />
          {/* Bank Details */}
          <div className="invoice-form-section" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img src={InvoiceImg} alt="Bank Info" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
              <h3 style={{ fontWeight: 600, fontSize: '1.2rem', margin: 0, color: '#009688' }}>Bank Details</h3>
            </div>
            <div className="invoice-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Bank Name</label>
                <input type="text" value={formData.bankName} onChange={handleBankNameChange} onBlur={handleBankNameBlur} placeholder="Bank name" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {bankNameError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{bankNameError}</p>}
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Account Number</label>
                <input type="text" value={formData.bankAccount} onChange={handleBankAccountChange} onBlur={handleBankAccountBlur} placeholder="Account number" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {bankAccountError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{bankAccountError}</p>}
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>IFSC</label>
                <input type="text" value={formData.bankIFSC} onChange={handleBankIFSCChange} onBlur={handleBankIFSCBlur} placeholder="IFSC code" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {bankIFSCError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{bankIFSCError}</p>}
              </div>
              <div>
                <label style={{ fontWeight: 500, color: '#333' }}>Branch</label>
                <input type="text" value={formData.bankBranch} onChange={handleBankBranchChange} onBlur={handleBankBranchBlur} placeholder="Branch" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {bankBranchError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{bankBranchError}</p>}
              </div>
              <div style={{ gridColumn: '1/3' }}>
                <label style={{ fontWeight: 500, color: '#333' }}>UPI</label>
                <input type="text" value={formData.bankUPI} onChange={handleBankUPIChange} onBlur={handleBankUPIBlur} placeholder="UPI ID" style={{ borderRadius: '8px', border: '1px solid #ddd', padding: '10px', width: '100%' }} />
                {bankUPIError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>{bankUPIError}</p>}
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '32px' }}>
            <button type="button" onClick={onCancel} style={{ border: '1px solid #25d366', background: 'white', color: '#25d366', borderRadius: '8px', padding: '12px 32px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ background: '#25d366', color: 'white', border: 'none', borderRadius: '8px', padding: '12px 32px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>{invoice ? 'Update' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  );
} 