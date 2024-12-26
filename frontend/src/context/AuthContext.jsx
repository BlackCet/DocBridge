import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

// Reducer function to manage auth state
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null // Default value for user
  })

  // Retrieve the user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))

    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: storedUser }) 
    }
  }, []) // Empty dependency array ensures this effect runs once on mount

  console.log('AuthContext state:', state) // You can remove this later after testing
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
