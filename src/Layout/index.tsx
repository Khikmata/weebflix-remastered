import { AuthModal } from '@components/widgets/AuthModal/AuthModal'
import { Navbar } from 'components/features'

interface LayoutProps {
  children: React.ReactElement
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <>
        <AuthModal />
        <Navbar />
      </>
      <main>{children}</main>
    </>
  )
}
