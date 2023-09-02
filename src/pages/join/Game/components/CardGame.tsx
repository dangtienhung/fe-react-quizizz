import { AnswerResult } from '../interface/answerResult'
import { IQuizizzsAnswer } from '@/interfaces/quizizzExam.type'
import { SelectAnswer } from '@/store/types/gameStore'
import { memo } from 'react'

interface CardGameProps {
  className?: string
  card: IQuizizzsAnswer
  handleAnswerOptionClick: ({ id, index }: SelectAnswer) => void
  answerResult?: AnswerResult
  index: number
  selectAnswer?: SelectAnswer
}

const cardGameList = [
  { bgColor: '#2F6DAE', boxShadow: '#214E7C' },
  { bgColor: '#2C9CA6', boxShadow: '#1F6D74' },
  { bgColor: '#EEB243', boxShadow: '#C68612' },
  { bgColor: '#D4546A', boxShadow: '#BA2F47' },
  { bgColor: '#A05EB5', boxShadow: '#7D3A8C' },
  { bgColor: '#F05252', boxShadow: '#C12A2A' }
]

const CardGame = ({ card, handleAnswerOptionClick, answerResult, index, selectAnswer }: CardGameProps) => {
  const cardClasses = 'rounded text-white text-center cursor-pointer hover:bg-opacity-95'

  if (selectAnswer && selectAnswer !== null && answerResult) {
    return (
      <div
        className={`${cardClasses} ${
          selectAnswer.index === index ? 'block' : answerResult?.answer._id === card._id ? 'block' : 'invisible'
        }`}
        style={{
          boxShadow: `${answerResult?.answer._id === card._id ? '#0E9F6E' : '#F05252'} 0px 6px 0px 0px`,
          backgroundColor: `${answerResult?.answer._id === card._id ? '#0E9F6E' : cardGameList[index].bgColor}`
        }}
        onClick={() => handleAnswerOptionClick({ id: card._id, index })}
      >
        <div
          className={`${
            selectAnswer.id === answerResult?.answer?._id
              ? 'bg-green-500'
              : selectAnswer.id !== answerResult?.answer?._id && selectAnswer.id === card._id
              ? 'bg-[#F05252]'
              : 'bg-[#0E9F6E]'
          } flex rounded-t h-full w-full font-medium text-[30px] justify-center items-center`}
        >
          {card.content}
        </div>
      </div>
    )
  }
  return (
    <div
      className={`${cardClasses}`}
      style={{
        boxShadow: `${cardGameList[index]?.boxShadow} 0px 6px 0px 0px`,
        backgroundColor: `${cardGameList[index]?.bgColor}`
      }}
      onClick={() => handleAnswerOptionClick({ id: card._id, index })}
    >
      <div className={`flex rounded-t h-full w-full font-medium text-[30px] justify-center items-center`}>
        {card.content}
      </div>
    </div>
  )
}

export default memo(CardGame)
