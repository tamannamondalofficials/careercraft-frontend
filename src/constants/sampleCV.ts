import { ResumeFormData } from '@/types/resume.types';

export interface ProfessionSample {
  id: string;
  name: string;
  role: string;
  category: string;
  icon: string;
  data: ResumeFormData;
}

export const EXECUTIVE_TEMPLATE_SAMPLE: ResumeFormData = {
  full_name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 234-5678',
  job_title: 'Senior Full Stack Developer',
  professional_summary: 'Senior Full Stack Developer with 5+ years of experience architecting and delivering high-performance, scalable web applications using React, TypeScript, Next.js, Node.js, and PostgreSQL. Proven expertise in microservices design, REST/GraphQL APIs, cloud infrastructure, and modern frontend design systems.',
  city: 'San Francisco',
  state: 'CA',
  country: 'United States',
  linkedin_url: 'linkedin.com/in/alexmorgan',
  github_url: 'github.com/alexmorgan-dev',
  portfolio_url: '',
  title: 'Senior Developer Resume',
  template: 'executive',
  status: 'draft',
  skills: 'JavaScript (ES6+), TypeScript, Python, React.js, Next.js, Redux, HTML5, CSS3, Tailwind CSS, Node.js, Express.js, PostgreSQL, Prisma ORM, MongoDB, Docker, AWS, Git, GitHub, REST APIs, GraphQL, Agile/Scrum',
  experiences: [
    {
      company_name: 'Apex Cloud Solutions',
      company_location: 'San Francisco, CA',
      company_url: '',
      job_title: 'Lead Full Stack Engineer',
      employment_type: 'Full-time',
      start_date: '2022-04',
      end_date: '',
      currently_working: true,
      description: '• Architected a high-throughput microservices layer serving 500k+ MAU with 99.9% uptime.\n• Migrated legacy monolithic services to modern Node.js and Next.js, cutting latency by 40%.\n• Integrated multiple payment gateways and automated reconciliation pipelines.\n• Mentored a squad of 6 engineers, introduced automated CI/CD, and improved code quality metrics.',
      display_order: 0,
    },
    {
      company_name: 'InnovateTech Labs',
      company_location: 'Austin, TX',
      company_url: '',
      job_title: 'Full Stack Developer',
      employment_type: 'Full-time',
      start_date: '2020-06',
      end_date: '2022-03',
      currently_working: false,
      description: '• Engineered core SaaS analytics portal with React, TypeScript, Tailwind CSS, and Redux Toolkit.\n• Built robust RESTful APIs with Node.js and PostgreSQL using Prisma ORM with role-based access.\n• Implemented automated integration tests with Jest, boosting overall test coverage to 92%.',
      display_order: 1,
    }
  ],
  educations: [
    {
      institution_name: 'University of California, Berkeley',
      institution_location: 'Berkeley, CA',
      degree: 'Bachelor of Science in Computer Science',
      field_of_study: 'Computer Science',
      start_date: '2015-08',
      end_date: '2019-05',
      currently_studying: false,
      description: 'GPA: 3.85 / 4.0 • Focus on Distributed Systems & Cloud Architecture',
      display_order: 0,
    }
  ],
  projects: [
    {
      title: 'CloudPulse – Real-Time Observability Platform',
      subtitle: 'Open Source Highlight',
      technologies: 'Next.js, TypeScript, PostgreSQL, Docker',
      description: 'Built an open-source observability platform with live metrics dashboard and role-based access. Over 1,200 GitHub stars and 20k+ downloads.',
      display_order: 0,
    }
  ],
  certifications: '✓ AWS Certified Solutions Architect • ✓ Meta Certified Frontend Developer • ✓ Docker Certified Associate'
};

