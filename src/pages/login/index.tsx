import { useState, useEffect } from "react";
import Head from "next/head";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import Link from "next/link";
import blobTop from "@/assets/blob-top.png";
import blobBottom from "@/assets/blob-bottom.png";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import axios from "axios";
import { useAuth } from "@/context/UserContext";
import UnauthenticatedRoute from "@/routes/UnauthenticatedRoute";
import toast from 'react-hot-toast'

function Login() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);
  const errInitialValues = { email: "", password: "" };
  const [errorAfterSubmit, setErrorAfterSubmit] = useState(errInitialValues);
  const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null);
  const { login } = useAuth();

  useEffect(() => {
    const storedValue = localStorage.getItem("isFirstLogin");
    if (storedValue === null) {
      setIsFirstLogin(true);
    } else {
      setIsFirstLogin(false);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: validateAfterSubmit,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email.")
        .required("Email is required."),
      password: Yup.string()
        .required("Password is required.")
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password must be 50 characters or fewer"),
    }),
    onSubmit: async (values) => {
      await logIn(values);
    },
  });

  const logIn = async (values: any) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Auth/Login`, values)
      .then(async (resp) => {
        localStorage.setItem("token", resp.data.token.accessToken);
        localStorage.setItem("isFirstLogin", JSON.stringify(false));
        login();
        toast.success("You've logged in.")
      })
      .catch((err) => {
        const errResp = err.response.data;
        if (errResp.status === 404) {
          setErrorAfterSubmit({ email: errResp.error, password: "" });
        } else if (errResp.status === 401) {
          setErrorAfterSubmit({ email: "", password: errResp.error });
        } else {
          console.log(err);
        }

        setValidateAfterSubmit(false);
        setTimeout(() => {
          setErrorAfterSubmit(errInitialValues);
        }, 2000);
      });
  };

  return (
    <UnauthenticatedRoute>
      <Head>
        <title>Login | QuizApp</title>
        <meta
          name="description"
          content="Login to QuizApp and create your own quizzes. Share and challenge the others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-full flex justify-center items-center p-0">
        <Link href={"/"} className="absolute top-10">
          <h1 className="text-4xl text-[#fffafa] hover:text-gray-300">
            QuizApp
          </h1>
        </Link>
        <Image
          src={blobTop}
          priority={true}
          alt="blob image"
          className="absolute -top-10 md:top-0 right-0 -z-40"
        />
        <Image
          src={blobBottom}
          priority={true}
          alt="blob image"
          className="absolute bottom-0 left-0 -z-40"
        />
        <div className="flex flex-col gap-3 justify-center items-center p-5 rounded-xl bg-[#16161a]">
          <h1 className="text-2xl text-center">
            {isFirstLogin && <span>Login</span>}
            {isFirstLogin === false && <span>Hello Again!</span>}
          </h1>
          {isFirstLogin === false && (
            <span className="text-lg">Welcome back. You`ve been missed.</span>
          )}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-80"
            autoComplete="off"
            noValidate
          >
            <div className="flex flex-col">
              <ErrorMessage
                error={formik.errors.email || errorAfterSubmit.email}
              />
              <Input
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="flex flex-col">
              <ErrorMessage
                error={formik.errors.password || errorAfterSubmit.password}
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>
            <Link
              href="/forgotpw"
              className="ml-auto text-[#7f5af0] hover:text-violet-700"
            >
              Forgot password?
            </Link>
            <Button
              name="Sign In"
              type="submit"
              color="#7f5af0"
              onClick={() => setValidateAfterSubmit(true)}
            />
            <span className="text-center">
              Not a member?{" "}
              <Link
                href="/register"
                className="text-[#7f5af0] hover:text-violet-700"
              >
                Register Now
              </Link>
            </span>
          </form>
        </div>
      </main>
    </UnauthenticatedRoute>
  );
}

export default Login;
