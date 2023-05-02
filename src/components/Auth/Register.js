import { useState } from 'react'
import './Register.scss'
import { toast } from 'react-toastify'
import { postRegister } from '../../services/apiService.js'
import { useNavigate } from 'react-router-dom'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useTranslation } from 'react-i18next';
import Language from '../Header/Language'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUserName] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const { t } = useTranslation()
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        return String(password)
            .match(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@@#$%^&*]).{8,}/
            );
    }

    const handleRegister = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        const isValidPassword = validatePassword(password);
        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }
        if (!isValidPassword) {
            toast.error('Password must include at least 8 characters with 1 [A->Z], 1 [a->z], 1[!@#$%^&*] and 1 [0->9]');
            return;
        }
        //submit APIs
        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/login')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const handleNavigateLogin = () => {
        navigate('/login')
    }

    return (
        <div className="register-container">
            <div className='header'>
                <span>{t('login.title1.sloganheader')}</span>
                <button style={{ marginRight: "20px" }} onClick={() => { handleNavigateLogin() }}>{t('register.title1.signin')}</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>
                DungBumBeo
            </div>
            <div className='welcome col-4 mx-auto'>
                {t('register.title2.slogan')}
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>{t('register.title3.email')}(*)</label>
                    <input onChange={(event) => setEmail(event.target.value)} value={email} className='form-control' type='email' />
                </div>
                <div className='form-group'>
                    <label>{t('register.title3.username')}</label>
                    <input onChange={(event) => setUserName(event.target.value)} value={username} className='form-control' type='text' />
                </div>
                <div className='form-group password-group'>
                    <label>{t('register.title3.password')}(*)</label>
                    <input onChange={(event) => setPassword(event.target.value)} value={password} className='form-control' type={isShowPassword ? 'type' : 'password'} />
                    {isShowPassword ?
                        <span className='icons-eye'
                            onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span> :
                        <span className='icons-eye'
                            onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div>
                    <button onClick={() => { handleRegister() }} className='btn-submit'>{t('register.title4.register')}</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}> &#60; &#60; {t('register.title4.homepage')} &#62; &#62;</span>
                </div>
            </div>
        </div>
    )
}

export default Register