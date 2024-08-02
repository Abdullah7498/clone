import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { SignUpUser } from "../toolkit/slices/authSlice";
import Loader from "../../Loader";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegisterForm() {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const { loading } = useSelector((state) => state.auth);
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setFieldError }
  ) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);

      if (file) {
        formData.append("profilePhoto", file);
      }

      // Log FormData contents
      for (let [key, value] of formData.entries()) {
        if (key === "profilePhoto") {
          console.log(`${key}:`, value.name, value.type, value.size);
        } else {
          console.log(`${key}:`, value);
        }
      }

      // Dispatch the action
      const response = await dispatch(SignUpUser(formData));
      console.log("SignUp response:", response);
      resetForm();
      setFile(null);
      // Handle successful signup (e.g., show a success message, redirect)
    } catch (error) {
      console.error("Signup error:", error);
      setFieldError(
        "general",
        "An error occurred during signup. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("File selected:", selectedFile);
  };

  return (
    <> 
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
                  Register
                </h2>

                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="profilePhoto"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {file && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected file: {file.name}
                    </p>
                  )}
                </div>

                {errors.general && touched.general && (
                  <div className="mb-4 text-red-500 text-xs italic">
                    {errors.general}
                  </div>
                )}

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
                <div className="flex items-center justify-center mt-4">
                  <a
                    href="/login"
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    Already have an account? Login
                  </a>
                </div>
              </Form>
            )}
          </Formik>
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 Twitter Clone. All rights reserved.
          </p>
        </div>
      </div>
      <Loader loading={loading} />
    </>
  );
}
