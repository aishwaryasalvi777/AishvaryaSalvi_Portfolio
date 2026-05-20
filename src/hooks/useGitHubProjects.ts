import { useState, useEffect } from 'react'

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  fork: boolean
}

const GITHUB_USERNAME = 'aishwaryasalvi777'

export function useGitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = sessionStorage.getItem('gh_repos')
    if (cached) {
      setRepos(JSON.parse(cached))
      setLoading(false)
      return
    }

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`)
      .then(r => {
        if (!r.ok) throw new Error('GitHub API error')
        return r.json()
      })
      .then((data: GitHubRepo[]) => {
        const filtered = data
          .filter(r => !r.fork && r.description)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
        sessionStorage.setItem('gh_repos', JSON.stringify(filtered))
        setRepos(filtered)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { repos, loading, error }
}

export function useGitHubStarred() {
  const [starred, setStarred] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cached = sessionStorage.getItem('gh_starred')
    if (cached) {
      setStarred(JSON.parse(cached))
      setLoading(false)
      return
    }

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=30`)
      .then(r => {
        if (!r.ok) throw new Error('GitHub API error')
        return r.json()
      })
      .then((data: GitHubRepo[]) => {
        sessionStorage.setItem('gh_starred', JSON.stringify(data.slice(0, 12)))
        setStarred(data.slice(0, 12))
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { starred, loading, error }
}
