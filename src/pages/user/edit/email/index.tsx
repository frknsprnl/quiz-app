import { useState } from "react";
import UserLayout from "../..";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

function EditMail() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnChange: validateAfterSubmit,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email.")
        .required("Email is required."),
    }),
  });

  return (
    <UserLayout>
      <div className="flex justify-center">
        <div className="flex flex-col gap-3 items-center w-80 py-5">
          <h1 className="text-2xl text-center">Update Email</h1>
          <Input
            label="Email"
            placeholder="e.g test@quizapp.com"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={<ErrorMessage error={formik.errors.email} />}
          />
          <Button
            name="Update"
            color="#107eeb"
            type="submit"
            onClick={formik.handleSubmit}
          />
        </div>
      </div>
    </UserLayout>
  );
}

export default EditMail;
