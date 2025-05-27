import React from 'react'
import Header from '../components/Header'
import HomeContent from '../components/HomeContent'
import Footer from '../components/Footer'
import AuthContext from '../../context/AuthContext'
import RecruiterHome from '../components/RecruiterHome'
import { useContext } from 'react'

export default function Home() {
  const { user } = useContext(AuthContext)
  
  return (
    <div>
      <Header />
      {user ? (
        user.role === 'Student' ? (
          <HomeContent />
        ) : (
          <RecruiterHome />
        )
      ) : (
        <HomeContent /> // Show student view for unauthenticated users
      )}
      <Footer />
    </div>
  )
}