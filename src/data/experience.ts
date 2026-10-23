export interface ExperienceItem {
  id: number
  role: string
  company: string
  companyUrl?: string
  period: string
  location: string
  type: 'full-time' | 'contract' | 'internship'
  highlights: string[]
  tags: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 1,
    role: 'AI Engineer',
    company: 'Mediaocean',
    period: 'Feb 2026 – Present',
    location: 'New York, NY',
    type: 'full-time',
    highlights: [
      'Owned end-to-end design and deployment of two AI-powered systems — a regression test-selection optimizer and a RAG-based failure classifier — replacing manual full-suite QA across 100+ repos and 15k+ tests.',
      'Evaluated Oracle AI Vector Search vs. pgvector for production embeddings and drove adoption of pgvector, then validated the ranking approach against live Jira data — uncovering a component-mapping flaw affecting 20k+ tests.',
      'Engineered a five-stage multi-agent RAG classifier (pgvector, Ollama) with an LLM-free fast-path and deterministic decision gate, cutting classification latency 90x.',
      'Containerized both systems (Docker, docker-compose, nginx) with CI/CD automation and an async, rate-limit-aware architecture keeping pipeline runtime under 60 seconds.',
      'Collaborated with Automation, Engineering, and Data Science leadership in Agile/Scrum, shipped LLM based stakeholder tools, driving a 60% reduction in manual QA effort.',
    ],
    tags: ['RAG', 'pgvector', 'Docker', 'FastAPI', 'Ollama', 'nginx', 'CI/CD', 'JIRA'],
  },
  {
    id: 2,
    role: 'AI/ML Engineer',
    company: 'New Era Cap',
    period: 'Jan 2025 – Jan 2026',
    location: 'Buffalo, NY',
    type: 'full-time',
    highlights: [
      'Built and deployed an end-to-end demand forecasting pipeline on Azure/Snowflake, replacing manual Excel-based purchase and vendor planning to reduce overstocking and stockouts.',
      'Migrated and validated hundreds of Excel sources into structured Snowflake tables, then performed EDA, cleaning, and time-series feature engineering to inform model design.',
      'Benchmarked multiple forecasting models (XGBoost, LightGBM, ARIMA, SARIMA, CatBoost), selecting CatBoost for 92% accuracy, and deployed it to production on Azure.',
      'Built a Power BI dashboard and a GenAI-powered Streamlit app (FastAPI + OpenAI API) translating SHAP feature importance into natural-language explanations for non-technical stakeholders.',
    ],
    tags: ['Azure', 'Snowflake', 'CatBoost', 'Power BI', 'FastAPI', 'OpenAI', 'Streamlit', 'ETL/ELT'],
  },
  {
    id: 3,
    role: 'Senior Software Engineer',
    company: 'Mediaocean',
    period: 'Aug 2020 – Jul 2024',
    location: 'New York, NY',
    type: 'full-time',
    highlights: [
      'Built API and UI test automation frameworks (Karate, Selenium/POM) integrated into Dockerized Jenkins CI/CD pipelines, validating campaign workflows for Mediaocean’s Prisma platform.',
      'Engineered SQL-based validation and Power BI reporting, improving test coverage from 60% to 95% and cutting escaped defects by 40% and resolution time by 30%.',
    ],
    tags: ['Karate', 'Selenium', 'Jenkins', 'Docker', 'SQL', 'Power BI', 'CI/CD'],
  },
]
