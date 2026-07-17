import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SplashScreen } from '@capacitor/splash-screen'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ToastProvider } from './hooks/useToast.jsx'
import AppRouter from './AppRouter.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <AppRouter />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)

// Hide splash after browser has painted the first frame
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    SplashScreen.hide()
  })
})
