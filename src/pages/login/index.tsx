import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import Link from "next/link";
import blobTop from "@/assets/blob-top.png";
import blobBottom from "@/assets/blob-bottom.png";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

function Login() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: validateAfterSubmit,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email.")
        .required("Email is required."),
      password: Yup.string()
        .required("Password is required.")
        .min(8, "Password is too short - should be 8 chars minimum."),
    }),
  });
  return (
    <>
      <Head>
        <title>Login | QuizApp</title>
        <meta
          name="description"
          content="Login to QuizApp and create your own quizzes. Share and challenge the others."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-screen w-full flex justify-center items-center pt-16 md:pt-20">
        <Image
          src={blobTop}
          alt="blob image"
          className="absolute top-10 md:top-20 right-0 -z-40"
        />
        <Image
          src={blobBottom}
          alt="blob image"
          className="absolute bottom-0 left-0 -z-40"
        />
        <div className="flex flex-col gap-3 justify-center items-center p-5 rounded-xl bg-[#16161a]">
          <h1 className="text-2xl text-center">Hello Again!</h1>
          <span className="text-lg">Welcome back. You`ve been missed.</span>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-80"
            autoComplete="off"
            noValidate
          >
            <div className="flex flex-col">
            <ErrorMessage error={formik.errors.email} />
              <Input
                name="email"
                type="email"
                placeholder="E-mail"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="flex flex-col">
              <ErrorMessage error={formik.errors.password} />
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
            <Button name="Sign In" color="#7f5af0" onClick={() => setValidateAfterSubmit(true)} />
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
    </>
  );
}

export default Login;
