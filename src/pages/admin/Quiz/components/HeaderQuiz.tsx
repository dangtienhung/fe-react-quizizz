import { AiOutlineSearch } from 'react-icons/ai'
import { TextInput } from 'flowbite-react'

interface HeaderQuizProps {
  children?: React.ReactNode
  className?: string
}

const HeaderQuiz = ({ className }: HeaderQuizProps) => {
  return (
    <div
      className={`bg-white p-4 rounded-b fixed top-14 z-50 left-1/2 -translate-x-1/2 shadow w-full max-w-2xl ${className}`}
    >
      <h2 className='mb-2 font-medium'>Dịch chuyển tức thời từ thư viện Quizizz</h2>
      <div className='p-1 border rounded'>
        <form className='flex items-center w-full'>
          <TextInput
            icon={AiOutlineSearch}
            placeholder='Tìm kiếm từ hàng triệu câu hỏi'
            required
            type='email'
            className='focus:!border focus:border-primary bg-white h-[40px] flex items-center focus:ring-0 flex-1 outline-none border-none'
            style={{ boxShadow: 'none', border: 'none' }}
          />
          <button className='py-2 rounded px-4 w-[100px] h-[40px] flex justify-center items-center text-sm font-medium bg-[#EDE6F6] text-primary'>
            Tìm kiếm
          </button>
        </form>
      </div>
    </div>
  )
}

export default HeaderQuiz