export const PRODUCT_MANAGEMENT_SAMPLE: ResumeFormData = {
  full_name: 'Elena Rostova',
  email: 'elena.rostova@example.com',
  phone: '+1 (555) 345-6789',
  job_title: 'Senior Product Manager',
  professional_summary: 'Impact-driven Senior Product Manager with 6+ years of experience leading cross-functional teams from discovery to launch across B2B SaaS and consumer mobile products. Proven track record of scaling ARR from $2M to $12M, optimizing product-market fit, and running high-velocity user experimentation.',
  city: 'New York',
  state: 'NY',
  country: 'United States',
  linkedin_url: 'linkedin.com/in/elenarostova',
  github_url: '',
  portfolio_url: 'elenarostova.com',
  title: 'Product Manager Resume',
  template: 'executive',
  status: 'draft',
  skills: 'Product Strategy, Roadmap Planning, Customer Discovery, Agile/Scrum, User Stories, OKRs, A/B Testing, Data Analytics (Mixpanel, Amplitude), SQL, Jira/Confluence, Wireframing, Stakeholder Management, GTM Strategy',
  experiences: [
    {
      company_name: 'Vanguard SaaS Platforms',
      company_location: 'New York, NY',
      company_url: '',
      job_title: 'Senior Product Manager',
      employment_type: 'Full-time',
      start_date: '2021-08',
      end_date: '',
      currently_working: true,
      description: '• Spearheaded end-to-end launch of AI-driven workflow engine, driving $4.2M new ARR in first 12 months.\n• Led cross-functional squad of 12 engineers, 2 UX designers, and dedicated product marketing managers.\n• Reduced onboarding churn by 32% through data-backed friction point discovery and UX redesign.',
      display_order: 0,
    },
    {
      company_name: 'Apex Consumer Apps',
      company_location: 'Boston, MA',
      company_url: '',
      job_title: 'Product Manager',
      employment_type: 'Full-time',
      start_date: '2018-05',
      end_date: '2021-07',
      currently_working: false,
      description: '• Managed core mobile app experience across iOS and Android with 1.8M active monthly users.\n• Shipped 40+ iterative A/B experiments that boosted Day-30 user retention by 18%.\n• Facilitated sprint planning, backlog grooming, and quarterly roadmap alignment with executive stakeholders.',
      display_order: 1,
    }
  ],
  educations: [
    {
      institution_name: 'Columbia University',
      institution_location: 'New York, NY',
      degree: 'Master of Science in Technology Management',
      field_of_study: 'Product & Tech Strategy',
      start_date: '2016-09',
      end_date: '2018-05',
      currently_studying: false,
      description: 'Dean’s Honor List • Focus on Product Analytics and Decision Sciences',
      display_order: 0,
    }
  ],
  projects: [
    {
      title: 'GrowthLoop – PLG Funnel Optimization Framework',
      subtitle: 'Case Study',
      technologies: 'Amplitude, Mixpanel, Figma, Notion',
      description: 'Designed a product-led growth onboarding funnel adopted across 3 internal product lines.',
      display_order: 0,
    }
  ],
  certifications: '✓ Certified Scrum Product Owner (CSPO) • ✓ Reforge Growth Series • ✓ Pragmatic Institute Certified'
};

export const MARKETING_GROWTH_SAMPLE: ResumeFormData = {
  full_name: 'Marcus Vance',
  email: 'marcus.vance@example.com',
  phone: '+1 (555) 456-7890',
  job_title: 'Head of Digital Marketing & Growth',
  professional_summary: 'Strategic Growth & Digital Marketing Leader with 7+ years of experience accelerating pipeline generation and CAC efficiency. Expert in multi-channel paid acquisition, SEO, content marketing, lifecycle automation, and brand storytelling for fast-growing B2B and DTC brands.',
  city: 'Chicago',
  state: 'IL',
  country: 'United States',
  linkedin_url: 'linkedin.com/in/marcusvance',
  github_url: '',
  portfolio_url: 'marcusgrowth.com',
  title: 'Marketing & Growth Resume',
  template: 'modern',
  status: 'draft',
  skills: 'Growth Marketing, Performance Marketing, SEO / SEM, Google Ads, Meta Ads, HubSpot, Marketo, Google Analytics 4, Lifecycle Email Marketing, Content Strategy, Conversion Rate Optimization (CRO), Budget Management',
  experiences: [
    {
      company_name: 'Lumina Digital Growth',
      company_location: 'Chicago, IL',
      company_url: '',
      job_title: 'Director of Growth Marketing',
      employment_type: 'Full-time',
      start_date: '2021-03',
      end_date: '',
      currently_working: true,
      description: '• Managed $2.5M annual performance marketing budget, delivering 220% YoY inbound pipeline growth.\n• Slashed Customer Acquisition Cost (CAC) by 28% through creative ad testing and landing page optimization.\n• Built organic content machine generating 180k+ monthly organic search visits and 1,200+ monthly MQLs.',
      display_order: 0,
    },
    {
      company_name: 'Horizon Media Group',
      company_location: 'Chicago, IL',
      company_url: '',
      job_title: 'Senior Digital Marketing Specialist',
      employment_type: 'Full-time',
      start_date: '2018-02',
      end_date: '2021-02',
      currently_working: false,
      description: '• Scaled Google Search & LinkedIn ad campaigns, generating over 5,000 qualified leads per quarter.\n• Automated multi-step email nurture sequences in HubSpot with 44% average open rate.',
      display_order: 1,
    }
  ],
  educations: [
    {
      institution_name: 'Northwestern University',
      institution_location: 'Evanston, IL',
      degree: 'Bachelor of Science in Integrated Marketing Communications',
      field_of_study: 'Marketing & Analytics',
      start_date: '2014-09',
      end_date: '2018-06',
      currently_studying: false,
      description: 'Graduated Magna Cum Laude • President of American Marketing Association Chapter',
      display_order: 0,
    }
  ],
  projects: [
    {
      title: 'B2B SaaS Organic Inbound Playbook',
      subtitle: 'Content Engine',
      technologies: 'Ahrefs, Google Analytics 4, Webflow, HubSpot',
      description: 'Authored an organic search playbook that ranked #1 for 45 high-intent commercial keywords.',
      display_order: 0,
    }
  ],
  certifications: '✓ Google Ads Certified • ✓ HubSpot Inbound & Growth Certified • ✓ Meta Certified Media Buying Professional'
};

