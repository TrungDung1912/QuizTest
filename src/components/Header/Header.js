import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postLogOut } from '../../services/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation, Trans } from 'react-i18next';
import { SiReactivex } from "react-icons/si";


const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t, i18n } = useTranslation()

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    const handleLogOut = async () => {
        let rs = await postLogOut(account.email, account.refresh_token)
        if (rs && rs.EC === 0) {
            dispatch(doLogout())
            navigate('/login')
        } else {
            toast.error(rs.EM)
        }
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand href="#home">Bumbeobeo</Navbar.Brand> */}
                <NavLink to="/" className='navbar-brand'><SiReactivex className='brand-icon' size={'2em'} color={"pink"} style={{ marginRight: "10px" }} />Bumbeobeo</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>{t('header.title1')}</NavLink>
                        <NavLink to="/users" className='nav-link'>{t('header.title2')}</NavLink>
                        <NavLink to="/admins" className='nav-link'>{t('header.title3')}</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-login' onClick={() => handleLogin()}>{t('header.title4.login')}</button>
                                <button className='btn-signup' onClick={() => handleRegister()}>{t('header.title4.register')}</button>
                            </>
                            :
                            <NavDropdown title={i18n.language === 'vi' ? 'Cài đặt' : 'Setting'} className='languages' id="basic-nav-dropdown">
                                <NavDropdown.Item >{t('header.title5.profile')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()}>{t('header.title5.logout')}</NavDropdown.Item>
                            </NavDropdown>
                        }
                        <Language />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;