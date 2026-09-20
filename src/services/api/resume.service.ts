import { apiClient } from '@/lib/api-client';
import { ResumeFormData } from '@/types/resume.types';
import { API_ENDPOINTS } from '@/constants/endpoints';

export interface ResumeSubmitResponse {
  id?: string | number;
  resume_id?: string | number;
  message?: string;
  success?: boolean;
  data?: any;
  [key: string]: any;
}

/**
 * Submit or save a resume to the backend API (POST http://127.0.0.1:8000/api/resumes)
 */
export const submitResume = async (data: ResumeFormData): Promise<ResumeSubmitResponse> => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.RESUME.SUBMIT, data);
    return response.data;
  } catch (error: any) {
    console.error('Error submitting resume to backend:', error);
    throw error;
  }
};

/**
 * Update an existing resume on the backend API (PUT http://127.0.0.1:8000/api/resumes/:id)
 */
export const updateResume = async (id: string | number, data: ResumeFormData): Promise<ResumeSubmitResponse> => {
  try {
    const response = await apiClient.put(API_ENDPOINTS.RESUME.UPDATE(id), data);
    return response.data;
  } catch (error: any) {
    console.error(`Error updating resume ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch a resume by ID from backend API
 */
export const getResumeById = async (id: string | number): Promise<ResumeFormData> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.RESUME.GET_BY_ID(id));
    return response.data?.data || response.data;
  } catch (error: any) {
    console.error(`Error fetching resume ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch list of saved resumes
 */
export const listResumes = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.RESUME.LIST);
    return response.data?.data || response.data;
  } catch (error: any) {
    console.error('Error fetching resume list:', error);
    throw error;
  }
};
