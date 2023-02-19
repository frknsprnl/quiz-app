import { useState } from "react";
import UserLayout from "../..";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import axios from "axios";
import toast from 'react-hot-toast'

function EditPassword() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const updatePassword = async (passwords: object, token: string | null) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/updatepassword`,
        passwords,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((resp) => {
        toast.success(resp.data.message);
      })
      .catch((err) => {
        const errData = err.response.data;
        if (errData.error === "Identity Error") {
          toast.error(errData.errors.PasswordMismatch)
        }
      });
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validateOnChange: validateAfterSubmit,
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password must be 50 characters or fewer")
        .required("Password is required"),
      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters long")
        .max(50, "Password must be 50 characters or fewer")
        .required("Password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const pwValues = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      const token = localStorage.getItem("token");
      updatePassword(pwValues, token);
      resetForm();
    },
  });
  return (
    <UserLayout>
      <div className="flex justify-center">
        <div className="flex flex-col gap-3 items-center w-80 py-5">
          <h1 className="text-2xl text-center">Update Password</h1>
          <Input
            label="Old Password"
            name="oldPassword"
            type="password"
            placeholder="Must have at least 6 characters"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={<ErrorMessage error={formik.errors.oldPassword} />}
          />
          <Input
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="Must have at least 6 characters"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={<ErrorMessage error={formik.errors.newPassword} />}
          />
          <Input
            label="Confirm New Password"
            type="password"
            name="confirmNewPassword"
            placeholder="Must match password"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            error={<ErrorMessage error={formik.errors.confirmNewPassword} />}
          />
          <Button
            name="Update"
            color="#107eeb"
            type="submit"
            onClick={() => {
              formik.handleSubmit();
              setValidateAfterSubmit(true);
            }}
          />
        </div>
      </div>
    </UserLayout>
  );
}

export default EditPassword;
