import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Router from "next/router";
import AuthenticatedRoute from "@/routes/AuthenticatedRoute";
import { useAuth } from "@/context/UserContext";
import axios from "axios";
import Sidebar from "@/components/SideBar/Sidebar";
import { checkRefreshToken } from "@/services/auth";

type UserLayoutProps = {
  children: React.ReactNode;
};

function UserLayout({ children }: UserLayoutProps) {
  const { logout, user, setUser } = useAuth();

  useEffect(() => {
    const getUserProfile = async (token: string | null) => {
      await axios
        .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getuserprofile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          setUser(resp.data);
        })
        .catch((err) => {
          if (err.response.statusCode === 401) {
            const token = localStorage.getItem("token");
            if (token) {
              checkRefreshToken(token);
            }
          } else {
            logout();
          }
        });
    };

    const token = localStorage.getItem("token");
    if (token) {
      getUserProfile(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { pathname } = Router;

    if (pathname === "/user") {
      Router.push("/user/profile");
    }
  }, []);

  return (
    <AuthenticatedRoute>
      <Head>
        <title>User | QuizApp</title>
        <meta
          name="description"
          content="Login to QuizApp and create your own quizzes. Share and challenge the others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen px-[1.2rem] md:px-0 pb-0 overflow-y-hidden">
        <div
          className="block md:flex"
          style={{ height: "calc(100% - 5rem)", marginTop: "5rem" }}
        >
          <Sidebar user={user} />
          <div className="md:p-6 lg:p-10 w-full">{children}</div>
        </div>
      </main>
    </AuthenticatedRoute>
  );
}

export default UserLayout;
