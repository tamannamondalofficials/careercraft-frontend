import { ResumeFormData } from '@/types/resume.types';
import { TabKey } from '@/components/resume/ResumeForm';

export interface TemplateProps {
  data: ResumeFormData;
  onSelectSection?: (section: TabKey) => void;
  hasName: boolean;
  hasTitle: boolean;
  hasEmail: boolean;
  hasPhone: boolean;
  hasLocation: boolean;
  hasLinkedin: boolean;
  hasGithub: boolean;
  hasSummary: boolean;
  hasExperiences: boolean;
  hasEducations: boolean;
  hasProjects: boolean;
  hasSkills: boolean;
  hasCertifications: boolean;
  nameVal: string;
  titleVal: string;
  emailVal: string;
  phoneVal: string;
  locationVal: string;
  githubVal?: string;
  linkedinVal?: string;
  summaryVal: string;
  expList: any[];
  eduList: any[];
  projList: any[];
  skillsList: string[];
  certList: string[];
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
