import Sidebar from "./Sidebar"
import './Admin.scss'
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Language from "../Header/Language";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';


const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const { t, i18n } = useTranslation()

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => { setCollapsed(!collapsed) }} >
                        <FaBars className="left-side" />
                    </span>
                    <div className="right-side">
                        <Language />
                        <NavDropdown title={i18n.language === 'vi' ? 'Cài đặt' : 'Setting'} id="basic-nav-dropdown">
                            <NavDropdown.Item >{t('admin.title1.profile')}</NavDropdown.Item>
                            <NavDropdown.Item >{t('admin.title1.logout')}</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )
}

export default Admin