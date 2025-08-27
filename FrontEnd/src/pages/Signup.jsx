import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function Signup() {

    const navigate = useNavigate();
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        // destructure the value
        const { name, value } = e.target;
        console.log(name, value);

        // copying info
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo)
        console.log(signupInfo);


        // or do this
        //setSignupInfo({ ...signupInfo, [name]: value })
        // console.log(signupInfo)
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError(' name, email or password are required')
        }
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message)
            }
            console.log(result);
        } catch (err) {
            handleError(err)
        }
    }

    // const { name, email, password } = signupInfo
    return (
        <div className='container'>
            <h1>Login</h1>
            <form action="" onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name='name'
                        autoFocus
                        placeholder='Enter Your Name'
                        value={signupInfo.name} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name='email'
                        autoFocus
                        placeholder='Enter Your Email'
                        value={signupInfo.email} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name='password'
                        autoFocus
                        placeholder='Enter Your Password'
                        value={signupInfo.password} />
                </div>
                <button type='submit'>SignUp</button>
                <span>Already have an account ?
                    <Link to='/login'> Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup