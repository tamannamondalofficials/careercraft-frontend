import { ResumeFormData } from '@/types/resume.types';

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
  title: 'Executive Resume',
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
    },
    {
      company_name: 'Nexus Digital Systems',
      company_location: 'Remote',
      company_url: '',
      job_title: 'Frontend Developer',
      employment_type: 'Full-time',
      start_date: '2019-01',
      end_date: '2020-05',
      currently_working: false,
      description: '• Developed responsive client-facing web applications using React, HTML5, CSS3, and JavaScript.\n• Collaborated closely with UX designers in Figma to translate wireframes into pixel-perfect components.',
      display_order: 2,
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
  certifications: '✓ AWS Certified Solutions Architect • ✓ Meta Certified Frontend Developer • ✓ UI/UX Design Specialist'
};
