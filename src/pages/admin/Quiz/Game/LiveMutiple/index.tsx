import { useEffect, useState } from 'react'

import { AiFillFire } from 'react-icons/ai'
import { AnswerResult } from '@/pages/join/Game/interface/answerResult'
import { FaUsers } from 'react-icons/fa'
import Header from '../components/Header'
import { IQuizizzExam } from '@/interfaces/quizizzExam.type'
import { IoClose } from 'react-icons/io5'
import { caculatorPercentOfQuizizz } from '@/utils/caculatorPercent'
import { useGameSolo } from '@/store/gameStore'
import { useParams } from 'react-router-dom'
import { useQuizizzExamStore } from '@/store/quizizzExam'
import { useSocket } from '@/hooks/useSocket'
import { userStore } from '@/store/userStore'

const menus = ['Bảng xếp hạng', 'Câu hỏi']

const LiveMutiple = () => {
  const { id: roomId } = useParams()
  const socket = useSocket()
  const [isKickOutGame, setIsKickOutGame] = useState<boolean>(false)
  const [gameSelect, setGameSelect] = useState(0)
  const { user, userIdKickGame } = userStore((state) => state)
  const { quizizzExam } = useQuizizzExamStore((state) => state)
  const { answersResult, totalScores } = useGameSolo((state) => state)
  console.log('🚀 ~ file: index.tsx:26 ~ LiveMutiple ~ answersResult:', answersResult)
  const handleKickGame = (id?: string) => {
    userStore.setState({ userIdKickGame: id })
    setIsKickOutGame(!isKickOutGame)
  }
  const handleKickOutGame = (id: string) => {
    if (id) {
      console.log('🚀 ~ file: index.tsx:28 ~ handleKickOutGame ~ id:', id)
      socket.emit('kickOutGame', { roomId: roomId, idPlayer: id })
      setIsKickOutGame(false)
    }
  }
  /* gửi phòng chơi lên */
  useEffect(() => {
    if (!socket) return
    socket.emit('joinRoom', { roomId: roomId, useId: user._id })
  }, [socket])
  /* nhận bài thi */
  useEffect(() => {
    if (!socket) return
    socket.on('quizizzExam', (data: IQuizizzExam) => {
      if (data) {
        useQuizizzExamStore.setState({ quizizzExam: data })
      }
    })
  }, [socket])
  /* nhận câu trả lời */
  useEffect(() => {
    if (!socket) return
    socket.on('answerResult', (data: AnswerResult) => {
      useGameSolo.setState(() => ({
        /* lọc các item có answer._id và userId giống nhau đi */
        answersResult: [...useGameSolo.getState().answersResult, data].reduce((acc: AnswerResult[], current) => {
          const x = acc.find((item) => item.userId === current.userId && item.answer._id === current.answer._id)
          if (!x) {
            return acc.concat([current])
          } else {
            return acc
          }
        }, []),
        /* tính tổng điểm score của mỗi người dựa vào userId sau mỗi câu trả lời */
        totalScores: [...useGameSolo.getState().answersResult, data].reduce(
          (acc: { userId: string; score: number }[], current) => {
            const x = acc.find((item: { userId: string; score: number }) => item.userId === current.userId)
            if (!x) {
              return acc.concat([{ userId: current.userId, score: current.score }])
            } else {
              return acc.map((item) => {
                if (item.userId === current.userId) {
                  return { ...item, score: item.score + current.score }
                } else {
                  return item
                }
              })
            }
          },
          []
        )
        /* dựa vào điểm của người dùng sếp thứ hạng của người đang chơi với những người khác */
      }))
    })
  }, [socket])
  return (
    <>
      <div
        style={{ backgroundImage: "url('https://cf.quizizz.com/themes/v2/cosmic-picnic/bg_image_1080p.jpg')" }}
        className='select-none min-h-screen bg-center bg-cover bg-no-repeat w-full text-white -z-10'
      >
        <Header />
        <div className='pt-[72px]'>
          <div className='p-3 mt-10'>
            <div className='h-[64px] relative bg-[#001925] mx-auto rounded-2xl flex items-center max-w-5xl w-full text-white'>
              <div className='absolute top-1/2 flex items-center justify-center flex-col text-black left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-white border-2 border-gray-200'>
                <p className='text-2xl font-semibold '>10%</p>
                <span className='text-[8px] font-semibold text-center'>Độ chính xác của lớp học</span>
              </div>
              <div className='absolute top-1/2 left-12 -translate-x-1/2 -translate-y-1/2 h-10 bg-[#46BB81] w-[50px] rounded'></div>
              <div className='absolute top-1/2 right-0 -translate-x-1/2 -translate-y-1/2 h-10 bg-[#CD3E62] w-[50px] rounded'></div>
            </div>
          </div>
          <div className='mt-20 bg-[#7D4E6E] h-full w-full bg-opacity-80 py-4 min-h-screen'>
            <div className='w-full max-w-[1040px] mx-auto'>
              <div className='bg-[#18120F] flex items-center gap-1 w-fit text-center mx-auto rounded-t-2xl'>
                {[1, 2].map((_, index) => (
                  <div
                    key={index}
                    className={`w-[160px] transition-all duration-500 items-center justify-center cursor-pointer ${
                      gameSelect === index ? 'border-b-[2px]' : ''
                    } p-3`}
                    onClick={() => setGameSelect(index)}
                  >
                    <span className='text-sm font-medium'>{menus[index]}</span>
                  </div>
                ))}
              </div>
              {gameSelect === 0 ? (
                <div className=''>
                  <div className='bg-[#411B20] flex items-center justify-start rounded-t-2xl px-5 py-3 gap-2'>
                    <span>
                      <FaUsers />
                    </span>
                    <span>{quizizzExam?.players.length} người chơi</span>
                  </div>
                  <div className='bg-[#63343D] rounded-b-2xl bg-opacity-90 px-[26px] pb-10'>
                    <table
                      style={{ borderSpacing: '0 4px' }}
                      className='border-separate w-full text-left text-sm text-gray-500 dark:text-gray-400 group-first/body:group-first/row:last:rounded-tr-lg overflow-hidden'
                    >
                      <thead className='text-sm font-light uppercase text-white dark:text-gray-400'>
                        <tr className=''>
                          <th className='dark:bg-gray-700 px-6 py-3'>Thứ hạng</th>
                          <th className='dark:bg-gray-700 px-6 py-3'>Tên</th>
                          <th className='dark:bg-gray-700 px-6 py-3'>Điểm số</th>
                        </tr>
                      </thead>
                      <tbody className=''>
                        {quizizzExam.players.map((player, index) => {
                          /* sort điểm */
                          return (
                            <tr
                              className='group/row border border-gray-300 first:rounded-xl overflow-hidden'
                              key={player._id}
                            >
                              <td className='p-3 first:rounded-l-xl w-[120px] font-medium text-white bg-[#2D1B24]'>
                                {index + 1}
                              </td>
                              <td className='p-3 w-[120px] bg-[#2D1B24]'>
                                <div className='flex items-center gap-2'>
                                  <img
                                    src={player.avatar}
                                    alt={player.nameInGame}
                                    className='h-5 w-5 rounded-full object-cover'
                                  />
                                  <span className='truncate text-white'>{player.nameInGame}</span>
                                </div>
                              </td>
                              <td className='p-3 w-[120px] text-white bg-[#2D1B24]'>
                                {totalScores.find((item) => item.userId === player._id)?.score || 0}
                              </td>
                              <td className='p-3 flex items-center gap-2 bg-[#2D1B24] -z-10 rounded-r-xl'>
                                <div className='relative flex-1 h-7 rounded-md bg-[#2D1B24]'>
                                  <span className='absolute flex items-center gap-[2px] top-1/2 left-8 text-white -translate-x-1/2 -translate-y-1/2'>
                                    <AiFillFire size={18} className='z-20' />
                                    <span className='z-20 text-white'>
                                      {answersResult.find((item) => item.userId === player._id)?.currentQuestion + 1 ||
                                        0}
                                    </span>
                                  </span>
                                  <div className='flex-1 rounded-lg bg-[#000000] h-full w-full'>
                                    <div
                                      className={`bg-[#4ed190] h-full rounded-md`}
                                      style={{
                                        width: `${caculatorPercentOfQuizizz(
                                          answersResult.find((item) => item.userId === player._id)?.currentQuestion + 1,
                                          quizizzExam?.questions[0].questions.length
                                        )}%`
                                      }}
                                    ></div>
                                  </div>
                                </div>
                                <span className='cursor-pointer' onClick={() => handleKickGame(player._id)}>
                                  <IoClose size={18} />
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className='bg-[#411B20] flex items-center justify-start rounded-t-2xl px-5 py-3 gap-2'>
                  Danh sách câu hỏi
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isKickOutGame && (
        <div className='bg-opacity-90 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center transition-all duration-500 bg-black'>
          <div className='w-full max-w-lg'>
            <p className='text-[40px] text-center font-medium'>Bạn có chắc chắn muốn xóa người chơi này?</p>
            <div className='flex items-center justify-between mt-4'>
              <p
                onClick={() => handleKickOutGame(userIdKickGame)}
                className='text-[36px] text-[#FF2E47] font-semibold cursor-pointer w-fit'
              >
                Có
              </p>
              <p
                onClick={() => handleKickGame()}
                className='text-[36px] text-[#45CB85] font-semibold cursor-pointer w-fit'
              >
                Không
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LiveMutiple
