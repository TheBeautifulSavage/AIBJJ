import React, { useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('❌ Error getting session:', error)
      }

      if (data?.session) {
        console.log('✅ Session detected:', data.session)

        // Clean URL
        if (window.location.hash) {
          window.history.replaceState(null, null, window.location.pathname)
        }

        // Redirect
        window.location.href = '/dashboard'
      }
    }

    checkSession()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        window.location.href = '/dashboard'
      }
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [])

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000', // Use https://aibjj.com in prod
      },
    })

    if (error) {
      console.error('❌ Google login error:', error)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🥋 Welcome to AI BJJ</h1>
      <button style={styles.button} onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'sans-serif',
    background: '#f4f4f4',
  },
  title: {
    marginBottom: '20px',
  },
  button: {
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2c6ed5',
    color: '#fff',
    transition: '0.3s',
  },
}

export default App
