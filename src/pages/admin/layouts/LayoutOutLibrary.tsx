import Header from '../components/Header'

interface LayoutOutLibraryProps {
  children: React.ReactNode
}

const LayoutOutLibrary = ({ children }: LayoutOutLibraryProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default LayoutOutLibrary
