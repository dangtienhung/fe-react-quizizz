export const calculateDaysAgo = (date: string) => {
  const createdDate = new Date(date)
  const currentDate = new Date()
  const timeDiff = currentDate.getTime() - createdDate.getTime()
  const millisecondsInDay = 24 * 60 * 60 * 1000
  const daysAgo = Math.floor(timeDiff / millisecondsInDay)
  return daysAgo > 0 ? `${daysAgo} ngày trước` : 'Hôm nay'
}
