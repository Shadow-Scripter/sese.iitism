"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span>Signed in as {session.user.email}</span>
        <button 
          onClick={() => signOut()} 
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Sign out
        </button>
      </div>
    )
  }
  return (
    <button 
      onClick={() => signIn("google")} 
      style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#4285F4', color: 'white', border: 'none', borderRadius: '4px' }}
    >
      Sign in with Google
    </button>
  )
}
