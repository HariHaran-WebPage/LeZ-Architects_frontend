import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useAppDispatch,  } from './useAppDispatch';
import {useAppSelector} from './useAppSelector'
import { updateFormData, submitContact, resetForm, clearError, validateField } from '../store/slices/contactSlice';
import { ContactFormData } from '../types/contact';

export const useContactForm = () => {
  const dispatch = useAppDispatch();
  const { formData, loading, success, error, fieldErrors } = useAppSelector((state) => state.contact);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Format phone number as user types
    if (name === 'phone') {
      // Remove all non-digits
      let digits = value.replace(/\D/g, '');
      
      // Limit to 10 digits for Indian mobile
      digits = digits.slice(0, 10);
      
      // Add space after 5 digits for better readability
      if (digits.length > 5) {
        processedValue = `${digits.slice(0, 5)} ${digits.slice(5)}`;
      } else {
        processedValue = digits;
      }
    }

    // Update form data
    dispatch(updateFormData({ [name]: processedValue }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Validate individual field on blur
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      dispatch(validateField({ field: name as keyof ContactFormData, value: digits }));
    } else {
      dispatch(validateField({ field: name as keyof ContactFormData, value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clean phone number before submission
    const cleanedFormData = {
      ...formData,
      phone: formData.phone.replace(/\D/g, '')
    };
    
    await dispatch(submitContact(cleanedFormData));
  };

  const resetContactForm = () => {
    dispatch(resetForm());
  };

  const clearContactError = () => {
    dispatch(clearError());
  };

  const setFormData = (data: Partial<ContactFormData>) => {
    dispatch(updateFormData(data));
  };

  // Check if form is valid
  const isFormValid = () => {
    return Object.keys(fieldErrors).length === 0 && 
           formData.name.trim().length >= 3 &&
           formData.city.trim().length >= 2 &&
           formData.phone.replace(/\D/g, '').length === 10 &&
           /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
           formData.message.trim().length >= 10;
  };

  return {
    formData,
    loading,
    success,
    error,
    fieldErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetContactForm,
    clearContactError,
    setFormData,
    isFormValid: isFormValid()
  };
};