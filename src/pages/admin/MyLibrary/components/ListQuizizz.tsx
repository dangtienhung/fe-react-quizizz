import { AiOutlineBars } from 'react-icons/ai'
import { IQuizizzs } from '@/interfaces/quizizz.type'
import { IoMdArrowDropdown } from 'react-icons/io'
import { MdOutlineWatchLater } from 'react-icons/md'
import { getQuizs } from '@/api/quizizz'
import { useQuery } from 'react-query'
import { userStore } from '@/store/userStore'

// import { useNavigate } from 'react-router-dom'

const ListQuizizz = () => {
  // const navigate = useNavigate()
  const { user } = userStore((state) => state)
  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getQuizs(user._id),
    keepPreviousData: true
  })
  console.log('🚀 ~ file: ListQuizizz.tsx:17 ~ ListQuizizz ~ data:', data)
  return (
    <div className='flex-1 w-full'>
      {data && data.data.length === 0 && (
        <div className='w-full h-full'>
          <img
            src='https://cf.quizizz.com/image/emptystate-letscreate.png'
            alt='empty-state'
            className='h-[240px] w-[240px] object-cover mx-auto'
            height={240}
            width={240}
          />
          <p className='text-center text-[#222] text-sm font-semibold my-2'>Tạo quiz hoặc bài học đầu tiên của bạn</p>
          <p className='my-2 text-sm text-center'>
            Pull in questions from the Quizizz library or make your own. quick and easy
          </p>
          <div className='mt-8'>
            <div className='py-1 text-center px-2 rounded-md bg-primary text-white font-bold w-[200px] mx-auto'>
              Tạo 1 bài quizizz
            </div>
          </div>
        </div>
      )}
      {data && data.data.length !== 0 && (
        <div className='w-full h-full'>
          <div className='flex flex-col gap-3'>
            {data &&
              data?.data &&
              data?.data?.length > 0 &&
              data?.data?.map((item: IQuizizzs) => (
                <div key={item._id} className='flex items-start gap-3 p-2 bg-white rounded shadow cursor-pointer'>
                  <div className='bg-primary w-[104px] h-[104px] rounded overflow-hidden'>
                    <img
                      src={item.image || 'https://cf.quizizz.com/img/logos/new/logo_placeholder_sm.png?w=200&h=200'}
                      alt={item.title}
                      className='object-cover w-full h-full'
                      height={104}
                      width={104}
                    />
                  </div>
                  <div className='flex-1'>
                    <h3 className='flex items-center gap-3'>
                      <p className=''>Quiz</p>
                      <p className='bg-[#00C985] text-xs text-white rounded-xl px-2 font-medium'>Public</p>
                    </h3>
                    <h2 className='font-bold truncate text-[#222]'>{item.title || 'Untitled'}</h2>
                    <div className='flex items-center gap-4'>
                      <div className='flex items-center gap-2'>
                        <AiOutlineBars />
                        <span className=''>{item.questions.length} câu hỏi</span>
                      </div>
                    </div>
                    <div className='flex items-center justify-between mt-auto'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={item.user.avatar}
                          alt={item.user.name}
                          className='object-cover w-6 h-6 rounded-full'
                          height={24}
                          width={24}
                        />
                        <span>{item.user.name}</span>
                      </div>
                      <div className='flex items-center h-full'>
                        <div
                          // onClick={() => navigate(`/join/quiz/${item._id}`)}
                          className='relative group/item'
                        >
                          <div className='cursor-pointer flex mt-[6px] gap-1 items-center px-1 bg-primary text-white rounded'>
                            Chơi
                            <IoMdArrowDropdown />
                          </div>
                          <div className='absolute select-none top-full w-[200px] -left-[200px] border bg-white shadow-md rounded hidden group-hover/item:block before:absolute before:h-8 before:w-1/2 before:top-[-16px] before:left-2/3'>
                            <div className='cursor-pointer text-sm py-2 flex border-b-2 gap-1 items-center px-1 text-[#4D4D4D] font-medium hover:bg-gray-100'>
                              <MdOutlineWatchLater />
                              Quiz trực tiếp
                            </div>
                            <div className='cursor-pointer text-sm py-2 flex border-b-2 gap-1 items-center px-1 text-[#4D4D4D] font-medium hover:bg-gray-100'>
                              <MdOutlineWatchLater />
                              Giáo viên điều khiển
                            </div>
                            <div className='cursor-pointer text-sm py-2 flex gap-1 items-center px-1 text-[#4D4D4D] font-medium hover:bg-gray-100'>
                              <MdOutlineWatchLater />
                              Bài tập về nhà
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ListQuizizz
