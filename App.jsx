import React, { useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log('Recovered session:', session)
        window.history.replaceState(null, null, window.location.pathname) // remove token from URL
        window.location.href = '/dashboard'
      }
    })

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
        redirectTo: 'https://aibjj.com', // or https://aibjj.com in production
      },
    })
    if (error) console.error('Login error:', error)
  }

  return (
    <div>
      <h1>Welcome to AI BJJ</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  )
}

export default App
