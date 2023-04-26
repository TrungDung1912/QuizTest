import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService.js'
import { toast } from 'react-toastify'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useDispatch } from 'react-redux'
import { doLogin } from '../../redux/action/userAction'

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const handleLogin = async () => {
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
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            navigate('/')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const handleNavigateRegister = () => {
        navigate('/register')
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => { handleNavigateRegister() }}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                DungBumBeo
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, who’s this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input onChange={(event) => setEmail(event.target.value)} value={email} className='form-control' type='email' />
                </div>
                <div className='form-group password-group'>
                    <label>Password(*)</label>
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
                <span className='forgot-password'>Forgot Password?</span>
                <div>
                    <button onClick={() => { handleLogin() }} className='btn-submit'>Login</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }}> &#60; &#60; Come back home &#62; &#62;</span>
                </div>
            </div>
        </div>
    )
}

export default Login