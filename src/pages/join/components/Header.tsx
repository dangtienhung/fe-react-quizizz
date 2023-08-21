import { Link, useNavigate, useParams } from 'react-router-dom'
import { memo, useEffect, useState } from 'react'

import { CiSettings } from 'react-icons/ci'
import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type'
import { IQuizizzsQuestion } from '@/interfaces/quizizzExam.type'
import { Modal } from 'flowbite-react'
import { VscClose } from 'react-icons/vsc'
import { useFilterDuplicate } from '@/hooks/useFilterDuplicate'
import { useGameSolo } from '@/store/gameStore'
import { useGameType } from '@/hooks/useGameType'
import { useQuizizzActivityStore } from '@/store/quizizzActivity'
import { useSocket } from '@/hooks/useSocket'
import { userStore } from '@/store/userStore'

interface HeaderProps {
  quetionsList?: IQuizizzsQuestion[]
  currentQuestion?: number
}

const Header = ({ quetionsList, currentQuestion }: HeaderProps) => {
  const navigate = useNavigate()
  const { user } = userStore((state) => state)
  const { id } = useParams()
  const gameType = useGameType()
  /* connect socket */
  const socket = useSocket()
  const [openModal, setOpenModal] = useState<string | undefined>()
  const props = { openModal, setOpenModal }
  /* lấy ra kết quả đúng */
  const [result, setResult] = useState<boolean[]>([])
  const { answerResult, answers, setCurrentQuestion } = useGameSolo((state) => state)
  useEffect(() => {
    if (answerResult) {
      setResult((prev) => [...prev, answerResult.result])
    }
  }, [answerResult])
  const handleOutGame = async () => {
    /* lưu lại thông tin phiên trò chơi */
    const body = {
      userId: user._id,
      quizizzExamId: id,
      answers: answers,
      isCompleted: false
    }
    const result = await useFilterDuplicate(body)
    console.log('🚀 ~ file: Header.tsx:42 ~ handleOutGame ~ result:', result)
    socket.emit('addQuizizzActivity', result)
    /* reset */
    useGameSolo.setState({
      answerResult: null as any,
      selectAnswer: null as any
    })
    setCurrentQuestion(0)
    setResult([])
    navigate('/')
  }

  // useEffect(() => {
  //   if (!socket) return
  //   if (quetionsList) {
  //     if (answers.length <= quetionsList?.length) {
  //       socket.on('quizizzActivity', (data: IQuizizzActivity) => {
  //         useQuizizzActivityStore.setState({ quizizzActivitie: data })
  //         useQuizizzActivityStore.setState((state) => ({
  //           quizizzActivities: [...state.quizizzActivities, data]
  //         }))
  //         navigate(`/`)
  //       })
  //     }
  //   }
  //   return () => {
  //     socket.off('quizizzActivity')
  //     socket.disconnect()
  //   }
  // }, [socket, quetionsList, answers])
  return (
    <>
      <div className='h-16 w-full flex justify-between items-center p-4 bg-[#000]'>
        <div className='flex items-center gap-4'>
          {quetionsList && quetionsList.length > 0 ? (
            <button
              onClick={() => props.setOpenModal('default')}
              className='cursor-pointer h-10 w-10 rounded-lg !text-white flex justify-center items-center bg-[#333]'
            >
              <CiSettings size={20} />
            </button>
          ) : (
            <Link to={gameType && id ? `/join/quiz/${id}` : '/'} className='inline-block'>
              <div className='cursor-pointer h-10 w-10 rounded-lg !text-white flex justify-center items-center bg-[#333]'>
                <CiSettings size={20} />
              </div>
            </Link>
          )}
          <div className='cursor-pointer h-10 w-10 rounded-lg !text-white flex justify-center items-center bg-[#333]'>
            <VscClose size={20} />
          </div>
          {quetionsList && quetionsList.length > 0 && (
            <div className='h-10 rounded-lg !text-white px-4 flex justify-center items-center bg-[#333]'>
              {currentQuestion && currentQuestion + 1}/{quetionsList.length}
            </div>
          )}
        </div>
        <div className=''>hehe</div>
      </div>
      <Modal
        size={'lg'}
        position={'center'}
        show={props.openModal === 'default'}
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Body className='bg-[#141414] rounded-md text-white'>
          <div className='select-none'>
            <div className='relative mb-6'>
              <div className='text-[10px] capitalize absolute top-[calc(100%_+_4px)] left-0'>bắt đầu</div>
              {quetionsList && quetionsList.length > 0 && (
                <div
                  className={`h-[20px] w-full rounded-xl bg-white grid grid-cols-${quetionsList.length} overflow-hidden`}
                >
                  {quetionsList.map((questionItem, index) => {
                    return (
                      // <div
                      //   key={questionItem._id}
                      //   className={`h-full w-full ${
                      //     result.length > 0 ? (result[index] ? 'bg-green-500' : 'bg-red-500') : ''
                      //   }`}
                      // ></div>
                      <div key={questionItem._id} className='h-full w-full bg-green-500'></div>
                    )
                  })}
                </div>
              )}
              <div className='text-[10px] capitalize absolute top-[calc(100%_+_4px)] right-0'>kết thúc</div>
            </div>
            <div className=''>
              <p className='text-center'>0 Câu hỏi còn lại</p>
            </div>
            <div className='flex gap-5 mt-6'>
              <button
                onClick={() => props.setOpenModal(undefined)}
                className='rounded-lg w-1/2 py-[12px] text-xl bg-primary font-bold px-3'
              >
                Tiếp tục
              </button>
              <button
                className='rounded-lg w-1/2 py-[12px] text-xl bg-white text-black font-bold px-3'
                onClick={() => handleOutGame()}
              >
                Lưu và thoát
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default memo(Header)
