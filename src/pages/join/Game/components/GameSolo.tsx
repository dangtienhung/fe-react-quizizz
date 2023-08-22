import { memo, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AnswerResult } from '../interface/answerResult'
import CardGame from './CardGame'
import Header from '../../components/Header'
import { IQuizizzActivity } from '@/interfaces/quizizzActivity.type'
import { IQuizizzQuestionExam } from '@/interfaces/quizizzExam.type'
import { useFilterDuplicate } from '@/hooks/useFilterDuplicate'
import { useGameSolo } from '@/store/gameStore'
import { useQuizizzActivityStore } from '@/store/quizizzActivity'
import { useSocket } from '@/hooks/useSocket'
import { userStore } from '@/store/userStore'

interface GameSoloProps {
  questions: IQuizizzQuestionExam[]
}

const GameSolo = ({ questions }: GameSoloProps) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [finish, setFinish] = useState(false)
  const [_, setResult] = useState<boolean[]>([])
  /* connect socket */
  const socket = useSocket()
  /* store */
  const {
    questions: quetionsList,
    answerResult,
    selectAnswer,
    currentQuestion,
    answers,
    score: scoreResult,
    setCurrentQuestion
  } = useGameSolo((state) => state)

  const { user } = userStore((state) => state)
  useEffect(() => {
    const questionList = questions?.flat()?.map((question) => {
      const { questions } = question
      const result = questions.map((question) => question)
      return result
    })
    if (questionList) {
      useGameSolo.setState({ questions: questionList.flat() })
    }
  }, [questions])
  /* gửi id phòng quiz đang chơi lên server */
  useEffect(() => {
    if (!socket) return
    /* gửi id phòng quiz đang chơi lên server */
    socket.emit('joinRoom', { roomId: id, useId: user._id })
  }, [socket, id])

  // Xử lý khi nhận được kết quả từ server
  useEffect(() => {
    if (!socket) return
    socket.on('answerResult', async (data: AnswerResult) => {
      if (selectAnswer) {
        useGameSolo.setState({ answerResult: data })
      }
      /* so sánh đáp án người dùng chọn và đáp án server trả về xem có giống nhau không và xử lý logic để thêm vào mảng array answers */
      const answerItem = {
        question: quetionsList[currentQuestion]._id,
        answerSelect: selectAnswer?.id,
        isCorrect: data.result ? true : false,
        score: quetionsList[currentQuestion].score,
        answerResult: data.answer._id
      }
      const arrayAnswers = new Set(answers)
      useGameSolo.setState(() => ({
        answers: [...arrayAnswers, answerItem]
      }))
      /* nếu mà trả lời đúng thì cộng điểm câu hỏi đấy vào */
      if (data.result) {
        useGameSolo.setState((state) => ({
          score: state.score + quetionsList[currentQuestion].score
        }))
      }
      /* dựa vào điểm của người dùng sếp thứ hạng của người đang chơi với những người khác */
      const body = {
        userId: user._id,
        score: Math.ceil(scoreResult / 2)
      }
      // thêm vào mảng scores
      useGameSolo.setState((state) => ({
        scores: [...state.scores, body]
      }))
      // tìm ra vị trí của người chơi trong mảng scores
      const index = useGameSolo
        .getState()
        .scores.sort((a, b) => b.score - a.score)
        .findIndex((item) => item.userId === user._id)
      useGameSolo.setState({ rank: index + 1 })
      /* chuyển câu hỏi tiếp theo */
      setTimeout(async () => {
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < quetionsList.length) {
          setCurrentQuestion(nextQuestion)
        }
        useGameSolo.setState({
          answerResult: null as any,
          selectAnswer: null as any
        })
        if (nextQuestion >= quetionsList.length) {
          /* set lại mặc định */
          setFinish(true)
          setCurrentQuestion(0)
          useGameSolo.setState({
            answerResult: null as any,
            selectAnswer: null as any
          })
          /* thêm vào db quizizz Activity */
          const body = {
            userId: user._id,
            quizizzExamId: id,
            answers: answers,
            score: Math.ceil(scoreResult / 2)
          }
          const result = await useFilterDuplicate(body)
          if (result.answers.length === questions[0].questions.length) {
            socket.emit('addQuizizzActivity', result)
            useGameSolo.setState({ answers: [] })
            useGameSolo.setState({ score: 0 })
          }
        }
      }, 2000)
    })
    return () => {
      socket.off('answerResult')
    }
  }, [socket, selectAnswer, answers])

  useEffect(() => {
    if (!socket) return
    socket.on('quizizzActivity', (data: IQuizizzActivity) => {
      setTimeout(() => {
        useQuizizzActivityStore.setState({ quizizzActivitie: data })
        useQuizizzActivityStore.setState((state) => ({
          quizizzActivities: [...state.quizizzActivities, data]
        }))
        navigate(`/join/game/${id}?type=summary&finish=true`)
      }, 1000)
      socket.disconnect()
    })
  }, [socket])

  /* sử lý sự kiện chọn đáp án */
  const handleAnswerOptionClick = ({ id, index }: { id: string; index: number }) => {
    const data = { id, index }
    useGameSolo.setState({ selectAnswer: data })
    socket.emit('answerSubmitted', {
      userId: user._id,
      quizizzExamQuestionId: quetionsList[currentQuestion]?._id,
      quizizzExamQuestionAnswerId: id
    })
  }

  /* sứ lý sự kiện out game giữa chừng */
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

  /* nhận số điểm của những người chơi trước */
  useEffect(() => {
    if (!socket) return
    socket.on('scores', (data: any) => {
      /* lấy ra userId và score */
      const scores = data.map((item: any) => {
        const { userId, score } = item
        return { userId, score }
      })
      useGameSolo.setState({ scores })
    })
  }, [socket])
  if (!quetionsList.length) return null
  return (
    <>
      <div className='flex flex-col h-screen bg-black select-none'>
        <Header
          handleOutGame={handleOutGame}
          quetionsList={quetionsList}
          currentQuestion={currentQuestion}
          setResult={setResult}
        />
        <div className='flex-1 p-2'>
          <div className='bg-[#461A42] h-full rounded-2xl p-2'>
            <div className='h-1/2'>
              <div className='flex items-center justify-center w-full h-full rounded'>
                <h2 className='text-white font-medium text-[30px] text-center lg:mb-0 mb-5'>
                  {quetionsList[currentQuestion]?.title}
                </h2>
              </div>
            </div>
            <div className='h-1/2 md:grid-cols-2 lg:grid-cols-4 grid grid-cols-1 gap-4'>
              {quetionsList[currentQuestion].questionAnswers.map((card, index) => {
                if (selectAnswer === null) {
                  return (
                    <CardGame
                      key={card._id}
                      card={card}
                      index={index}
                      handleAnswerOptionClick={handleAnswerOptionClick}
                    />
                  )
                }
                if (selectAnswer && selectAnswer !== null && (answerResult as AnswerResult) && answerResult !== null) {
                  return (
                    <CardGame
                      key={card._id}
                      card={card}
                      index={index}
                      handleAnswerOptionClick={handleAnswerOptionClick}
                      answerResult={answerResult}
                      selectAnswer={selectAnswer}
                    />
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
      {finish && (
        <div className='opacity-90 fixed top-0 bottom-0 left-0 right-0 z-10 transition-all duration-1000 bg-black select-none'>
          <div className='top-1/2 left-1/2 absolute -translate-x-1/2 -translate-y-1/2'>
            <h2 className='text-4xl font-bold text-white'>Tất cả đã được làm xong</h2>
          </div>
        </div>
      )}
    </>
  )
}

export default memo(GameSolo)
