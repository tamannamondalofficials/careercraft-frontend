export const INDUSTRY_CATEGORIES = [
  { id: 'auto', label: '🎯 Auto Detect' },
  { id: 'software', label: '💻 Software / Tech' },
  { id: 'data', label: '📊 Data & AI' },
  { id: 'product', label: '🚀 Product & Agile' },
  { id: 'design', label: '🎨 UI/UX & Design' },
  { id: 'marketing', label: '📈 Marketing' },
  { id: 'finance', label: '💵 Finance & FP&A' },
  { id: 'sales', label: '🤝 Sales & BD' },
  { id: 'hr', label: '👥 HR & Talent' },
  { id: 'healthcare', label: '🩺 Healthcare' },
  { id: 'operations', label: '⚙️ Operations' },
  { id: 'education', label: '📚 Education' },
] as const;

export const SUGGESTED_SKILLS: Record<string, string[]> = {
  default: ['Project Management', 'Problem Solving', 'Leadership', 'Team Collaboration', 'Communication', 'Agile/Scrum', 'Data Analysis', 'Time Management', 'Critical Thinking'],
  software: ['React', 'TypeScript', 'JavaScript', 'Node.js', 'Next.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'REST APIs', 'GraphQL', 'Tailwind CSS', 'Git', 'CI/CD'],
  data: ['Python', 'SQL', 'Pandas', 'NumPy', 'Machine Learning', 'Tableau', 'Power BI', 'Data Visualization', 'R', 'BigQuery', 'Statistical Analysis'],
  product: ['Product Strategy', 'Roadmapping', 'User Stories', 'Agile / Scrum', 'Data Analytics', 'A/B Testing', 'Stakeholder Management', 'Market Research', 'Jira', 'OKRs'],
  design: ['Figma', 'UI/UX Design', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Adobe XD', 'Illustrator', 'Design Thinking', 'Usability Testing', 'WCAG'],
  marketing: ['SEO', 'Content Strategy', 'Google Analytics 4', 'Email Marketing', 'Copywriting', 'Social Media Marketing', 'Growth Marketing', 'HubSpot', 'Campaign Management', 'Meta Ads'],
  finance: ['Financial Modeling', 'FP&A', 'DCF Valuation', 'Budgeting & Forecasting', 'Variance Analysis', 'Advanced Excel (VBA)', 'Power BI', 'SQL', 'GAAP', 'Financial Reporting'],
  sales: ['B2B Sales', 'Enterprise Account Management', 'Sales Pipeline', 'Salesforce CRM', 'Lead Qualification', 'Negotiation', 'Cold Outreach', 'Contract Closing', 'HubSpot CRM'],
  hr: ['Talent Acquisition', 'Employee Relations', 'HR Operations', 'Performance Management', 'Onboarding', 'Payroll', 'Workday', 'BambooHR', 'Labor Law Compliance'],
  healthcare: ['Patient Care', 'Clinical Documentation', 'Electronic Health Records (EHR)', 'HIPAA Compliance', 'Triage', 'Medical Terminology', 'Vital Signs', 'Patient Education'],
  operations: ['Supply Chain Management', 'Process Optimization', 'Logistics', 'Vendor Management', 'Lean Six Sigma', 'Inventory Control', 'KPI Tracking', 'Procurement'],
  education: ['Curriculum Development', 'Instructional Design', 'Classroom Management', 'Educational Technology', 'Student Assessment', 'Differentiated Instruction', 'Lesson Planning']
};

export function detectIndustrySkills(jobTitle: string, selectedIndustry: string): string[] {
  if (selectedIndustry !== 'auto' && SUGGESTED_SKILLS[selectedIndustry]) {
    return SUGGESTED_SKILLS[selectedIndustry];
  }
  const title = (jobTitle || '').toLowerCase();
  if (title.includes('software') || title.includes('developer') || title.includes('engineer') || title.includes('frontend') || title.includes('backend') || title.includes('full stack') || title.includes('coder') || title.includes('web')) {
    return SUGGESTED_SKILLS.software;
  }
  if (title.includes('data') || title.includes('analyst') || title.includes('analytics') || title.includes('ml') || title.includes('ai') || title.includes('science') || title.includes('database')) {
    return SUGGESTED_SKILLS.data;
  }
  if (title.includes('design') || title.includes('ux') || title.includes('ui') || title.includes('product designer') || title.includes('creative') || title.includes('art') || title.includes('graphic')) {
    return SUGGESTED_SKILLS.design;
  }
  if (title.includes('product') || title.includes('scrum') || title.includes('agile') || title.includes('project') || title.includes('program')) {
    return SUGGESTED_SKILLS.product;
  }
  if (title.includes('market') || title.includes('seo') || title.includes('content') || title.includes('growth') || title.includes('social media') || title.includes('brand')) {
    return SUGGESTED_SKILLS.marketing;
  }
  if (title.includes('financ') || title.includes('account') || title.includes('audit') || title.includes('bank') || title.includes('tax') || title.includes('cpa') || title.includes('fp&a')) {
    return SUGGESTED_SKILLS.finance;
  }
  if (title.includes('sales') || title.includes('account executive') || title.includes('sdr') || title.includes('bdr') || title.includes('business dev') || title.includes('revenue')) {
    return SUGGESTED_SKILLS.sales;
  }
  if (title.includes('hr') || title.includes('human resources') || title.includes('recruit') || title.includes('people') || title.includes('talent') || title.includes('staffing')) {
    return SUGGESTED_SKILLS.hr;
  }
  if (title.includes('health') || title.includes('nurse') || title.includes('doctor') || title.includes('medical') || title.includes('clinic') || title.includes('pharm')) {
    return SUGGESTED_SKILLS.healthcare;
  }
  if (title.includes('operat') || title.includes('supply chain') || title.includes('logistic') || title.includes('procure') || title.includes('inventory')) {
    return SUGGESTED_SKILLS.operations;
  }
  if (title.includes('teach') || title.includes('educat') || title.includes('profess') || title.includes('instruct') || title.includes('tutor') || title.includes('school')) {
    return SUGGESTED_SKILLS.education;
  }
  return SUGGESTED_SKILLS.default;
}
