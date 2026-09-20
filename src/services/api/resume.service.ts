import { apiClient } from '@/lib/api-client';
import { ResumeFormData } from '@/types/resume.types';
import { API_ENDPOINTS, getApiBaseUrl } from '@/constants/endpoints';

export interface ResumeSubmitResponse {
  id?: string | number;
  resume_id?: string | number;
  message?: string;
  success?: boolean;
  data?: any;
  [key: string]: any;
}

const normalizeDate = (val?: string | null): string | null => {
  if (!val || !val.trim()) return null;
  const trimmed = val.trim();
  // If YYYY-MM, append -01
  if (/^\d{4}-\d{2}$/.test(trimmed)) return `${trimmed}-01`;
  // If YYYY, append -01-01
  if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01-01`;
  // If valid ISO date YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  return null;
};

/**
 * Submit or save a resume to the backend API (POST /api/v1/resumes/)
 */
export const submitResume = async (data: ResumeFormData): Promise<ResumeSubmitResponse> => {
  const cleanedPayload = {
    full_name: data.full_name?.trim() || null,
    email: data.email?.trim() || 'user@example.com',
    phone: data.phone?.trim() || null,
    job_title: data.job_title?.trim() || null,
    professional_summary: data.professional_summary?.trim() || null,
    city: data.city?.trim() || null,
    state: data.state?.trim() || null,
    country: data.country?.trim() || null,
    linkedin_url: data.linkedin_url?.trim() || null,
    github_url: data.github_url?.trim() || null,
    portfolio_url: data.portfolio_url?.trim() || null,
    title: data.full_name ? `${data.full_name.trim()} Resume` : 'My Resume',
    template: data.template || 'executive',
    status: 'draft',
    experiences: (data.experiences || [])
      .filter(e => e.company_name?.trim() && e.job_title?.trim())
      .map((e, idx) => ({
        company_name: e.company_name.trim(),
        job_title: e.job_title.trim(),
        company_location: e.company_location?.trim() || null,
        company_url: e.company_url?.trim() || null,
        employment_type: e.employment_type?.trim() || null,
        start_date: normalizeDate(e.start_date) || '2020-01-01',
        end_date: e.currently_working ? null : normalizeDate(e.end_date),
        currently_working: Boolean(e.currently_working),
        description: e.description?.trim() || null,
        display_order: idx,
      })),
  };

  try {
    const response = await apiClient.post(API_ENDPOINTS.RESUME.SUBMIT, cleanedPayload);
    return response.data;
  } catch (error: any) {
    // If 404, retry with alternative path formatting
    if (error?.response?.status === 404) {
      try {
        const altEndpoint = API_ENDPOINTS.RESUME.SUBMIT.endsWith('/')
          ? API_ENDPOINTS.RESUME.SUBMIT.slice(0, -1)
          : `${API_ENDPOINTS.RESUME.SUBMIT}/`;
        const retryRes = await apiClient.post(altEndpoint, cleanedPayload);
        return retryRes.data;
      } catch (retryErr) {
        console.error('Error submitting resume on retry:', retryErr);
      }
    }
    console.error(`Error submitting resume to backend (${getApiBaseUrl()}${API_ENDPOINTS.RESUME.SUBMIT}):`, error);
    throw error;
  }
};

/**
 * Update an existing resume on the backend API (PUT http://127.0.0.1:8000/api/v1/resumes/:id)
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
