import axiosClient from "./api/axiosClient"
import { Routes, Route } from "react-router-dom"

import Layout from "./components/Layout"
import Login from "./pages/Login"



function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>


        </>
    )
}

export default App
