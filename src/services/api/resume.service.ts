import { apiClient } from '@/lib/api-client';
import { ResumeFormData, ResumeGenerationResponse } from '@/types/resume.types';
import { ApiResponse } from '@/types/api.types';

export const generateResume = async (data: ResumeFormData): Promise<ApiResponse<ResumeGenerationResponse>> => {
  const response = await apiClient.post<ApiResponse<ResumeGenerationResponse>>('/resume/generate', data);
  return response.data;
};
