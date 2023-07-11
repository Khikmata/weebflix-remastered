import { LoadingBlock } from '@components/widgets'
import { AuthModal } from '@components/widgets/AuthModal/AuthModal'
import { Navbar } from 'components/features'
import { Outlet, useNavigation } from 'react-router-dom'

export const Layout = () => {
  const navigation = useNavigation()
  return (
    <>
      {navigation.state === 'loading' && <LoadingBlock />}
      <Navbar />
      <AuthModal />
      <Outlet />
    </>
  )
}
