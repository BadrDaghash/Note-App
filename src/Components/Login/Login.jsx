import React, { useState } from 'react'
import Logo from "./../../assets/imgs/Sign in.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [serverError, setServerError] = useState("");
  let navigate = useNavigate()
    async function handleLogin(values) {
      try {
        const response = await axios.post(
          `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
          values
        );
        console.log(response);
        localStorage.setItem("userToken", response?.data?.token);
        setServerError(response?.data.msg || "Registration successful!");
        navigate('/')
      } catch (error) {
        setServerError(error.response?.data?.msg || "An error occurred");
      }finally{
        values.email= ''
        values.password= ''
      }
    }
  
    const schema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    });
  
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: handleLogin,
      validationSchema: schema,
    });
  return (
    <>
 <div className="container ">
        <div className="child1  sm:mt-0">
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
            {/* Email */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
          <div className="flex items-center">
          <button
              type="submit"
              className=" text-white sm:px-2 lg:px-6  lg:me-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
            <p className="text-center ps-4 sm:ps-2 text-sm lg:text-md sm:px-2"> Already have an account?<Link className="ps-2 font-semibold underline" to={'/register'}>Sign up</Link></p>
          </div>
           
          </form>
        </div>
        <div className="child2 ">
          <img src={Logo} alt="Logo" className="w-[80%] md:ms-[15%] hidden sm:block rounded-lg mx-auto" />
        </div>
      </div>    </>
)
}