export const FINANCE_ANALYST_SAMPLE: ResumeFormData = {
  full_name: 'David Chen',
  email: 'david.chen@example.com',
  phone: '+1 (555) 567-8901',
  job_title: 'Senior Financial Analyst',
  professional_summary: 'Detail-oriented Senior Financial Analyst with 5+ years of experience in financial modeling, FP&A, budgeting, forecasting, and strategic M&A valuation. Adept at transforming complex datasets into actionable executive insights to drive cost optimization and revenue expansion.',
  city: 'New York',
  state: 'NY',
  country: 'United States',
  linkedin_url: 'linkedin.com/in/davidchen-cfa',
  github_url: '',
  portfolio_url: '',
  title: 'Financial Analyst Resume',
  template: 'elegant',
  status: 'draft',
  skills: 'Financial Modeling, FP&A, DCF Valuation, Budgeting & Forecasting, Variance Analysis, Advanced Excel (VBA/Macros), Power BI, Tableau, SQL, SAP ERP, GAAP, Capital Budgeting, Executive Reporting',
  experiences: [
    {
      company_name: 'Sterling Capital Advisors',
      company_location: 'New York, NY',
      company_url: '',
      job_title: 'Senior FP&A Analyst',
      employment_type: 'Full-time',
      start_date: '2021-06',
      end_date: '',
      currently_working: true,
      description: '• Built multi-scenario dynamic financial models supporting annual budgeting process for $180M business unit.\n• Identified $3.4M in operational cost-saving efficiencies across supply chain and vendor procurement.\n• Prepared monthly executive board reporting packages with deep-dive variance and KPI analyses.',
      display_order: 0,
    },
    {
      company_name: 'Beacon Global Investments',
      company_location: 'New York, NY',
      company_url: '',
      job_title: 'Financial Analyst',
      employment_type: 'Full-time',
      start_date: '2019-07',
      end_date: '2021-05',
      currently_working: false,
      description: '• Conducted discounted cash flow (DCF) and comparable company valuations for 15+ potential M&A transactions.\n• Automated weekly revenue tracking dashboard in Power BI, saving 8 hours of manual preparation per week.',
      display_order: 1,
    }
  ],
  educations: [
    {
      institution_name: 'New York University, Stern School of Business',
      institution_location: 'New York, NY',
      degree: 'Bachelor of Science in Finance & Accounting',
      field_of_study: 'Finance',
      start_date: '2015-09',
      end_date: '2019-05',
      currently_studying: false,
      description: 'GPA: 3.88 / 4.0 • Stern Scholar with Distinction',
      display_order: 0,
    }
  ],
  projects: [
    {
      title: 'Automated Real-Time Treasury & Cashflow Engine',
      subtitle: 'Corporate Finance Project',
      technologies: 'Excel VBA, SQL, Power BI',
      description: 'Designed a daily liquidity forecast model that reduced idle cash balances by 25%.',
      display_order: 0,
    }
  ],
  certifications: '✓ CFA Charterholder (Level III Passed) • ✓ FMVA (Financial Modeling & Valuation Analyst) • ✓ Bloomberg Certified'
};

