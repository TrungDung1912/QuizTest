import { useState } from 'react'
import './Login.scss'

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        alert('me')
    }
    return (
        <div className="login-container">
            <div className='header'>
                Don't have an account yet?
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
                <span className='forgot-password'>Forgot Password</span>
                <div>
                    <button onClick={() => { handleLogin() }} className='btn-submit'>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login