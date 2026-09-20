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
  'automate', 'automated', 'drive', 'driven', 'drove', 'grow', 'grew', 'grown', 'transform', 'transformed'
];

export function calculateAtsScore(data: ResumeFormData): AtsScoreResult {
  const checks: AtsCheckItem[] = [];

  // 1. Contact Info Complete (+20 pts)
  const hasName = Boolean(data.full_name?.trim() && data.full_name.trim().length >= 2);
  const hasEmail = Boolean(data.email?.trim() && /\S+@\S+\.\S+/.test(data.email));
  const hasPhone = Boolean(data.phone?.trim() && data.phone.trim().length >= 7);
  const hasLocation = Boolean((data.city || data.state || data.country)?.trim());
  const hasRole = Boolean(data.job_title?.trim());

  const contactCount = [hasName, hasEmail, hasPhone, hasLocation, hasRole].filter(Boolean).length;
  const contactPassed = contactCount >= 4;
  checks.push({
    id: 'contact_info',
    label: 'Contact Information & Target Title',
    category: 'contact',
    passed: contactPassed,
    score: contactCount * 4, // up to 20
    maxScore: 20,
    tip: !contactPassed ? 'Provide full name, valid email, phone number, and city/country.' : undefined
  });

  // 2. Professional Summary (+20 pts)
  const summaryText = data.professional_summary?.trim() || '';
  const wordCount = summaryText ? summaryText.split(/\s+/).length : 0;
  const summaryLengthValid = wordCount >= 20 && wordCount <= 75; // Ideal 25-60 words for 1-page ATS
  const hasSummaryKeywords = STRONG_ACTION_VERBS.some(v => summaryText.toLowerCase().includes(v));

  let summaryScore = 0;
  if (wordCount >= 10) summaryScore += 8;
  if (summaryLengthValid) summaryScore += 6;
  if (hasSummaryKeywords) summaryScore += 6;

  checks.push({
    id: 'summary_quality',
    label: 'Concise, Impactful Summary (25–60 words)',
    category: 'summary',
    passed: summaryScore >= 14,
    score: summaryScore,
    maxScore: 20,
    tip: summaryScore < 14 ? 'Keep summary between 25-60 words with strong career keywords.' : undefined
  });

  // 3. Work Experience with Metrics & Action Verbs (+25 pts)
  const experiences = (data.experiences || []).filter(e => e.company_name?.trim() || e.job_title?.trim());
  let expScore = 0;

  if (experiences.length > 0) expScore += 10;
  if (experiences.length >= 2) expScore += 5;

  // Check for bullet points with metrics (%, $, numbers) and action verbs
  const allExpDesc = experiences.map(e => e.description || '').join(' ');
  const hasMetrics = /[\d]+%|\$[\d]+|\b\d{2,}\b|\b\d+x\b/i.test(allExpDesc);
  const hasActionVerbs = STRONG_ACTION_VERBS.some(v => allExpDesc.toLowerCase().includes(v));

  if (hasMetrics) expScore += 5;
  if (hasActionVerbs) expScore += 5;

  checks.push({
    id: 'work_experience',
    label: 'Measurable Achievements & Action Verbs (%, $, metrics)',
    category: 'experience',
    passed: expScore >= 20,
    score: Math.min(expScore, 25),
    maxScore: 25,
    tip: expScore < 20 ? 'Add quantified results (e.g. "Increased conversion by 35%", "$1.2M ARR").' : undefined
  });

  // 4. Skills Density (+20 pts)
  const skillsList = (data.skills || '')
    .split(/[,•\n]/)
    .map(s => s.trim())
    .filter(Boolean);

  let skillsScore = 0;
  if (skillsList.length >= 3) skillsScore += 8;
  if (skillsList.length >= 6) skillsScore += 7;
  if (skillsList.length >= 10) skillsScore += 5;

  checks.push({
    id: 'skills_density',
    label: 'Target Industry Skills (6+ key skills)',
    category: 'skills',
    passed: skillsScore >= 15,
    score: Math.min(skillsScore, 20),
    maxScore: 20,
    tip: skillsScore < 15 ? 'Add at least 6 relevant technical/domain skills to match ATS keywords.' : undefined
  });

  // 5. Education & Credentials (+15 pts)
  const educations = (data.educations || []).filter(e => e.institution_name?.trim() || e.degree?.trim());
  let eduScore = 0;
  if (educations.length > 0) eduScore += 10;
  if (educations[0]?.degree?.trim() && educations[0]?.institution_name?.trim()) eduScore += 5;

  checks.push({
    id: 'education_complete',
    label: 'Education & Degree Credentials',
    category: 'education',
    passed: eduScore >= 15,
    score: eduScore,
    maxScore: 15,
    tip: eduScore < 15 ? 'Enter your highest degree and institution name.' : undefined
  });

  const totalScore = checks.reduce((sum, c) => sum + c.score, 0);
  const maxScore = 100;
  const percentage = Math.round((totalScore / maxScore) * 100);

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
