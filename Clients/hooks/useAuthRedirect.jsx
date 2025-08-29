// hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/Authcontext';

export const useAuthRedirect = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/task');
      } else {
        router.replace('/Login');
      }
    }
  }, [user, loading]);
};