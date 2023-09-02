import { memo } from 'react'

const ProgressSibar = ({ timer }: { timer: number }) => {
  const progressPercentage = (timer / 30) * 100
  return (
    <div className='w-screen h-2 bg-[#000]'>
      <div
        className={`h-2 bg-[#4ED190] transition-all duration-500 rounded-lg`}
        style={{ width: `${progressPercentage}vw` }}
      ></div>
    </div>
  )
}

export default memo(ProgressSibar)
