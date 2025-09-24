// Validation utility functions for CRM application

// Validation patterns
export const PATTERNS = {
  // Only alphabets and spaces
  ALPHABET_ONLY: /^[a-zA-Z\s]*$/,
  
  // Only numbers
  NUMBERS_ONLY: /^[0-9]*$/,
  
  // Numbers with decimal points (for prices, quantities)
  DECIMAL_NUMBERS: /^[0-9]*\.?[0-9]*$/,
  
  // Phone number (10 digits, optionally with +91 prefix)
  PHONE_NUMBER: /^(\+91\s?)?[0-9]{10}$/,
  
  // GSTIN (15 characters, alphanumeric)
  GSTIN: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
  
  // IFSC Code (11 characters, alphanumeric)
  IFSC_CODE: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  
  // Bank account number (9-18 digits)
  BANK_ACCOUNT: /^[0-9]{9,18}$/,
  
  // UPI ID (username@provider format)
  UPI_ID: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/,
  
  // Website URL
  WEBSITE_URL: /^https?:\/\/[\w.-]+(?:\.[\w\.-]+)+(?:[\/#?].*)?$/,
  
  // HSN/SAC code (4-8 digits)
  HSN_SAC: /^[0-9]{4,8}$/,
  
  // Postal code (6 digits for India)
  POSTAL_CODE: /^[0-9]{6}$/,
  
  // PAN number (10 characters, alphanumeric)
  PAN_NUMBER: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
  
  // Aadhar number (12 digits)
  AADHAR_NUMBER: /^[0-9]{12}$/,
  
  // Credit card number (13-19 digits)
  CREDIT_CARD: /^[0-9]{13,19}$/,
  
  // CVV (3-4 digits)
  CVV: /^[0-9]{3,4}$/,
  
  // Expiry date (MM/YY format)
  EXPIRY_DATE: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
  
  // Only special characters (for specific fields)
  SPECIAL_CHARS_ONLY: /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  
  // Alphanumeric with spaces
  ALPHANUMERIC_WITH_SPACES: /^[a-zA-Z0-9\s]*$/,
  
  // Alphanumeric with some special characters
  ALPHANUMERIC_WITH_SPECIAL: /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
};

// Validation functions
export const validators = {
  // Validate alphabet only input
  validateAlphabetOnly: (value, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.ALPHABET_ONLY.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should contain only alphabets and spaces` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate numbers only input
  validateNumbersOnly: (value, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.NUMBERS_ONLY.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should contain only numbers` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate decimal numbers
  validateDecimalNumbers: (value, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.DECIMAL_NUMBERS.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should contain only numbers and decimal points` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate phone number
  validatePhoneNumber: (value, fieldName = 'Phone Number') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.PHONE_NUMBER.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be a valid 10-digit number (e.g., 9876543210 or +91 9876543210)` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate GSTIN
  validateGSTIN: (value, fieldName = 'GSTIN') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.GSTIN.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be a valid 15-character GSTIN format` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate IFSC Code
  validateIFSCCode: (value, fieldName = 'IFSC Code') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.IFSC_CODE.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be a valid 11-character IFSC code` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate bank account number
  validateBankAccount: (value, fieldName = 'Bank Account') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.BANK_ACCOUNT.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be 9-18 digits` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate UPI ID
  validateUPIID: (value, fieldName = 'UPI ID') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.UPI_ID.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be in format: username@provider` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate website URL
  validateWebsiteURL: (value, fieldName = 'Website URL') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.WEBSITE_URL.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be a valid URL starting with http:// or https://` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate HSN/SAC code
  validateHSNSAC: (value, fieldName = 'HSN/SAC') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.HSN_SAC.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be 4-8 digits` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate postal code
  validatePostalCode: (value, fieldName = 'Postal Code') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.POSTAL_CODE.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be 6 digits` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate PAN number
  validatePANNumber: (value, fieldName = 'PAN Number') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.PAN_NUMBER.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be a valid 10-character PAN format` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate Aadhar number
  validateAadharNumber: (value, fieldName = 'Aadhar Number') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.AADHAR_NUMBER.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be 12 digits` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate credit card number
  validateCreditCard: (value, fieldName = 'Credit Card') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.CREDIT_CARD.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be 13-19 digits` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate CVV
  validateCVV: (value, fieldName = 'CVV') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.CVV.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be 3-4 digits` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate expiry date
  validateExpiryDate: (value, fieldName = 'Expiry Date') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.EXPIRY_DATE.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be in MM/YY format` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate special characters only
  validateSpecialCharsOnly: (value, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.SPECIAL_CHARS_ONLY.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should contain only special characters` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate alphanumeric with spaces
  validateAlphanumericWithSpaces: (value, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.ALPHANUMERIC_WITH_SPACES.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should contain only letters, numbers, and spaces` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate alphanumeric with special characters
  validateAlphanumericWithSpecial: (value, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    if (!PATTERNS.ALPHANUMERIC_WITH_SPECIAL.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should contain only letters, numbers, spaces, and special characters` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate email
  validateEmail: (value, fieldName = 'Email') => {
    if (!value) return { isValid: true, message: '' };
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return { 
        isValid: false, 
        message: `${fieldName} should be a valid email address` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate password strength
  validatePassword: (value, fieldName = 'Password') => {
    if (!value) return { isValid: true, message: '' };
    if (value.length < 6) {
      return { 
        isValid: false, 
        message: `${fieldName} should be at least 6 characters long` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate required field
  validateRequired: (value, fieldName = 'Field') => {
    if (!value || value.trim() === '') {
      return { 
        isValid: false, 
        message: `${fieldName} is required` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate minimum length
  validateMinLength: (value, minLength, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    if (value.length < minLength) {
      return { 
        isValid: false, 
        message: `${fieldName} should be at least ${minLength} characters long` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate maximum length
  validateMaxLength: (value, maxLength, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    if (value.length > maxLength) {
      return { 
        isValid: false, 
        message: `${fieldName} should not exceed ${maxLength} characters` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate range (for numbers)
  validateRange: (value, min, max, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < min || numValue > max) {
      return { 
        isValid: false, 
        message: `${fieldName} should be between ${min} and ${max}` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate positive number
  validatePositiveNumber: (value, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      return { 
        isValid: false, 
        message: `${fieldName} should be a positive number` 
      };
    }
    return { isValid: true, message: '' };
  },

  // Validate non-negative number
  validateNonNegativeNumber: (value, fieldName = 'Field') => {
    if (!value) return { isValid: true, message: '' };
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) {
      return { 
        isValid: false, 
        message: `${fieldName} should be a non-negative number` 
      };
    }
    return { isValid: true, message: '' };
  },
};

// Input validation handlers for real-time validation
export const inputHandlers = {
  // Handle alphabet only input
  handleAlphabetOnly: (e, setValue, setError) => {
    const value = e.target.value;
    if (PATTERNS.ALPHABET_ONLY.test(value)) {
      setValue(value);
      setError('');
    }
  },

  // Handle numbers only input
  handleNumbersOnly: (e, setValue, setError) => {
    const value = e.target.value;
    if (PATTERNS.NUMBERS_ONLY.test(value)) {
      setValue(value);
      setError('');
    }
  },

  // Handle decimal numbers input
  handleDecimalNumbers: (e, setValue, setError) => {
    const value = e.target.value;
    if (PATTERNS.DECIMAL_NUMBERS.test(value)) {
      setValue(value);
      setError('');
    }
  },

  // Handle phone number input
  handlePhoneNumber: (e, setValue, setError) => {
    const value = e.target.value;
    // Allow typing, validate on blur
    setValue(value);
    if (value && !PATTERNS.PHONE_NUMBER.test(value)) {
      setError('Please enter a valid 10-digit phone number');
    } else {
      setError('');
    }
  },

  // Handle GSTIN input
  handleGSTIN: (e, setValue, setError) => {
    const value = e.target.value.toUpperCase();
    setValue(value);
    if (value && !PATTERNS.GSTIN.test(value)) {
      setError('Please enter a valid 15-character GSTIN');
    } else {
      setError('');
    }
  },

  // Handle IFSC code input
  handleIFSCCode: (e, setValue, setError) => {
    const value = e.target.value.toUpperCase();
    setValue(value);
    if (value && !PATTERNS.IFSC_CODE.test(value)) {
      setError('Please enter a valid 11-character IFSC code');
    } else {
      setError('');
    }
  },

  // Handle bank account input
  handleBankAccount: (e, setValue, setError) => {
    const value = e.target.value;
    if (PATTERNS.NUMBERS_ONLY.test(value)) {
      setValue(value);
      setError('');
    }
  },

  // Handle UPI ID input
  handleUPIID: (e, setValue, setError) => {
    const value = e.target.value;
    setValue(value);
    if (value && !PATTERNS.UPI_ID.test(value)) {
      setError('Please enter a valid UPI ID (username@provider)');
    } else {
      setError('');
    }
  },

  // Handle website URL input
  handleWebsiteURL: (e, setValue, setError) => {
    const value = e.target.value;
    setValue(value);
    if (value && !PATTERNS.WEBSITE_URL.test(value)) {
      setError('Please enter a valid URL starting with http:// or https://');
    } else {
      setError('');
    }
  },

  // Handle HSN/SAC input
  handleHSNSAC: (e, setValue, setError) => {
    const value = e.target.value;
    if (PATTERNS.NUMBERS_ONLY.test(value)) {
      setValue(value);
      setError('');
    }
  },

  // Handle postal code input
  handlePostalCode: (e, setValue, setError) => {
    const value = e.target.value;
    if (PATTERNS.NUMBERS_ONLY.test(value) && value.length <= 6) {
      setValue(value);
      setError('');
    }
  },

  // Handle PAN number input
  handlePANNumber: (e, setValue, setError) => {
    const value = e.target.value.toUpperCase();
    setValue(value);
    if (value && !PATTERNS.PAN_NUMBER.test(value)) {
      setError('Please enter a valid 10-character PAN');
    } else {
      setError('');
    }
  },

  // Handle Aadhar number input
  handleAadharNumber: (e, setValue, setError) => {
    const value = e.target.value;
    if (PATTERNS.NUMBERS_ONLY.test(value) && value.length <= 12) {
      setValue(value);
      setError('');
    }
  },

  // Handle credit card input
  handleCreditCard: (e, setValue, setError) => {
    const value = e.target.value;
    if (PATTERNS.NUMBERS_ONLY.test(value) && value.length <= 19) {
      setValue(value);
      setError('');
    }
  },

  // Handle CVV input
  handleCVV: (e, setValue, setError) => {
    const value = e.target.value;
    if (PATTERNS.NUMBERS_ONLY.test(value) && value.length <= 4) {
      setValue(value);
      setError('');
    }
  },

  // Handle expiry date input
  handleExpiryDate: (e, setValue, setError) => {
    const value = e.target.value;
    setValue(value);
    if (value && !PATTERNS.EXPIRY_DATE.test(value)) {
      setError('Please enter in MM/YY format');
    } else {
      setError('');
    }
  },
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(fieldName => {
    const rules = validationRules[fieldName];
    const value = formData[fieldName];
    
    rules.forEach(rule => {
      const validation = rule.validator(value, rule.fieldName || fieldName);
      if (!validation.isValid) {
        errors[fieldName] = validation.message;
        isValid = false;
      }
    });
  });

  return { isValid, errors };
};

// Export default validation object
export default {
  PATTERNS,
  validators,
  inputHandlers,
  validateForm,
};

