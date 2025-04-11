useEffect(() => {
  // Check and recover session from URL hash after OAuth redirect
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session) {
      console.log('User session recovered:', session)
      window.location.href = '/dashboard' // ✅ or wherever your logged-in page is
    }
  })

  // Optional: Also track ongoing session changes
  const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      window.location.href = '/dashboard'
    }
  })

  return () => {
    listener?.subscription?.unsubscribe()
  }
}, [])
import React, { useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        console.log('User session:', session)
        window.location.href = '/dashboard' // change this route if needed
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://aibjj.com', // 👈 This must match your live domain!
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
