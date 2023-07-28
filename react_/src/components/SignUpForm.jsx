import React, { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpForm () {
  let navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nicknameRef = useRef(null);

  const submitHandler = (e) =>{
    e.preventDefault();
    console.log('따닥')
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const nickname = nicknameRef.current.value;

    const jsonContent = process.env.REACT_APP_API_JSON_CONTENT;

    axios.post('/api/auth/signup', {
      email: email,
      password: password,
      nickname: nickname,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => {
      if (response && response.status === 200) {
        alert('회원가입 완료');
        navigate('/login');
      } else {
        alert('회원등록 실패');
      }
    })
    .catch(error => {
      console.error('Error during signup:', error);
      alert('회원등록 실패');
    });
  }
  
  return (
    <>
      <section className="d-flex vh-100">
      <div className="container-fluid row justify-content-center align-content-center">
        <div className="card bg-dark">
          <div className="card-body p-5 text-center">
            <h2 className="text-white">SIGN UP</h2>
            <p className="text-white-50 mt-2 mb-5">서비스 사용을 위한 회원 가입</p>
            <div className = "mb-2">
              {/* <form th:action="@{/user}" method="POST"> */}
                {/* <input type="hidden" th:name="${_csrf?.parameterName}" th:value="${_csrf?.token}" /> */}
                <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label text-white">Email address</label>
                  <input type="email" className="form-control" name="email" id="email" required ref={emailRef}/>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input type="password" className="form-control" name="password" id="password" required ref={passwordRef}/>
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Nickname</label>
                  <input type="text" className="form-control" name="nickname" id="nickname" required ref={nicknameRef}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default SignUpForm;