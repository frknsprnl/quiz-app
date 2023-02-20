import { useState } from "react";
import UserLayout from "../..";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import TextArea from "@/components/TextArea/TextArea";
import axios from "axios";
import toast from 'react-hot-toast'

function EditProfile() {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      biography: "",
    },
    validateOnChange: validateAfterSubmit,
    onSubmit: async (values, { resetForm }) => {
      const token = localStorage.getItem("token");
      updateProfile(values, token);
      resetForm();
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .matches(/^[a-zA-Z\s]*$/, "Please enter a valid first name"),
      lastName: Yup.string()
        .required("Last name is required")
        .matches(/^[a-zA-Z\s]*$/, "Please enter a valid last name"),
      biography: Yup.string()
        .required("Biography is required")
        .max(500, "Biography must be less than 500 characters"),
    }),
  });

  const updateProfile = async (values: object, token: string | null) => {
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/updateprofile`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((resp) => {
        toast.success(resp.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserLayout>
      <div className="flex justify-center">
        <div className="flex flex-col gap-3 items-center w-80 py-5">
          <h1 className="text-2xl text-center">Update Profile</h1>
          <Input
            label="First Name"
            placeholder="e.g John/Jane"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={<ErrorMessage error={formik.errors.firstName} />}
          />
          <Input
            label="Last Name"
            placeholder="e.g Doe"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={<ErrorMessage error={formik.errors.lastName} />}
          />
          <TextArea
            label="Biography"
            placeholder="Tell us about yourself!"
            name="biography"
            h={160}
            onChange={formik.handleChange}
            value={formik.values.biography}
            error={<ErrorMessage error={formik.errors.biography} />}
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

export default EditProfile;
