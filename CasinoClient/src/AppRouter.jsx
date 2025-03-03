import AppLayout from './features/Layout'
import GameBoard from './pages/GameBoard'
import AuthPage from './pages/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<GameBoard />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
