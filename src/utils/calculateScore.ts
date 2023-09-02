export function calculateScore({ timeElapsed, totalTime }: { timeElapsed: number; totalTime: number }) {
  const minScore = 600 // Điểm tối thiểu
  const maxScore = 1280 // Điểm tối đa
  const score = minScore + (timeElapsed - 0) * ((maxScore - minScore) / (totalTime - 0))
  return Math.round(score)
}
