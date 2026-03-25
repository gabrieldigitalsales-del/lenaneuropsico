import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getAdminSession, loginAdmin, logoutAdmin } from '@/lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(true)

  useEffect(() => {
    let mounted = true

    async function bootstrap() {
      try {
        const data = await getAdminSession()
        if (!mounted) return
        setUser(data?.authenticated ? { role: 'admin' } : null)
        setIsConfigured(Boolean(data?.configured))
      } catch {
        if (!mounted) return
        setUser(null)
        setIsConfigured(false)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    bootstrap()

    return () => {
      mounted = false
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isConfigured,
      isAuthenticated: Boolean(user),
      login: async (password) => {
        const data = await loginAdmin(password)
        setUser(data?.authenticated ? { role: 'admin' } : null)
        setIsConfigured(Boolean(data?.configured))
        return data
      },
      logout: async () => {
        await logoutAdmin()
        setUser(null)
      },
    }),
    [user, loading, isConfigured],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
