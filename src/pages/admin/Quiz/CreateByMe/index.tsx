import { AiOutlineEye, AiOutlineHeart, AiOutlinePrinter, AiOutlineSetting } from 'react-icons/ai'
import { BsCheck2Circle, BsCheckSquare, BsDownload, BsListCheck, BsTrash3 } from 'react-icons/bs'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { useNavigate, useParams } from 'react-router-dom'

import { BiSolidEditAlt } from 'react-icons/bi'
import { CiEdit } from 'react-icons/ci'
import { FaUsers } from 'react-icons/fa'
import { FiFolder } from 'react-icons/fi'
import { GoCopy } from 'react-icons/go'
import LayoutOutLibrary from '../../layouts/LayoutOutLibrary'
import { LiaShareSolid } from 'react-icons/lia'
import { MdPlayArrow } from 'react-icons/md'
import { useState } from 'react'

const CreateByMe = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <LayoutOutLibrary>
      <div className='p-6 select-none'>
        <div className='flex gap-4'>
          <div className='w-2/3 h-full'>
            <div className='w-full p-4 bg-white border shadow rounded'>
              <div className='flex gap-3'>
                <div className=''>
                  <img
                    src='data:image/png;base64,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'
                    alt='image'
                    className='h-[120px] w-[120px] object-cover rounded'
                  />
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between items-center'>
                    <h2 className=''>Quiz</h2>
                    <div className='flex gap-[2px] items-center'>
                      <span className='h-6 w-6 rounded border flex justify-center items-center'>
                        <AiOutlineHeart size={14} />
                      </span>
                      <span className='h-6 w-6 rounded border flex justify-center items-center'>
                        <GoCopy size={14} />
                      </span>
                      <span className='h-6 w-6 rounded border flex justify-center items-center'>
                        <BsTrash3 size={14} />
                      </span>
                      <span className='h-6 w-6 rounded border flex justify-center items-center'>
                        <AiOutlinePrinter size={14} />
                      </span>
                      <span className='h-6 w-6 rounded border flex justify-center items-center'>
                        <AiOutlineSetting size={14} />
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-sm'>dang tien hung</span>
                    <span className='h-5 w-5 flex items-center justify-center cursor-pointer'>
                      <BiSolidEditAlt />
                    </span>
                  </div>
                </div>
              </div>
              <div className='mt-3 flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <img
                    src='https://lh3.googleusercontent.com/a/AAcHTtddH1SCKaT9Xl4WG-IogO1k8WJgsKacD9djZX8HUCG-IQ=s96-c'
                    alt='logoimage'
                    className='rounded-full h-[32px] w-[32px] object-cover'
                  />
                  <div className=''>
                    <p className='text-xs truncate'>đặng tiến hưng</p>
                    <p className='text-[11px]'>8 ngày trước</p>
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <div className='cursor-pointer bg-[#F2F2F2] flex items-center justify-between gap-2 rounded py-1 font-bold text-secondary px-4'>
                    <span>
                      <BsDownload size={14} />
                    </span>
                    <span className='text-sm'>bảng tính</span>
                  </div>
                  <div className='cursor-pointer bg-[#F2F2F2] flex items-center justify-between gap-2 rounded py-1 font-bold text-secondary px-4'>
                    <span>
                      <FiFolder size={14} />
                    </span>
                    <span className='text-sm'>Lưu</span>
                  </div>
                  <div className='cursor-pointer bg-[#F2F2F2] flex items-center justify-between gap-2 rounded py-1 font-bold text-secondary px-4'>
                    <span>
                      <LiaShareSolid size={14} />
                    </span>
                    <span className='text-sm'>chia sẻ</span>
                  </div>
                  <div className='cursor-pointer bg-[#F2F2F2] flex items-center justify-between gap-2 rounded py-1 font-bold text-secondary px-4'>
                    <span>
                      <BiSolidEditAlt size={14} />
                    </span>
                    <span className='text-sm'>Chỉnh sửa</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='p-3 bg-white rounded shadow border flex gap-2 items-center justify-between mt-3'>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='bg-primary px-3 py-2 cursor-pointer text-white w-1/2 rounded shadow flex justify-between items-center relative'
              >
                <div className='flex justify-start items-center gap-2'>
                  <span className=''>
                    <FaUsers size={24} />
                  </span>
                  <div className='flex-1'>
                    <span className='font-semibold text-[#D6C5EA] text-xs'>Thông thường</span>
                    <p className='font-bold'>Bắt đầu quiz trực tiếp</p>
                  </div>
                </div>
                <div className=''>
                  <span>{isOpen ? <TiArrowSortedUp /> : <TiArrowSortedDown />}</span>
                </div>
                {isOpen && (
                  <div className='absolute top-[calc(100%_+_5px)] rounded-md p-3 left-0 w-full bg-white shadow border'>
                    <div className='rounded w-[100%] text-black'>
                      <div
                        className='flex justify-start items-center gap-2 border-b py-2'
                        onClick={() => {
                          navigate(`/admin/quiz/game-live/${id}`)
                        }}
                      >
                        <span className='bg-[#EDE6F6] p-3 rounded-lg'>
                          <FaUsers size={24} />
                        </span>
                        <div className='flex-1'>
                          <span className='font-semibold text-[#222222] text-base'>Thông thường</span>
                          <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                        </div>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/presentation/${id}`)}
                        className='flex justify-start items-center gap-2 py-2'
                      >
                        <span className='bg-[#EDE6F6] p-3 rounded-lg'>
                          <FaUsers size={24} />
                        </span>
                        <div className='flex-1'>
                          <span className='font-semibold text-[#222222] text-base'>Giáo viên điều khiển</span>
                          <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='bg-primary px-3 py-2 cursor-pointer flex justify-start items-center gap-2 text-white w-1/2 rounded shadow'>
                <span className=''>
                  <FaUsers size={24} />
                </span>
                <div className='flex-1'>
                  <span className='font-semibold text-[#D6C5EA] text-xs'>Thông thường</span>
                  <p className='font-bold'>Bắt đầu quiz trực tiếp</p>
                </div>
              </div>
            </div>

            <div className='mt-3'>
              <div className='flex items-center justify-between my-5'>
                <div className='flex items-center gap-1'>
                  <BsListCheck />
                  <span className='text-secondary font-semibold'>10 câu hỏi</span>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center gap-1 py-1 border px-2 cursor-pointer rounded bg-[#fff] font-semibold text-black text-sm'>
                    <AiOutlineEye />
                    Hiện thị đáp án
                  </div>
                  <div className='flex items-center gap-1 py-1 border px-2 cursor-pointer rounded bg-[#fff] font-semibold text-black text-sm'>
                    <MdPlayArrow />
                    Xem trước
                  </div>
                </div>
              </div>
              <div className='mt-2'>
                <div className='mb-5 bg-white border rounded-lg select-none'>
                  <div className=''>
                    <div className='flex bg-[#F9F9F9] rounded-lg p-2 justify-between items-center w-full'>
                      <div className='flex items-center gap-2'>
                        <BsCheckSquare />
                        <span className='text-sm'>Câu hỏi 1</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-1 px-2 py-1 border rounded cursor-pointer'>
                          <CiEdit />
                          <span className='text-sm font-semibold'>Chỉnh sửa</span>
                        </div>
                        <div className='flex items-center gap-2 px-2 py-1 border rounded cursor-pointer'>
                          <BsCheck2Circle size={14} />
                          <span className='text-sm font-semibold'>1 điểm</span>
                        </div>
                      </div>
                    </div>
                    <div className='px-2 py-3'>Lorem ipsum dolor sit.</div>
                    <div className='relative'>
                      <div className={`grid grid-cols-2 gap-4 px-2 py-5`}>
                        <div className='flex items-center gap-2 truncate'>
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-[#E5E5E5]`}></div>
                          <p className='text-sm truncate'>ahihih</p>
                        </div>
                        <div className='flex items-center gap-2 truncate'>
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-[#E5E5E5]`}></div>
                          <p className='text-sm truncate'>ahihih</p>
                        </div>
                        <div className='flex items-center gap-2 truncate'>
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-[#E5E5E5]`}></div>
                          <p className='text-sm truncate'>ahihih</p>
                        </div>
                        <div className='flex items-center gap-2 truncate'>
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-[#E5E5E5]`}></div>
                          <p className='text-sm truncate'>ahihih</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex bg-[#F9F9F9] rounded-lg gap-4 p-2 items-center w-full'></div>
                  </div>
                </div>

                <div className='mb-5 bg-white border rounded-lg select-none'>
                  <div className=''>
                    <div className='flex bg-[#F9F9F9] rounded-lg p-2 justify-between items-center w-full'>
                      <div className='flex items-center gap-2'>
                        <BsCheckSquare />
                        <span className='text-sm'>Câu hỏi 1</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-1 px-2 py-1 border rounded cursor-pointer'>
                          <CiEdit />
                          <span className='text-sm font-semibold'>Chỉnh sửa</span>
                        </div>
                        <div className='flex items-center gap-2 px-2 py-1 border rounded cursor-pointer'>
                          <BsCheck2Circle size={14} />
                          <span className='text-sm font-semibold'>1 điểm</span>
                        </div>
                      </div>
                    </div>
                    <div className='px-2 py-3'>Lorem ipsum dolor sit.</div>
                    <div className='relative'>
                      <div className={`grid grid-cols-2 gap-4 px-2 py-5`}>
                        <div className='flex items-center gap-2 truncate'>
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-[#E5E5E5]`}></div>
                          <p className='text-sm truncate'>ahihih</p>
                        </div>
                        <div className='flex items-center gap-2 truncate'>
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-[#E5E5E5]`}></div>
                          <p className='text-sm truncate'>ahihih</p>
                        </div>
                        <div className='flex items-center gap-2 truncate'>
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-[#E5E5E5]`}></div>
                          <p className='text-sm truncate'>ahihih</p>
                        </div>
                        <div className='flex items-center gap-2 truncate'>
                          <div className={`flex-shrink-0 w-4 h-4 rounded-full bg-[#E5E5E5]`}></div>
                          <p className='text-sm truncate'>ahihih</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex bg-[#F9F9F9] rounded-lg gap-4 p-2 items-center w-full'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutOutLibrary>
  )
}

export default CreateByMe
