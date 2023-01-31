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

function Register() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: validateAfterSubmit,
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .max(50, "Username must be no more than 50 characters long")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
    },
  });
  return (
    <>
      <Head>
        <title>Register | QuizApp</title>
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
          <h1 className="text-2xl text-center">Register</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-80"
            autoComplete="off"
            noValidate
          >
            <div className="flex flex-col">
              <ErrorMessage error={formik.errors.username} />
              <Input
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Username"
              />
            </div>
            <div className="flex flex-col">
              <ErrorMessage error={formik.errors.email} />
              <Input
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                placeholder="E-mail"
              />
            </div>
            <div className="flex flex-col">
              <ErrorMessage error={formik.errors.password} />
              <Input
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col">
              <ErrorMessage error={formik.errors.confirmPassword} />
              <Input
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <Button
              name="Sign Up"
              color="#7f5af0"
              onClick={() => setValidateAfterSubmit(true)}
            />
            <span className="text-center">
              Already a member?{" "}
              <Link
                href="/login"
                className="text-[#7f5af0] hover:text-violet-700"
              >
                Login
              </Link>
            </span>
          </form>
        </div>
      </main>
    </>
  );
}

export default Register;
