export interface Recommendation {
  id: number
  firstName: string
  lastName: string
  company: string
  title: string
  text: string
  date: string
  initials: string
}

// Source: Recommendations_Received.csv — VISIBLE entries only
export const recommendations: Recommendation[] = [
  {
    id: 1,
    firstName: 'Prasanna',
    lastName: 'Wadekar',
    company: 'BMW TechWorks India',
    title: 'Lead Engineer',
    date: 'Sep 2025',
    initials: 'PW',
    text: 'Aishvarya developed a strong interest in automation and went on to automate most of the product, covering both front-end and back-end processes. This not only saved the team a significant amount of time but also improved the consistency and efficiency of our testing cycles. She also represented our team exceptionally well, presenting the product to clients during releases. She understood the product deeply, kept the end-user experience in mind, and worked closely with us to make sure every release was smooth and successful.',
  },
  {
    id: 2,
    firstName: 'Vishal',
    lastName: 'Sonar',
    company: 'Mediaocean',
    title: 'Senior Software Engineer',
    date: 'Sep 2025',
    initials: 'VS',
    text: 'Aishvarya not only delivered high-quality work consistently but also brought great energy and collaboration to the team. She has a unique blend of technical expertise and leadership qualities — always willing to guide others, share knowledge, and take initiative to improve processes. What stood out was her eye for detail and her ability to think beyond just finding bugs. She understood the product deeply and always considered the end-user experience, making her feedback incredibly valuable.',
  },
  {
    id: 3,
    firstName: 'Harshal',
    lastName: 'Patil',
    company: 'Troy & Banks',
    title: 'AI & Data Engineer',
    date: 'Sep 2025',
    initials: 'HP',
    text: 'Aishvarya stands out for her exceptional work ethic, keen desire to learn, and genuine willingness to support her peers. Throughout our collaborations, she demonstrated a deep understanding of data science concepts and remarkable proficiency in SQL, Python, Tableau, and Power BI. Whether we were tackling a challenging group project or competing as a team, she always brought thoughtful insights, strong analytical skills, and a positive, can-do attitude.',
  },
  {
    id: 4,
    firstName: 'Arjun',
    lastName: 'Gurung',
    company: 'Mediaocean',
    title: 'Software Developer',
    date: 'Sep 2025',
    initials: 'AG',
    text: 'Collaborating with Aishvarya during development, her comprehensive and insightful QA testing has been invaluable to the team. Aishvarya consistently identifies complex edge cases and performance bottlenecks that traditional testing might miss, directly leading to more robust and reliable backend systems. Any team would be lucky to have her.',
  },
  {
    id: 5,
    firstName: 'Sneha',
    lastName: 'Parsekar',
    company: 'Mediaocean',
    title: 'Sr. QA Manager',
    date: 'Sep 2025',
    initials: 'SP',
    text: 'As a manager, I found Aishvarya to be highly organized and efficient. As a team member, she always brought a positive energy and a can-do attitude. She was quick to lend a helping hand and support her colleagues whenever needed.',
  },
  {
    id: 6,
    firstName: 'Anirudh',
    lastName: 'Mhaske',
    company: 'Advance2000',
    title: 'AI Engineer',
    date: 'Sep 2025',
    initials: 'AM',
    text: 'She explained complex ML concepts in such a clear and approachable way that it made the entire pipeline — from data prep to deployment — easy to grasp. Her strong technical skills and willingness to share knowledge truly inspired me, and I\'m confident she\'ll bring the same clarity and dedication wherever she works.',
  },
]
