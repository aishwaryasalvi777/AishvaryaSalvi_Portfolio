export interface SkillGroup {
  category: string
  icon: string
  color: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming & Frameworks',
    icon: '⌨️',
    color: 'cyan',
    skills: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'FastAPI', 'REST APIs', 'React'],
  },
  {
    category: 'AI & LLM Engineering',
    icon: '🤖',
    color: 'purple',
    skills: [
      'Anthropic Claude', 'OpenAI', 'Ollama', 'Prompt Engineering',
      'Agentic Workflows', 'LangChain', 'LangGraph', 'Multi-Agent Orchestration',
      'RAG', 'Pinecone', 'pgvector', 'Semantic Search',
    ],
  },
  {
    category: 'ML & Data Science',
    icon: '🧠',
    color: 'purple',
    skills: [
      'XGBoost', 'LightGBM', 'CatBoost', 'ARIMA', 'SARIMA',
      'Classification', 'Model Evaluation', 'Feature Engineering',
      'SHAP', 'Apache Airflow', 'Jenkins',
    ],
  },
  {
    category: 'Databases & Data Warehousing',
    icon: '🗄️',
    color: 'cyan',
    skills: ['PostgreSQL', 'Snowflake', 'S3'],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    color: 'purple',
    skills: [
      'AWS EC2', 'AWS S3', 'Azure Data Factory', 'Azure Blob Storage',
      'Docker', 'Docker Compose', 'nginx', 'CI/CD',
    ],
  },
  {
    category: 'Data Engineering & Visualization',
    icon: '📊',
    color: 'cyan',
    skills: ['ETL/ELT', 'SQL-based Validation', 'Power BI', 'Streamlit', 'Matplotlib', 'Seaborn'],
  },
]
