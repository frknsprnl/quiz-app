import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/input";
import TextArea from "@/components/TextArea/TextArea";
import { useFormik } from "formik";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import axios from "axios";
import * as Yup from "yup";
import toast from 'react-hot-toast'

function Quiz({ ...props }) {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  interface Category {
    id: string;
    categoryName: string;
  }

  const [categories, setCategories] = useState<Category[]>();

  const { setStep } = props;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      categoryId: "",
    },
    validateOnChange: validateAfterSubmit,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      categoryId: Yup.string().required("Category is required"),
    }),
    onSubmit: async (values: any, { resetForm }) => {
      const token = localStorage.getItem("token");
      if (token) {
        createquiz(values, token);
      }
      resetForm();
    },
  });

  const createquiz = async (values: any, token: string) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/quizzes/create`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((resp) => {
        toast.success(resp.data.message);
        setStep(2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/getall`)
      .then((resp) => {
        setCategories(resp.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 py-8">
      <div className="flex flex-col gap-3 mx-auto">
        <div className="w-full flex flex-col lg:max-w-sm">
          <label
            htmlFor="category"
            className="text-sm md:text-base px-2 text-white"
          >
            Category
          </label>
          <span className="text-sm text-red-500 pb-1.5 px-2">
          {/* @ts-ignore:next-line */}
            {formik.errors.categoryId}
          </span>

          <div className="relative">
            <select
              className="bg-[#16161a] px-4 py-2 w-full h-12 rounded-xl border outline-none drop-shadow-none appearance-none"
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
            >
              <option>Choose category</option>
              {categories?.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <MdOutlineKeyboardArrowDown size={24} />
            </div>
          </div>
        </div>
        <Input
          label="Title"
          name="title"
          placeholder="Which Marvel character are you?"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={<ErrorMessage error={formik.errors.title} />}
        />
        <TextArea
          label="Description"
          name="description"
          placeholder="Find your perfect superhero match. Are you Captain America or Spider-man? Maybe you are not an Avenger. If you want to know, this quiz is for you."
          h={120}
          onChange={formik.handleChange}
          value={formik.values.description}
          error={<ErrorMessage error={formik.errors.description} />}
        />
      </div>
      <div className="w-56 mx-auto">
        <Button name="Next" color="#7f5af0" type="submit" />
      </div>
    </form>
  );
}

export default Quiz;
