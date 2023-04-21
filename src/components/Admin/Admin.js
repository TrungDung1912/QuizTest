import Sidebar from "./Sidebar"
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <FaBars style={{ cursor: "pointer" }} onClick={() => { setCollapsed(!collapsed) }} />
                aaaaa
            </div>
        </div>
    )
}

export default Admin