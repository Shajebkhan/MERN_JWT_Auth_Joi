import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


function Login() {

  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    // destructure the value
    const { name, value } = e.target;
    console.log(name, value);

    // copying info

    // const copySignupInfo = { ...loginInfo };
    // copySignupInfo[name] = value;
    // setSignupInfo(copySignupInfo)
    // console.log(loginInfo);


    // or do this
    setLoginInfo({ ...loginInfo, [name]: value })
    console.log(loginInfo)
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return handleError('email or password are required')
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, error, name, jwtToken } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        setTimeout(() => {
          navigate('/home')
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
      <form action="" onSubmit={handleLogin}>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name='email'
            autoFocus
            placeholder='Enter Your Email'
            value={loginInfo.email} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name='password'
            autoFocus
            placeholder='Enter Your Password'
            value={loginInfo.password} />
        </div>
        <button type='submit'>Login</button>
        <span>Don't have an account ?
          <Link to='/signup'> Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login;