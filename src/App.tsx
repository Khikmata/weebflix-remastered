import { lazy } from 'react'

import { useTranslation } from 'react-i18next'
import './styles/global.scss'

const AppRouter = lazy(() => import('./router/AppRouter'))

function App() {
  return <div className="App">{<AppRouter />}</div>
}

export default App
