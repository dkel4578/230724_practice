import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function LoginForm () {
  let navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const submitHandler = (e) =>{
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

    axios.post('/api/auth/login', {
      email: email,
      password: password,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (response && response.status === 200) {
        alert('로그인 완료');
        navigate('/');
      } else {
        alert('로그인 실패');
      }
    })
    .catch(error => {
      console.error('Error during signup:', error);
      alert('로그인 실패');
    });

  }
  return (
    <section className="d-flex vh-100">
      <div className="container-fluid row justify-content-center align-content-center">
        <div className="card bg-dark">
          <div className="card-body p-5 text-center">
            <h2 className="text-white">LOGIN</h2>
            <p className="text-white-50 mt-2 mb-5">서비스를 사용하려면 로그인을 해주세요!</p>
            <div className = "mb-2">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label text-white">Email address</label>
                  <input type="email" className="form-control" name="username" required ref={emailRef}/>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input type="password" className="form-control" name="password" required ref={passwordRef}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              <button type="button" className="btn btn-secondary mt-3">회원가입</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginForm;