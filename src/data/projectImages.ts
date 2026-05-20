export const repoImages: Record<string, string> = {
  metabolomics:      '/proj-metabolomics.jpg',
  portfolio:         '/proj-portfolio.jpg',
  interaction:       '/proj-analytics.jpg',
  powerbi:           '/proj-powerbi.jpg',
  forecast:          '/proj-forecast.jpg',
  ecommerce:         '/proj-ecommerce.jpg',
  heart:             '/proj-heart.jpg',
  supply:            '/proj-supplychain.jpg',
  chronic:           '/proj-disease.jpg',
  foodborne:         '/proj-food.jpg',
  linkedin:          '/proj-jobs.jpg',
  aishwaryasalvi777: '/proj-datascience.jpg',
}

export function getRepoImage(repoName: string): string | null {
  const name = repoName.toLowerCase()
  const key = Object.keys(repoImages).find(k => name.includes(k))
  return key ? repoImages[key] : null
}
