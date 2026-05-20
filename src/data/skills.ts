export interface SkillGroup {
  category: string
  icon: string
  color: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming & Analytics',
    icon: '⌨️',
    color: 'cyan',
    skills: ['Python', 'SQL', 'R', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'CatBoost', 'LightGBM'],
  },
  {
    category: 'GenAI & Agentic Systems',
    icon: '🤖',
    color: 'purple',
    skills: [
      'LangChain', 'LangGraph', 'RAG', 'ReAct Agents',
      'OpenAI API', 'Claude API', 'Pinecone', 'pgvector',
      'sentence-transformers', 'LLM-as-judge', 'Pydantic',
    ],
  },
  {
    category: 'Data Engineering & Warehouses',
    icon: '🗄️',
    color: 'cyan',
    skills: ['ETL/ELT', 'Snowflake', 'PostgreSQL', 'MySQL', 'Apache Airflow', 'FastAPI'],
  },
  {
    category: 'Cloud & Orchestration',
    icon: '☁️',
    color: 'purple',
    skills: [
      'Azure Data Factory', 'Azure Blob Storage', 'Azure Key Vault',
      'AWS S3', 'AWS EC2', 'AWS RDS', 'Redshift',
      'Docker', 'Docker Compose', 'Jenkins', 'CI/CD', 'Git/GitHub',
    ],
  },
  {
    category: 'Analytics & BI Tools',
    icon: '📊',
    color: 'cyan',
    skills: ['Power BI', 'Tableau', 'Streamlit', 'Matplotlib', 'Seaborn', 'SSE Streaming', 'DAX'],
  },
]
