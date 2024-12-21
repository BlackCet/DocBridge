import { useState } from 'react'; 
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (fullName, username, email, password, phone, gender, dateOfBirth) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/patients/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, username, email, password, phone, gender, dateOfBirth }),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Signup failed');
      }
      

      // Save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      setIsLoading(false);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
