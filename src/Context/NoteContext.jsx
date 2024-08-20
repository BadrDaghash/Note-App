import axios from "axios";
import React, { createContext } from "react";

export const noteContext = createContext();
export default function NoteContextProvider(props) {
    function testNote(){
        console.log('Hello')     
    }

    // async function getNotes(){
    //     await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes`,{headers:{
    //         token:`3b8ny__${localStorage.getItem("userToken")}` 
    //     }})
    // }
  return (
    <>
      <noteContext.Provider value={{getNotes}}>
        {props.children}
      </noteContext.Provider>
    </>
  );
}
