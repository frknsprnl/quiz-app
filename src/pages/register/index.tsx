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
import UnauthenticatedRoute from "@/routes/UnauthenticatedRoute";

function Register() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      eMail: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: validateAfterSubmit,
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .max(50, "Username must be no more than 50 characters long")
        .required("Username is required"),
      eMail: Yup.string()
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
      signUp({
        userName: values.userName,
        eMail: values.eMail,
        password: values.password,
      });
      resetForm();
    },
  });

  const signUp = async (values: any) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/Users/Create`,
        values
      )
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UnauthenticatedRoute>
      <Head>
        <title>Register | QuizApp</title>
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
          <h1 className="text-2xl text-center">Register</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-80"
            autoComplete="off"
            noValidate
          >
            <div className="flex flex-col">
              <ErrorMessage error={formik.errors.userName} />
              <Input
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
                placeholder="Username"
              />
            </div>
            <div className="flex flex-col">
              <ErrorMessage error={formik.errors.eMail} />
              <Input
                name="eMail"
                onChange={formik.handleChange}
                value={formik.values.eMail}
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
    </UnauthenticatedRoute>
  );
}

export default Register;
