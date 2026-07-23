import { ContactFormData, ContactResponse } from '../types/contact';

const API_BASE_URL = process.env.NEXT_PUBLIC_LEZ_ARCHITECTS_FRONTEND_URL;

export const submitContactForm = async (formData: ContactFormData): Promise<ContactResponse> => {
  try {

    const formattedFormData = {
      ...formData,
      phone: formData.phone.startsWith('+91') 
        ? formData.phone 
        : `+91${formData.phone.replace(/\D/g, '')}` 
    };

    const response = await fetch(`${API_BASE_URL}/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedFormData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit form');
    }

    const data = await response.json();
    return {
      success: data.success,
      message: data.message,
      data: data.data || null
    };
  } catch (error: any) {
    console.error('Contact service error:', error);
    throw error;
  }
};

// Format phone number for display
export const formatIndianPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const digits = cleaned.replace(/^91/, ''); // Remove leading 91
  
  if (digits.length === 10) {
    return `+91 ${digits.slice(0,5)} ${digits.slice(5)}`;
  }
  return phone;
};