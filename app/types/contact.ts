export interface ContactFormData {
  name: string;
  city: string;
  phone: string;
  email: string;
  message: string;
}

export interface SubmittedForm extends ContactFormData {
  submittedAt: string;
  id?: string;
}

export interface ContactState {
  formData: ContactFormData;
  loading: boolean;
  success: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
  submittedForms: SubmittedForm[];
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface ContactError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}