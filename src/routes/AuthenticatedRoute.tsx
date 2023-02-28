import { useEffect } from "react";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';

export const AuthenticatedRoute = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push("/login");
      toast.error('Please log in.')
    }
  }, [router]);

  return children;
};

export default AuthenticatedRoute;
