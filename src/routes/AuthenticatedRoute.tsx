import { useEffect } from "react";
import { useRouter } from "next/router";

export const AuthenticatedRoute = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return children;
};

export default AuthenticatedRoute;
