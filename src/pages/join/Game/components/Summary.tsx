import { useNavigate, useParams } from 'react-router-dom'

import { AiOutlineShareAlt } from 'react-icons/ai'
import { BiSolidUser } from 'react-icons/bi'
import { Button } from 'flowbite-react'
import Header from '../../components/Header'
import { HiDatabase } from 'react-icons/hi'
import QuestionReview from './QuestionReview'
import QuizRecommendation from './QuizRecommendation'
import { useQuizizzActivityStore } from '@/store/quizizzActivity'
import { useQuizizzExamStore } from '@/store/quizizzExam'

const Summary = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { quizizzExams } = useQuizizzExamStore((state) => state)
  const { quizizzActivitie } = useQuizizzActivityStore((state) => state)
  const answersCorrect = quizizzActivitie?.answers?.filter((answer) => answer.isCorrect === true).length
  return (
    <div className='flex flex-col bg-[#461A42] min-h-screen'>
      <Header />
      <div className='md:flex-row px-14 flex flex-col flex-1 gap-4'>
        <div className='lg:block lg:w-1/4 hidden w-0'></div>
        <div className='bg-[#150814] text-white lg:w-[50%] w-full p-6'>
          <div className='text-center'>
            <h2 className='mt-6 text-[20px] font-medium text-center text-white'>Bản tóm tắt</h2>
            <p className='inline-flex items-center bg-[#2D212C] gap-x-1 text-white py-1 text-xs mt-1 mb-4 px-2 rounded'>
              <span>
                <BiSolidUser />
              </span>
              đánh giá solo
            </p>
          </div>
          <>
            <div>
              <div className='flex justify-between items-center px-6 mb-5 py-5 bg-[#000000] text-white rounded-xl'>
                <div className='flex items-center justify-start gap-4'>
                  <img
                    src={quizizzActivitie?.userId?.avatar}
                    alt={quizizzActivitie?.userId?.name}
                    className='w-[76px] h-[76px] rounded-full object-cover'
                    width={76}
                    height={76}
                  />
                  <span className='text-xl font-medium text-white'>{quizizzActivitie?.userId?.name}</span>
                </div>
                <div className='bg-[#333333] p-1 rounded cursor-pointer'>
                  <span>
                    <AiOutlineShareAlt />
                  </span>
                </div>
              </div>
              <div className='rounded-xl bg-[#000000] text-white px-6 mb-5 py-5'>{answersCorrect} câu đúng</div>
              <div className='mt-1 rounded-xl bg-[#000000] px-6 mb-5 py-5 flex justify-between items-center'>
                <div className='flex flex-col'>
                  <span className='text-sm text-white font-medium mb-[1px]'>Điểm số</span>
                  <span className='text-sm font-medium text-white'>
                    {quizizzActivitie &&
                      quizizzActivitie.answers.reduce((acc, answer) => {
                        if (answer.isCorrect) {
                          return acc + answer.score
                        }
                        return acc
                      }, 0)}
                  </span>
                </div>
                <div className='bg-[#C3841C] rounded-lg p-1'>
                  <span>
                    <HiDatabase />
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <Button
                onClick={() => navigate(`/join/quiz/${id}`)}
                className='bg-primary w-full hover:!bg-primary !outline-none !border-none cursor-pointer font-medium text-white text-xl'
                style={{ boxShadow: '0 3px #0003, 0 3px #8854c0' }}
              >
                <span className='text-lg font-medium'>Chơi lại</span>
              </Button>
              <Button
                className='bg-white w-full hover:!bg-white !outline-none !border-none cursor-pointer text-secondary text-xl font-medium'
                style={{ boxShadow: '0 3px #0003, 0 3px #fff' }}
                onClick={() => navigate(`/`)}
              >
                <span className='text-lg font-medium'>Tìm quiz mới</span>
              </Button>
            </div>
            <div className='mt-6 rounded-xl bg-[#000] text-white px-6 py-8'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-[1px]'>
                  <p className='text-lg font-medium text-white capitalize'>Xem lại câu hỏi</p>
                  <span className='text-xs'>Nhấp vào các câu hỏi để xem câu trả lời</span>
                </div>
              </div>
              <div className='mt-4'>
                {quizizzActivitie?.answers?.map((answer, index) => (
                  <QuestionReview key={answer._id} answer={answer} index={index} />
                ))}
              </div>
            </div>
          </>
        </div>
        <div className='text-white lg:w-[25%] lg:block hidden w-full bg-[#230D21] py-6'>
          <h2 className='px-3 mb-8 text-sm'>Bạn cũng có thể thích...</h2>
          <div className='flex flex-col gap-1'>
            {quizizzExams &&
              quizizzExams.length > 0 &&
              quizizzExams.map((quizizzExam) => {
                if (quizizzExam._id !== id) {
                  return <QuizRecommendation key={quizizzExam._id} quizizzExam={quizizzExam} />
                }
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary
