import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

export default function Note({ note, deleteFn, getnotes }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  async function updateNotes(values) {
    setLoading(true);
    try {
      await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${note._id}`,
        values,
        {
          headers: {
            token: `3b8ny__${localStorage.getItem("userToken")}`,
          },
        }
      );
      closeModal();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      getnotes();
    }
  }

  const formik = useFormik({
    initialValues: {
      title: note.title,
      content: note.content,
    },
    onSubmit: (values) => {
      updateNotes(values);
    },
  });

  return (
    <>
      <div className="relative">
        {/* Date Display */}
        <p className="absolute top-0 right-0 text-xs text-gray-500 dark:text-gray-400">
          {formattedDate}
        </p>

        <h5 className="text-md font-medium tracking-tight text-[#007962] dark:text-white">
          {note.title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {note.content}
        </p>
        <div className="flex gap-4 py-1 justify-end">
          <Link>
            <FontAwesomeIcon
              className="text-[#007962] hover:text-[#00796388]"
              icon={faPenToSquare}
              onClick={toggleIsOpen}
            />
          </Link>
          <Link>
            <FontAwesomeIcon
              className="text-[#007962] hover:text-[#00796388]"
              icon={faTrash}
              onClick={() => deleteFn(note._id)}
            />
          </Link>
        </div>
      </div>

      <div className="modal justify-end flex w-full pe-6 sm:pe-20">
        {isOpen && (
          <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center"
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Note
                  </h3>
                  <button
                    onClick={closeModal}
                    type="button"
                    className="text-gray-400 focus:ring-2 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <div className="p-4 md:p-5 space-y-4">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="mb-6">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007962] focus:border-[#007962] duration-300 transition-all block w-full p-2.5"
                        placeholder="Enter note title"
                      />
                    </div>
                    <div className="mb-6">
                      <textarea
                        id="content"
                        name="content"
                        value={formik.values.content}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className="bg-gray-50 border resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#007962] focus:border-[#007962] duration-300 transition-all block w-full p-2.5"
                        placeholder="Enter note content"
                      />
                    </div>
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        type="submit"
                        className="font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#007962] text-white"
                      >
                        {loading ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            className="text-white text-lg" 
                          />
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                      <button
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#00796e] focus:z-10 focus:ring-4 focus:ring-gray-100"
                        onClick={closeModal}
                      >
                        Cancel 
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
