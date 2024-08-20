import React, { useState } from "react";
import Logo from "./../../assets/imgs/Sign up.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [serverError, setServerError] = useState("");
let navigate = useNavigate()
  async function handleRegister(values) {
    try {
      const response = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        values
      );
      console.log(response);
      setServerError(response.data.msg || "Registration successful!");
      navigate('/login')
    } catch (error) {
      setServerError(error.response?.data?.msg || "An error occurred");
    }finally{
      values.name = ''
      values.email= ''
      values.password= ''
      values.age= ''
      values.phone= ''
    }
  }

  const schema = Yup.object({
    name: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(20, "At most 20 characters")
      .required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    age: Yup.number()
      .min(16, "Age must be at least 16")
      .max(60, "Age must be at most 60")
      .required("Age is required"),
    phone: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "Invalid phone number. It should be an Egyptian number starting with 01 and 11 digits."
      )
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: handleRegister,
    validationSchema: schema,
  });

  return (
    <>
      <div className="container ">
        <div className="child1  ">
          {serverError === "done" ? (
            <div className="mt-4 text-green-500">
              <p>Registration successful!</p>
            </div>
          ) : serverError ? (
            <div className="mt-4 text-red-600">
              <p>{serverError}</p>
            </div>
          ) : null}
          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your name"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-600">{formik.errors.name}</p>
              ) : null}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-600">{formik.errors.email}</p>
              ) : null}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-600">{formik.errors.password}</p>
              ) : null}
            </div>

            {/* Age */}
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formik.values.age}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your age"
              />
              {formik.touched.age && formik.errors.age ? (
                <p className="text-red-600">{formik.errors.age}</p>
              ) : null}
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your phone number"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <p className="text-red-600">{formik.errors.phone}</p>
              ) : null}
            </div>

          <div className="flex items-center ">
          <button
              type="submit"
              className=" text-white sm:px-2 lg:px-6  lg:me-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <p className="text-center ps-4 sm:p-0 text-sm lg:text-md "> Already have an account?<Link className="ps-2 font-semibold underline" to={'/login'}>Sign in</Link></p>
          </div>
           
          </form>
        </div>
        <div className="child2 ">
          <img src={Logo} alt="Logo" className="w-[80%] md:ms-[15%] hidden sm:block rounded-lg " />
        </div>
      </div>
    </>
  );
}
