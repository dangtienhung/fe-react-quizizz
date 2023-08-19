import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { BiUserCheck } from 'react-icons/bi'
import { FaUsers } from 'react-icons/fa'
import Header from '../components/Header'
import Skeleton from 'react-loading-skeleton'
import { VscDebugStart } from 'react-icons/vsc'
import { caculatorPercent } from '@/utils/caculatorPercent'
import moment from 'moment'
import { useQuizizzActivityStore } from '@/store/quizizzActivity'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { userStore } from '@/store/userStore'

const PreQuiz = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { user } = userStore((state) => state)
  const { quizizzExam, getOneQuizizzExam, isLoading } = useQuizizzExamStore((state) => state)
  const { quizizzActivities, getAllQuizActivity } = useQuizizzActivityStore((state) => state)
  const [percent, setPercent] = useState<number[]>([])
  useEffect(() => {
    const result = caculatorPercent(quizizzActivities)
    setPercent(result)
  }, [quizizzActivities])
  useEffect(() => {
    if (id) {
      getOneQuizizzExam(id)
      getAllQuizActivity({ userId: user._id, roomId: id })
    }
  }, [id])
  return (
    <div className='min-h-screen bg-black'>
      <Header />
      <div className='flex justify-between gap-6 p-10 text-white bg-black'>
        {isLoading ? (
          <Skeleton count={10} />
        ) : (
          <>
            <div className='w-[30%]'>
              <div className='p-6 bg-[#111111] rounded-xl'>
                <div className='flex items-start w-full gap-3'>
                  <img
                    src={'https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=200&h=200'}
                    alt={quizizzExam.title}
                    className='w-[56px] h-[56px] rounded-xl object-cover'
                    width={56}
                    height={56}
                  />
                  <div className='w-full overflow-hidden'>
                    <p className='text-lg font-medium truncate'>{quizizzExam.title}</p>
                    <span className='text-sm'>{quizizzExam?.questions?.length} Qs</span>
                  </div>
                </div>
                <div className='mt-4'>
                  <span className='inline-flex items-center gap-3'>
                    <BiUserCheck size={20} />
                    <span>Qua: đặng tiến hưng</span>
                  </span>
                </div>
              </div>
              {quizizzActivities && quizizzActivities.length > 0 && (
                <div className='my-6 bg-[#111111] rounded-xl overflow-hidden pb-6'>
                  <h2 className='font-medium p-6 text-white text-base'>Hoạt động gần đây</h2>
                  <div className=''>
                    {quizizzActivities.map((activity, index) => {
                      if (index % 2 === 0) {
                        return (
                          <div
                            onClick={() =>
                              navigate(
                                `/join/game/${activity.quizizzExamId._id}?room=${activity._id}&type=summary&finish=true`
                              )
                            }
                            key={activity._id}
                            className='py-2 cursor-pointer hover:bg-[#292929] p-6 group/item select-none'
                          >
                            <div className='flex items-center justify-between mb-1'>
                              <h2 className=''>Đánh giá solo</h2>
                              <span className='text-sm'>{percent[index]}%</span>
                            </div>
                            <div className='h-2 w-full rounded bg-[#282828]'>
                              <div
                                className={`bg-green-500 h-full rounded`}
                                style={{ width: `${percent[index]}%` }}
                              ></div>
                            </div>
                            <div className='flex justify-between items-center'>
                              <span className='text-sm'>{moment(activity.createdAt).format('MMM D, h:mm a')}</span>
                              <span className='text-sm text-secondary hidden group-hover/item:block'>Xem thêm</span>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className='w-[50%]'>
              <div className='p-6 bg-[#111111] rounded-xl'>
                <Link to={`/join/game/${quizizzExam._id}?type=solo`} className='inline-block w-full'>
                  <button
                    className='btn shadow-md mb-5 w-full bg-[#00C985] hover:bg-[#00C985] font-bold outline-none border-none text-white'
                    style={{ boxShadow: '#00a06a 0px 4px 0px 0px' }}
                  >
                    <VscDebugStart size={20} />
                    <span>{quizizzActivities && quizizzActivities.length > 0 ? 'Nướng lại' : 'Bắt đầu'}</span>
                  </button>
                </Link>
                <button
                  className='btn bg-primary hover:bg-primary w-full font-bold text-white border-none shadow-md outline-none'
                  style={{ boxShadow: '#6c4298 0px 4px 0px 0px' }}
                >
                  <FaUsers size={20} />
                  <span>Thách thức bạn bè</span>
                </button>
              </div>
            </div>
            <div className='w-[20%]'></div>
          </>
        )}
      </div>
    </div>
  )
}

export default PreQuiz
