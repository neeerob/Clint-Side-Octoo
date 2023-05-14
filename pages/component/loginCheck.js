import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginCheck () {
  const router = useRouter();

  useEffect(() => {
    const session = sessionStorage.getItem('username');
    if (!session) {
      router.push('http://localhost:8000/login');
    }
    else{
        router.push('http://localhost:8000/');
    }
  }, []);

  return null;
};