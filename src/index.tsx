import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from './hooks/scroll'
import { store } from './store'

import { ErrorPopup, LoadingBlock } from '@components/widgets/index'
import { ErrorBoundary } from 'react-error-boundary'
import './i18n/i18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorPopup}>
      <Suspense fallback={<LoadingBlock />}>
        <Provider store={store}>
          <BrowserRouter>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
)
