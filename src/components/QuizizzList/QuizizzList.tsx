import { useEffect, useState } from 'react'

import Card from '../Card/Card'
import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type'
import { IQuizizzExam } from '@/interfaces/quizizzExam.type'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { caculatorPercent } from '@/utils/caculatorPercent'

interface QuizizzListProps {
  quizizzExams?: IQuizizzExam[]
  quizizzActivities?: IQuizizzActivity[]
}

const QuizizzList = ({ quizizzExams, quizizzActivities }: QuizizzListProps) => {
  // console.log('🚀 ~ file: QuizizzList.tsx:19 ~ QuizizzList ~ quizizzActivities:', quizizzActivities)
  const [percent, setPercent] = useState<number[]>([])
  /* lodash thống kê ra các quizz chơi trùng nhau mà người dùng đã chơi */
  useEffect(() => {
    if (quizizzActivities && quizizzActivities.length > 0) {
      const result = caculatorPercent(quizizzActivities)
      setPercent(result)
      // const data: number[] = []
      const groupedData = _.groupBy(quizizzActivities, (item) => `${item.userId._id}_${item.quizizzExamId._id}`)
      for (const key in groupedData) {
        if (Object.prototype.hasOwnProperty.call(groupedData, key)) {
          // const element = groupedData[key]
          // const result = caculatorPercent(element)
          // /* tìm ra kết quả cao nhất */
          // const max = Math.max(...result)
          // data.push(max)
        }
      }
      // setPercent(data)
    }
  }, [])
  return (
    <div className='mt-[44px]'>
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-xl font-medium'>{quizizzActivities ? 'Hoạt động gần đây' : 'Các bài quiz'}</h1>
        <Link to={`/join/topic/123`} className='px-6 py-1 font-bold bg-[#EEE9F4] rounded text-primary'>
          Xem thêm
        </Link>
      </div>
      <div className='md:grid-cols-4 lg:grid-cols-5 grid grid-cols-2 gap-4'>
        {quizizzExams &&
          quizizzExams.length > 0 &&
          quizizzExams.map((quizizzExam) => <Card key={quizizzExam._id} quizizzExam={quizizzExam} />)}
        {quizizzActivities &&
          quizizzActivities.length > 0 &&
          quizizzActivities.map((quizizzActivity, index) => {
            if (index % 2 === 0) {
              return (
                <div
                  key={quizizzActivity._id}
                  className='!w-[230px] border border-gray-200 rounded-lg shadow cursor-pointer select-none'
                >
                  <div className='relative h-[126px]'>
                    <img
                      src='https://yeudayhoc.com/wp-content/uploads/2022/01/8-1.png'
                      alt={quizizzActivity.quizizzExamId.title}
                      className='object-cover w-full h-full rounded-t-lg'
                    />
                    <div className='bottom-2 left-2 absolute'>
                      <div className='text-xs bg-[#f2f2f2] shadow text-[#292a3a] text-center rounded py-[1px] px-[6px]'>
                        {quizizzActivity.quizizzExamId.questions[0].questions.length} Qs
                      </div>
                    </div>
                  </div>
                  <div className='p-3'>
                    <h2 className='line-clamp-2 text-base font-medium capitalize'>
                      {quizizzActivity.quizizzExamId.title}
                    </h2>
                  </div>
                  <div className='px-2 pb-3'>
                    <div
                      className={`h-5 w-full rounded-xl relative overflow-hidden ${
                        percent[index] <= 50 && 'bg-[#F14D76]'
                      } ${percent[index] <= 70 && percent[index] >= 50 && 'bg-[#ff941a]'} ${
                        percent[index] <= 100 && percent[index] >= 70 && 'bg-[#5DE2A5]'
                      }`}
                    >
                      <div className='absolute top-1/2 left-3 -translate-y-1/2'>
                        <span className='text-sm font-semibold text-white'>Độ chính xác {percent[index]}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
      </div>
    </div>
  )
}

export default QuizizzList
