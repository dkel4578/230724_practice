import React, { useState, useRef, useContext, useEffect } from 'react';


function SignUpForm () {
  return (
    <>
      <section className="d-flex vh-100">
      <div className="container-fluid row justify-content-center align-content-center">
        <div className="card bg-dark">
          <div className="card-body p-5 text-center">
            <h2 className="text-white">SIGN UP</h2>
            <p className="text-white-50 mt-2 mb-5">서비스 사용을 위한 회원 가입</p>
            <div class = "mb-2">
              {/* <form th:action="@{/user}" method="POST"> */}
                {/* <input type="hidden" th:name="${_csrf?.parameterName}" th:value="${_csrf?.token}" /> */}
                <div className="mb-3">
                  <label className="form-label text-white">Email address</label>
                  <input type="email" className="form-control" name="email" />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Password</label>
                  <input type="password" className="form-control" name="password" />
                </div>
                <div className="mb-3">
                  <label className="form-label text-white">Nickname</label>
                  <input type="text" className="form-control" name="nickname" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
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