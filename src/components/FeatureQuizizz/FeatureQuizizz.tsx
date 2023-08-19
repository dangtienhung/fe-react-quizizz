import React, { useEffect } from 'react'

import QuizizzList from '../QuizizzList/QuizizzList'
import { useQuizizzExamStore } from '@/store/quizizzExam'

interface FeatureQuizizzProps {
  children?: React.ReactNode
  className?: string
}
const FeatureQuizizz = ({ className }: FeatureQuizizzProps) => {
  const { quizizzExams, getQuizizzExams } = useQuizizzExamStore((state) => state)
  useEffect(() => {
    getQuizizzExams()
  }, [])
  return (
    <div className={`p-4 md:p-7 ${className}`}>
      <QuizizzList quizizzExams={quizizzExams} />
    </div>
  )
}

export default FeatureQuizizz
