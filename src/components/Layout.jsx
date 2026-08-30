import { Outlet } from "react-router-dom"

function Layout(params) {
    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Layout;