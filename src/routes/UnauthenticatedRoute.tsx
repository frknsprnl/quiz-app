import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/UserContext";

export const UnauthenticatedRoute = ({ children }: any) => {
  const router = useRouter();
  const { pathname } = useRouter();

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && pathname !== "/user/profile") {
      router.push("/user/profile");
    }
  }, [isAuthenticated, pathname, router]);

  return children;
};

export default UnauthenticatedRoute;
