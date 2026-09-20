export interface TemplateOption {
  id: 'executive' | 'modern' | 'minimal' | 'elegant' | 'compact';
  name: string;
  category: 'ats' | 'tech' | 'executive';
  badge: string;
  description: string;
  features: string[];
  accentColor: string;
}

export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'executive',
    name: 'Executive (Word Style)',
    category: 'executive',
    badge: 'Most Popular / Word CV',
    description: 'Modeled directly from executive Word resumes with deep navy accents and pipe contact lines.',
    features: ['Deep navy (#17365D) uppercase headers', 'Pipe-separated contact info', 'Standard ATS bullet layout'],
    accentColor: '#17365D'
  },
  {
    id: 'modern',
    name: 'Modern Creative Tech',
    category: 'tech',
    badge: 'Top Choice for Developers',
    description: 'Contemporary indigo styling with timeline indicators, badge pills, and high visual contrast.',
    features: ['Vibrant indigo accents', 'Skill pill badges', 'Interactive timeline dots'],
    accentColor: '#4F46E5'
  },
  {
    id: 'minimal',
    name: 'Minimalist Clean ATS',
    category: 'ats',
    badge: '100% ATS Optimized',
    description: 'Clean monochrome layout, monospaced metadata, and ultra-high readability for automated screening.',
    features: ['High ATS pass rate', 'Monospace font accents', 'Clean horizontal rule dividers'],
    accentColor: '#0F172A'
  },
  {
    id: 'elegant',
    name: 'Classic Elegant Serif',
    category: 'executive',
    badge: 'Leadership & Consulting',
    description: 'Sophisticated editorial serif typography with centered headers and tasteful border lines.',
    features: ['Classic editorial serif font', 'Centered header presentation', 'Ideal for executive roles'],
    accentColor: '#44403C'
  },
  {
    id: 'compact',
    name: 'Compact 2-Column Tech',
    category: 'tech',
    badge: 'Modern Sidebar',
    description: 'Dual-column layout with dark tech sidebar for skills/contact and high-density project showcase.',
    features: ['Slate sidebar for tech stack', 'High information density', 'Perfect for 1-page resumes'],
    accentColor: '#0F172A'
  }
];
