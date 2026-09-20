export interface Experience {
  company_name: string;
  company_location: string;
  company_url: string;
  job_title: string;
  employment_type: string;
  start_date: string;
  end_date: string;
  currently_working: boolean;
  description: string;
  display_order: number;
}

export interface Education {
  institution_name: string;
  institution_location: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  currently_studying: boolean;
  description: string;
  display_order: number;
}

export interface ResumeFormData {
  full_name: string;
  email: string;
  phone: string;
  job_title: string;
  professional_summary: string;
  city: string;
  state: string;
  country: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  title: string;
  template: string;
  status: string;
  experiences: Experience[];
  educations: Education[];
  skills: string;
}

export interface ResumeGenerationResponse {
  resumeId: string;
  downloadUrl?: string;
  status: 'pending' | 'completed' | 'failed';
}
