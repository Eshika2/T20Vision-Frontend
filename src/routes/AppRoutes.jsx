import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import WinPredictionPage from '../pages/WinPredictionPage'
import ScorePredictionPage from '../pages/ScorePredictionPage'
import TeamRecommendationPage from '../pages/TeamRecommendationPage'
import PredictionHistoryPage from '../pages/PredictionHistoryPage'
import PrivateRoute from './PrivateRoute'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'

function AppRoutes() {
  return (
    <Routes path="/">
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/*" element={<LoginPage />} />

      {/* <Route element={<PrivateRoute />}> */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/win-prediction" element={<WinPredictionPage />} />
        <Route path="/score-prediction" element={<ScorePredictionPage />} />
        <Route path="/team-recommendation" element={<TeamRecommendationPage />} />
        <Route path="/prediction-history" element={<PredictionHistoryPage />} />
      {/* </Route> */}
    </Routes>
  )
}

export default AppRoutes