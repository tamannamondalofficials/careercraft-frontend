import { ResumeFormData } from '@/types/resume.types';

export interface AtsCheckItem {
  id: string;
  label: string;
  category: 'contact' | 'summary' | 'experience' | 'skills' | 'education' | 'formatting';
  passed: boolean;
  score: number;
  maxScore: number;
  tip?: string;
}

export interface AtsScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  rating: 'Excellent' | 'Great' | 'Good' | 'Needs Improvement';
  color: string;
  checks: AtsCheckItem[];
  tips: string[];
}

const STRONG_ACTION_VERBS = [
  'lead', 'led', 'architect', 'architected', 'build', 'built', 'engineer', 'engineered',
  'scale', 'scaled', 'develop', 'developed', 'design', 'designed', 'launch', 'launched',
  'optimize', 'optimized', 'reduce', 'reduced', 'increase', 'increased', 'manage', 'managed',
  'spearhead', 'spearheaded', 'deliver', 'delivered', 'create', 'created', 'implement', 'implemented',
  'automate', 'automated', 'drive', 'driven', 'drove', 'grow', 'grew', 'grown', 'transform', 'transformed',
  'coordinate', 'coordinated', 'support', 'supported', 'maintain', 'maintained', 'collaborate', 'collaborated'
];

export function calculateAtsScore(data?: ResumeFormData | null): AtsScoreResult {
  const checks: AtsCheckItem[] = [];

  if (!data) {
    return {
      totalScore: 100,
      maxScore: 100,
      percentage: 100,
      rating: 'Excellent',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      checks: [],
      tips: []
    };
  }

  // 1. Contact Info Complete (+20 pts)
  const hasName = Boolean(data.full_name?.trim());
  const hasEmail = Boolean(data.email?.trim());
  const hasPhone = Boolean(data.phone?.trim());
  const hasLocation = Boolean((data.city || data.state || data.country)?.trim());
  const hasRole = Boolean(data.job_title?.trim());

  const contactCount = [hasName, hasEmail, hasPhone, hasLocation, hasRole].filter(Boolean).length;
  const contactScore = Math.min(contactCount * 4, 20);
  const contactPassed = contactScore >= 16;

  checks.push({
    id: 'contact_info',
    label: 'Contact Information & Target Role',
    category: 'contact',
    passed: contactPassed,
    score: contactScore,
    maxScore: 20,
    tip: !contactPassed ? 'Add full name, email, phone number, and location.' : undefined
  });

  // 2. Professional Summary (+20 pts)
  const summaryText = data.professional_summary?.trim() || '';
  const wordCount = summaryText ? summaryText.split(/\s+/).filter(Boolean).length : 0;
  const hasSummaryKeywords = STRONG_ACTION_VERBS.some(v => summaryText.toLowerCase().includes(v));

  let summaryScore = 0;
  if (wordCount >= 5) summaryScore += 10;
  if (wordCount >= 15) summaryScore += 5;
  if (hasSummaryKeywords || wordCount >= 25) summaryScore += 5;
  summaryScore = Math.min(summaryScore, 20);

  checks.push({
    id: 'summary_quality',
    label: 'Impactful Professional Summary',
    category: 'summary',
    passed: summaryScore >= 15,
    score: summaryScore,
    maxScore: 20,
    tip: summaryScore < 15 ? 'Add a 2–3 line summary highlighting your core skills and impact.' : undefined
  });

  // 3. Work Experience with Metrics & Action Verbs (+25 pts)
  const experiences = (data.experiences || []).filter(e => e.company_name?.trim() || e.job_title?.trim());
  let expScore = 0;

  if (experiences.length >= 1) expScore += 15;
  if (experiences.length >= 2) expScore += 5;

  const allExpDesc = experiences.map(e => e.description || '').join(' ');
  const hasMetricsOrVerbs = /[\d]+%|\$[\d]+|\b\d{2,}\b|\b\d+x\b/i.test(allExpDesc) || STRONG_ACTION_VERBS.some(v => allExpDesc.toLowerCase().includes(v));

  if (hasMetricsOrVerbs || allExpDesc.trim().length > 30) {
    expScore += 5;
  }
  expScore = Math.min(expScore, 25);

  checks.push({
    id: 'work_experience',
    label: 'Work Experience & Action Bullet Points',
    category: 'experience',
    passed: expScore >= 20,
    score: expScore,
    maxScore: 25,
    tip: expScore < 20 ? 'Add at least 1 work role with bullet points describing your achievements.' : undefined
  });

  // 4. Skills Density (+20 pts)
  const skillsList = (data.skills || '')
    .split(/[,•\n]/)
    .map(s => s.trim())
    .filter(Boolean);

  let skillsScore = 0;
  if (skillsList.length >= 1) skillsScore += 10;
  if (skillsList.length >= 3) skillsScore += 5;
  if (skillsList.length >= 6) skillsScore += 5;
  skillsScore = Math.min(skillsScore, 20);

  checks.push({
    id: 'skills_density',
    label: 'Industry Skills & Keyword Density',
    category: 'skills',
    passed: skillsScore >= 15,
    score: skillsScore,
    maxScore: 20,
    tip: skillsScore < 15 ? 'List relevant technical & domain skills separated by commas.' : undefined
  });

  // 5. Education & Credentials (+15 pts)
  const educations = (data.educations || []).filter(e => e.institution_name?.trim() || e.degree?.trim());
  let eduScore = 0;
  if (educations.length >= 1) eduScore += 10;
  if (educations[0]?.degree?.trim() && educations[0]?.institution_name?.trim()) eduScore += 5;
  eduScore = Math.min(eduScore, 15);

  checks.push({
    id: 'education_complete',
    label: 'Education Credentials & Degree',
    category: 'education',
    passed: eduScore >= 10,
    score: eduScore,
    maxScore: 15,
    tip: eduScore < 10 ? 'Enter your degree and college/university name.' : undefined
  });

  const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
  const maxScore = 100;
  const percentage = Math.max(Math.min(Math.round((totalScore / maxScore) * 100), 100), 0);

  let rating: AtsScoreResult['rating'] = 'Needs Improvement';
  let color = 'text-amber-600 bg-amber-50 border-amber-200';

  if (percentage >= 90) {
    rating = 'Excellent';
    color = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  } else if (percentage >= 75) {
    rating = 'Great';
    color = 'text-indigo-700 bg-indigo-50 border-indigo-200';
  } else if (percentage >= 60) {
    rating = 'Good';
    color = 'text-blue-700 bg-blue-50 border-blue-200';
  }

  const tips = checks
    .filter(c => !c.passed && c.tip)
    .map(c => c.tip as string);

  return {
    totalScore,
    maxScore,
    percentage,
    rating,
    color,
    checks,
    tips
  };
}

