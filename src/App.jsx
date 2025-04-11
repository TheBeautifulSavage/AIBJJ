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

        if (window.location.hash) {
          window.history.replaceState(null, null, window.location.pathname)
        }

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
        redirectTo: 'https://aibjj.com', // use https://aibjj.com in production
      },
    })

    if (error) {
      console.error('❌ Google login error:', error)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🥋 BJJ Tracker is Live!</h1>
      <p>Welcome to your app built with Vite, Supabase, and Vercel.</p>
      <button style={styles.button} onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  )
}

const styles = {
  container: {
    fontFamily: 'sans-serif',
    background: '#f4f4f4',
    height: '100vh',
    paddingTop: '10vh',
    textAlign: 'center',
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  button: {
    marginTop: '20px',
    padding: '12px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2c6ed5',
    color: '#fff',
  },
}

export default App
