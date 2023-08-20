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
                      src='data:image/png;base64,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'
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