export const UI_UX_DESIGN_SAMPLE: ResumeFormData = {
  full_name: 'Sophia Taylor',
  email: 'sophia.taylor@example.com',
  phone: '+1 (555) 678-9012',
  job_title: 'Lead UI/UX & Product Designer',
  professional_summary: 'Creative Lead Product Designer with 6+ years designing intuitive, accessible, and delightful digital experiences for mobile and web. Specialized in user-centered design systems, interaction architecture, wireframing, usability research, and cross-functional design-to-engineering handoffs.',
  city: 'Seattle',
  state: 'WA',
  country: 'United States',
  linkedin_url: 'linkedin.com/in/sophiataylor-design',
  github_url: '',
  portfolio_url: 'sophiataylor.design',
  title: 'Product Designer Resume',
  template: 'modern',
  status: 'draft',
  skills: 'Figma, FigJam, UI/UX Design, Design Systems, Wireframing, Interactive Prototyping, User Research, Usability Testing, Information Architecture, Accessibility (WCAG 2.1), Micro-interactions, Design Tokens',
  experiences: [
    {
      company_name: 'Aura Design Studio',
      company_location: 'Seattle, WA',
      company_url: '',
      job_title: 'Lead Product Designer',
      employment_type: 'Full-time',
      start_date: '2021-09',
      end_date: '',
      currently_working: true,
      description: '• Architected unified cross-platform Design System adopted by 25+ designers and 60+ engineers.\n• Led UX overhaul for fintech onboarding experience, driving a 38% increase in activation completion.\n• Conducted 50+ qualitative user interviews and moderated usability testing rounds to validate new feature concepts.',
      display_order: 0,
    },
    {
      company_name: 'Cascade Interactive',
      company_location: 'San Francisco, CA',
      company_url: '',
      job_title: 'Senior UI/UX Designer',
      employment_type: 'Full-time',
      start_date: '2018-07',
      end_date: '2021-08',
      currently_working: false,
      description: '• Designed responsive web and mobile application interfaces from initial wireframes to high-fidelity prototypes.\n• Created comprehensive component guidelines and interaction specs for React frontend developers.',
      display_order: 1,
    }
  ],
  educations: [
    {
      institution_name: 'Rhode Island School of Design (RISD)',
      institution_location: 'Providence, RI',
      degree: 'Bachelor of Fine Arts in Graphic Design & Interaction',
      field_of_study: 'Interactive Media',
      start_date: '2014-09',
      end_date: '2018-05',
      currently_studying: false,
      description: 'Graduated with Honors • Excellence in User Experience Design Award',
      display_order: 0,
    }
  ],
  projects: [
    {
      title: 'Prism – Open Source Cross-Platform Design System',
      subtitle: 'Design System',
      technologies: 'Figma, Design Tokens, Storybook',
      description: 'Created an accessible open-source Figma component library with 200+ components and dark mode support.',
      display_order: 0,
    }
  ],
  certifications: '✓ Nielsen Norman Group UX Master Certified • ✓ Interaction Design Foundation (IDF) Fellow • ✓ WCAG 2.1 Accessibility Certified'
};

export const PROFESSION_PRESETS: ProfessionSample[] = [
  {
    id: 'tech',
    name: 'Software & Web Development',
    role: 'Senior Full Stack Developer',
    category: 'Engineering & Tech',
    icon: 'Code',
    data: EXECUTIVE_TEMPLATE_SAMPLE
  },
  {
    id: 'product',
    name: 'Product & Project Management',
    role: 'Senior Product Manager',
    category: 'Product & Strategy',
    icon: 'Layers',
    data: PRODUCT_MANAGEMENT_SAMPLE
  },
  {
    id: 'marketing',
    name: 'Marketing, Growth & Content',
    role: 'Head of Digital Marketing & Growth',
    category: 'Marketing & Sales',
    icon: 'TrendingUp',
    data: MARKETING_GROWTH_SAMPLE
  },
  {
    id: 'finance',
    name: 'Finance, Banking & FP&A',
    role: 'Senior Financial Analyst',
    category: 'Finance & Accounting',
    icon: 'DollarSign',
    data: FINANCE_ANALYST_SAMPLE
  },
  {
    id: 'design',
    name: 'UI/UX & Product Design',
    role: 'Lead UI/UX & Product Designer',
    category: 'Design & Creative',
    icon: 'Palette',
    data: UI_UX_DESIGN_SAMPLE
  }
];
