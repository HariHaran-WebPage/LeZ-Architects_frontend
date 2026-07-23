import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { submitContactForm } from '../../services/contactService';
import { ContactFormData, ContactState } from '../../types/contact';

const initialState: ContactState = {
  formData: {
    name: '',
    city: '',
    phone: '',
    email: '',
    message: ''
  },
  loading: false,
  success: false,
  error: null,
  fieldErrors: {},
  submittedForms: []
};

// Validation function
export const validateFormData = (formData: ContactFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  // Name validation: at least 3 letters
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Name must be at least 3 characters long';
  } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
    errors.name = 'Name can only contain letters and spaces';
  }

  // City validation: at least 2 letters
  if (!formData.city.trim()) {
    errors.city = 'City is required';
  } else if (formData.city.trim().length < 2) {
    errors.city = 'City must be at least 2 characters long';
  } else if (!/^[A-Za-z\s]+$/.test(formData.city)) {
    errors.city = 'City can only contain letters and spaces';
  }

  const cleaned = formData.phone.replace(/\D/g, '');
  const digits = cleaned.replace(/^91/, ''); 
  
  if (!cleaned) {
    errors.phone = 'Phone number is required';
  } else if (digits.length !== 10) {
    errors.phone = 'Phone number must be 10 digits';
  } else if (!/^[6-9]/.test(digits)) {
    errors.phone = 'Indian mobile number must start with 6, 7, 8, or 9';
  }


  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Message validation: at least 10 characters
  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }

  return errors;
};

// Async thunk for submitting contact form
export const submitContact = createAsyncThunk(
  'contact/submitContact',
  async (formData: ContactFormData, { rejectWithValue }) => {
    try {
      // Validate before submission
      const errors = validateFormData(formData);
      if (Object.keys(errors).length > 0) {
        return rejectWithValue({ message: 'Validation failed', errors });
      }

      const response = await submitContactForm(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to submit form');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<ContactFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
      // Clear field error when user starts typing
      const fieldName = Object.keys(action.payload)[0];
      if (fieldName && state.fieldErrors[fieldName]) {
        delete state.fieldErrors[fieldName];
      }
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.success = false;
      state.error = null;
      state.fieldErrors = {};
    },
    clearError: (state) => {
      state.error = null;
    },
    setFieldError: (state, action: PayloadAction<{ field: string; error: string }>) => {
      state.fieldErrors[action.payload.field] = action.payload.error;
    },
    validateField: (state, action: PayloadAction<{ field: keyof ContactFormData; value: string }>) => {
      const { field, value } = action.payload;
      const errors = validateFormData({ ...state.formData, [field]: value });
      if (errors[field]) {
        state.fieldErrors[field] = errors[field];
      } else {
        delete state.fieldErrors[field];
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.fieldErrors = {};
        state.submittedForms.push({
          ...state.formData,
          submittedAt: new Date().toISOString()
        });
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        
        const payload = action.payload as any;
        if (payload?.errors) {
          state.fieldErrors = payload.errors;
          state.error = 'Please fix the validation errors';
        } else {
          state.error = payload as string || 'Failed to submit form';
        }
      });
  }
});

export const { updateFormData, resetForm, clearError, setFieldError, validateField } = contactSlice.actions;
export default contactSlice.reducer;