import { useContext } from "react";
import { AuthContext } from "../features/auth/AuthContext";
import { navConfig } from "./navConfig";
import { NavLink } from "react-router-dom";


function Sidebar() {
    const { user } = useContext(AuthContext);

    const navItems = navConfig.filter(item => item.roles.includes(user?.role));

    return (
        <div>
            <nav>
                <ul>
                    {navItems.map((navItem) => {
                        <li key={navItem.lable}>
                            <NavLink
                                to={NavLink.to}
                                style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}
                            >{NavLink.lable}</NavLink>
                        </li>
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default ErrorState;