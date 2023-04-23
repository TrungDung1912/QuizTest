import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { SiReactivex } from "react-icons/si";
import { MdDashboard } from "react-icons/md";
import { FaGem } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import './Sidebar.scss'
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <SiReactivex size={'2em'} color={"pink"} />
                        <span style={{ paddingLeft: "20px" }}>DungBumBeo</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                            suffix={<span className='badge red'>New</span>}
                        >
                            Dashboard
                            <Link to="/admins" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title="Features"
                        >
                            <MenuItem>
                                Users Management
                                <Link to="/admins/manage-users" />
                            </MenuItem>
                            <MenuItem >Quiz Test Management</MenuItem>
                            <MenuItem>Question Bank Management</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://haryphamdev.github.io/hoidanit-udemy/"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                &#169; DungBumBeo Ques
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default Sidebar