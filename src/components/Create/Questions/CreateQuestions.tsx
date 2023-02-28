import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/Input/input";
import Button from "@/components/Button/Button";
import TextArea from "@/components/TextArea/TextArea";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import axios from "axios";
import toast from "react-hot-toast";

function Questions({ ...props }) {
  const [validateAfterSubmit, setValidateAfterSubmit] = useState(false);

  const { quizId, questionCount, setStep, setQuestionId, setQuestionCount } =
    props;

  const formik = useFormik({
    initialValues: {
      title: `${questionCount}`,
      description: "",
      quizId: quizId,
    },
    validateOnChange: validateAfterSubmit,
    validationSchema: Yup.object({
      description: Yup.string()
        .required("Description is required")
        .max(200, "Maximum character limit is 200"),
    }),
    onSubmit: async (values: any) => {
      const token = localStorage.getItem("token");
      console.log(values);
      if (token) {
        createquestion(values, token);
      }
    },
  });

  const createquestion = async (values: any, token: string) => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/create`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((resp) => {
        toast.success(resp.data.message);
        setQuestionCount(questionCount + 1);
        setQuestionId(resp.data.questionId);
        setStep(3);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 py-8">
      <div className="flex flex-col gap-3 mx-auto w-80">
        <TextArea
          label="Question"
          name="description"
          placeholder="Which is the most spoken language in Turkey?"
          h={180}
          onChange={formik.handleChange}
          value={formik.values.description}
          error={<ErrorMessage error={formik.errors.description} />}
        />
      </div>
      <div className="w-56 mx-auto">
        <Button
          name="Next"
          color="#7f5af0"
          type="submit"
          onClick={() => {
            setValidateAfterSubmit(true);
          }}
        />
      </div>
    </form>
  );
}

export default Questions;
