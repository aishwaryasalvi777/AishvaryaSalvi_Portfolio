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
    company: 'Research Foundation for SUNY',
    period: 'Jan 2025 – Present',
    location: 'Buffalo, NY',
    type: 'full-time',
    highlights: [
      'Architected a production agentic RAG system for supply chain disruption detection using LangChain ReAct with six domain-specific tools, generating real-time supplier risk scores and alternative-supplier recommendations.',
      'Engineered a semantic embedding pipeline with OpenAI text-embedding-3-small and a tiered Pinecone + pgvector store, persisting user-flagged alerts as a feedback loop to continuously improve agent retrieval.',
      'Built a multi-signal risk scoring engine combining VADER sentiment, LLM-as-judge severity, and recency decay into a calibrated 0–10 score, with content-hash caching eliminating redundant LLM calls.',
      'Shipped an async FastAPI backend with a Streamlit dashboard with agent guardrails, deployed via Docker Compose.',
    ],
    tags: ['LangChain', 'RAG', 'FastAPI', 'Pinecone', 'pgvector', 'OpenAI', 'Docker', 'Streamlit'],
  },
  {
    id: 2,
    role: 'AI/ML Engineer',
    company: 'New Era Cap',
    period: 'Jan 2025 – Feb 2026',
    location: 'Buffalo, NY',
    type: 'full-time',
    highlights: [
      'Architected an end-to-end demand forecasting platform on Azure Data Factory + Snowflake, replacing manual Excel planning and cutting stockout/overstock risk across multi-year horizons.',
      'Engineered quantile CatBoost models with lag, rolling, and seasonal features, achieving 87% accuracy benchmarked against XGBoost, LightGBM, and SARIMA.',
      'Built a Snowflake ETL layer of CTEs and intermediate views over hundreds of raw tables with data quality checks, delivering 10x faster analytical query performance.',
      'Integrated OpenAI via FastAPI into a Power BI + Streamlit stack, converting SHAP feature importance into plain-language explanations and shortening planning cycles by 40%.',
    ],
    tags: ['Azure', 'Snowflake', 'CatBoost', 'Power BI', 'FastAPI', 'OpenAI', 'Streamlit', 'ETL/ELT'],
  },
  {
    id: 3,
    role: 'Senior Data Analyst',
    company: 'Mediaocean',
    period: 'Apr 2023 – Jul 2024',
    location: 'Remote',
    type: 'full-time',
    highlights: [
      'Led data quality analysis by consolidating Python, Karate, Jenkins, and Docker defect data into structured datasets, lifting test coverage from 60% to 95% and cutting escaped anomalies by 40%.',
      'Built Power BI defect dashboards for CTR, Actions, and Impressions and embedded SQL validation scripts into CI/CD pipelines with Agile teams.',
      'Trained interns and junior engineers on automation frameworks, mentoring on coding standards to accelerate onboarding.',
      'Integrated automated test suites into Jenkins CI/CD pipelines, enabling scheduled and on-demand runs after each build.',
    ],
    tags: ['Python', 'Power BI', 'SQL', 'Jenkins', 'Docker', 'Karate', 'CI/CD'],
  },
  {
    id: 4,
    role: 'Data Analyst',
    company: 'Mediaocean',
    period: 'Aug 2021 – Mar 2023',
    location: 'Remote',
    type: 'full-time',
    highlights: [
      'Validated digital ad campaign workflows using Python, SQL, and A/B tests across 450+ defects, cutting bug resolution time by 55% and sustaining 97% build success rate.',
      'Developed detailed test scenarios from PRDs/BRDs, proactively identifying ambiguous requirements early in the SDLC.',
      'Used SQL to validate data integrity, cross-verifying UI data against relational databases through joins and stored procedures.',
      'Verified API requests and responses using Postman, validating payloads and status codes against business requirements.',
    ],
    tags: ['Python', 'SQL', 'Postman', 'Selenium', 'JIRA', 'A/B Testing', 'AdTech'],
  },
]
