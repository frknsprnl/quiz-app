import { useState } from "react";
import UserLayout from "../..";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

function EditPassword() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validateOnChange: validateAfterSubmit,
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password must be 50 characters or fewer")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });
  return (
    <UserLayout>
      <div className="flex justify-center">
        <div className="flex flex-col gap-3 items-center w-80 py-5">
          <h1 className="text-2xl text-center">Update Password</h1>
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Must have at least 6 characters"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={<ErrorMessage error={formik.errors.password} />}
          />
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Must match password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={<ErrorMessage error={formik.errors.confirmPassword} />}
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

export default EditPassword;
