import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import WaveImg from "@/assets/wave.svg";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/input";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { useFormik } from "formik";
import * as Yup from "yup";

function ChangePw() {
  const errInitialValues = { password: "", confirmPassword: "" };
  const [errorAfterSubmit, setErrorAfterSubmit] = useState(errInitialValues);

  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password must be 50 characters or fewer")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    validateOnChange: validateAfterSubmit,
    onSubmit: (values) => {},
  });
  return (
    <>
      <Head>
        <title> Update Password | QuizApp</title>
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
          src={WaveImg}
          priority={true}
          alt="wave img"
          className="absolute bottom-0 -z-40"
        />
        <div className="flex flex-col gap-3 justify-center items-center p-5 rounded-xl bg-[#16161a]">
          <h1 className="text-2xl text-center">Update Password</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-80"
            autoComplete="off"
            noValidate
          >
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
            <div className="flex flex-col">
              <ErrorMessage
                error={
                  formik.errors.confirmPassword ||
                  errorAfterSubmit.confirmPassword
                }
              />
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
            </div>
            <Button
              name="Update"
              type="submit"
              color="#7f5af0"
              onClick={() => setValidateAfterSubmit(true)}
            />
          </form>
        </div>
      </main>
    </>
  );
}

export default ChangePw;
