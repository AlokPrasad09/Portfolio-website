import { useState, useEffect } from 'react';

export interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}

const GITHUB_USER = 'AlokPrasad09';

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=8`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch');
        return r.json();
      })
      .then((data: GitHubRepo[]) => setRepos(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { repos, loading, error };
}
