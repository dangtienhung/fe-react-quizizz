import React, { useEffect } from 'react'

import QuizizzList from '../QuizizzList/QuizizzList'
import { useQuizizzActivityStore } from '@/store/quizizzActivity'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { userStore } from '@/store/userStore'

interface FeatureQuizizzProps {
  children?: React.ReactNode
  className?: string
}
const FeatureQuizizz = ({ className }: FeatureQuizizzProps) => {
  const { user } = userStore((state) => state)
  const { quizizzExams, getQuizizzExams } = useQuizizzExamStore((state) => state)
  const { quizizzActivities, getAllQuizActivityByUserId } = useQuizizzActivityStore((state) => state)
  useEffect(() => {
    if (user && user._id) {
      getAllQuizActivityByUserId(user._id, 1, 10)
    }
    getQuizizzExams()
  }, [user])
  return (
    <div className={`p-4 md:p-7 ${className}`}>
      {user && user._id && <QuizizzList quizizzActivities={quizizzActivities} />}
      <QuizizzList quizizzExams={quizizzExams} />
    </div>
  )
}

export default FeatureQuizizz
