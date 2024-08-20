import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Note from "../Note/Note";
import { useRecoilState } from "recoil";
import { noteAtom } from "../../Atoms/noteAtom";

export default function Home() {
  const [errNote, setErrNote] = useState("");
  const [notesArr, setNotesArr] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  let [notesLength, setNotesLength] = useRecoilState(noteAtom);

  async function addNotes(values) {
    await axios
      .post(`https://note-sigma-black.vercel.app/api/v1/notes`, values, {
        headers: {
          token: `3b8ny__${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        if (res?.data?.msg === "done") {
          console.log(res);
          values.title = "";
          values.content = "";
        }
        getNotes();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeModal();
      });
  }

  async function getNotes() {
    setErrNote("");
    setLoading(true); 
    await axios
      .get(`https://note-sigma-black.vercel.app/api/v1/notes`, {
        headers: {
          token: `3b8ny__${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res?.data);
        setNotesArr(res?.data?.notes);
        setNotesLength(res?.data?.notes.length);
      })
      .catch((err) => {
        console.log(err);
        setErrNote(err?.response?.data?.msg);
        setNotesLength(0);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when data fetching is done
      });
  }

  async function delNotes(noteId) {
    await axios
      .delete(`https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`, {
        headers: {
          token: `3b8ny__${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        getNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNotes,
  });

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className="pb-8">
        <div className="modal justify-between flex w-full pe-6 sm:pe-20 mt-2 ">
          <h2 className="text-3xl font-medium ps-6 sm:ps-24 lg:ps-40  text-black mt-2">
            Notes
          </h2>
          <button
            data-modal-target="default-modal"
            data-modal-toggle="default-modal"
            className="block text-white focus:ring-4 font-medium rounded-lg text-sm px-3 py-1 text-center sm:me-9"
            type="button"
            onClick={toggleIsOpen}
          >
            Add Note
          </button>

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
                      Note 1
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
                        Add
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

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="loader"></div>
          </div>
        ) : errNote ? (
          <h6 className="text-center uppercase font-semibold text-2xl py-6 flex justify-center items-center sm:justify-center sm:items-center sm:me-16 text-[#00796f]">
            {errNote}
          </h6>
        ) : (
          <>
            <div className="notes flex w-full justify-center mx-auto">
              <div className="grid sm:grid-cols-3 gap-3 max-w-screen-lg w-full p-4">
                {notesArr?.map((note, index) => (
                  <div
                    key={note._id}
                    className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <Note note={note} deleteFn={() => delNotes(note._id)} getnotes={getNotes} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
