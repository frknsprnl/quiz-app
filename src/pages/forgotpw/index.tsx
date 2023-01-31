import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import Link from "next/link";
import Image from "next/image";
import WaveImg from "@/assets/wave.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

function ForgotPassword() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
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
    }),
  });
  return (
    <>
      <Head>
        <title>Forgot Password | QuizApp</title>
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
          src={WaveImg}
          alt="wave img"
          className="absolute bottom-0 md:-bottom-10 -z-40"
        />
        <div className="flex flex-col gap-3 justify-center items-center">
          <h1 className="text-2xl text-center">Forgot Password</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-80"
            autoComplete="off"
            noValidate
          >
            <div>
              <ErrorMessage error={formik.errors.email} />
              <Input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="E-mail"
              />
            </div>
            <Button
              name="Send"
              color="#7f5af0"
              onClick={() => setValidateAfterSubmit(true)}
            />
            <span className="text-center">
              Remember password?{" "}
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

export default ForgotPassword;
