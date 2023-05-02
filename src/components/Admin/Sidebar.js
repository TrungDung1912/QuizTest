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
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Sidebar = (props) => {
    const navigate = useNavigate()
    const { collapsed, toggled, handleToggleSidebar } = props;
    const { t, i18n } = useTranslation()

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
                        <span style={{ paddingLeft: "20px", cursor: "pointer" }} onClick={() => navigate('/')}>DungBumBeo</span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                            suffix={<span className='badge red'>{t('sidebar.title1.new')}</span>}
                        >
                            {t('sidebar.title1.dashboard')}
                            <Link to="/admins" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title={i18n.language === 'vi' ? 'Chức năng' : 'Features'}
                        >
                            <MenuItem>
                                {t('sidebar.title2.user')}
                                <Link to="/admins/manage-users" />
                            </MenuItem>
                            <MenuItem >
                                {t('sidebar.title2.quiz')}
                                <Link to="/admins/manage-quizzes" />
                            </MenuItem>
                            <MenuItem>
                                {t('sidebar.title2.question')}
                                <Link to="/admins/manage-questions" />
                            </MenuItem>
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