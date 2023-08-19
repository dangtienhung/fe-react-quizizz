import { useEffect, useState } from 'react'

import LayoutDefault from '@/layouts/LayoutDefault'
import { Pagination } from 'flowbite-react'
import QuizizzList from '@/components/QuizizzList/QuizizzList'
import { useQuizizzExamStore } from '@/store/quizizzExam'

const Toppic = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const onPageChange = (page: number) => setCurrentPage(page)
  const [counter, setCounter] = useState(0)
  const increament = () => setCounter(counter + 1)
  const { quizizzExams, getQuizizzExams } = useQuizizzExamStore((state) => state)
  useEffect(() => {
    getQuizizzExams()
  }, [])
  return (
    <LayoutDefault>
      <div className='md:p-4 flex-1 p-1'>
        <h1 className='pb-4 text-xl border-b' onClick={() => increament()}>
          <span>Câu đố phổ biến cho </span>
          <span className='font-bold'>English and Language Arts</span>
        </h1>
        <QuizizzList quizizzExams={quizizzExams} />
        <div className='mt-10 text-center'>
          <Pagination currentPage={currentPage} onPageChange={onPageChange} totalPages={100} showIcons />
        </div>
      </div>
    </LayoutDefault>
  )
}

export default Toppic
