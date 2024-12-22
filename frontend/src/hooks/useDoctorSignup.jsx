import { useState } from 'react'; 
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (data) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/doctors/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Signup failed');
        }

        console.log('Signup successful:', result);
        return result;
    } catch (error) {
        console.error('Error during signup:', error.message);
        throw error;
    }
};



  return { signup, isLoading, error };
};
