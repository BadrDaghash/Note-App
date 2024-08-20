import { useState } from "react";

import "./App.css";
import Home from "./Components/Home/Home";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Rigester/Register";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "/Note-App/",
      element: <Layout />,
    },
  ]);
  return (
    <>
      <RecoilRoot>
        <RouterProvider router={router}> </RouterProvider>
      </RecoilRoot>
    </>
  );
}
export default App;
