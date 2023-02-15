import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";

export const AuthenticatedRoute = ({ children }: any) => {
  const router = useRouter();
  const { pathname } = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/") {
        router.push("/");
    }
  }, [isAuthenticated, pathname, router]);

  return children;
};

export default AuthenticatedRoute;
