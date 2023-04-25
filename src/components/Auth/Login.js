import { useState } from 'react'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiService.js'
import { toast } from 'react-toastify'

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        //validate

        //submit APIs
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate('/')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <div className="login-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button>Sign up</button>
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
                <div className='form-group'>
                    <label>Password</label>
                    <input onChange={(event) => setPassword(event.target.value)} value={password} className='form-control' type='password' />
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