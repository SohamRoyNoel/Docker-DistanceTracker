import React from "react";
import { Formik } from "formik";
import apiDataReturner from "../loginQuery/login.axios";
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom';

export default function LoginForm() {
  const history = useHistory();
  return (
    <div style={{ marginTop: '10%', marginLeft: '30%', marginRight: '30%' }} className="form-group container">
    <p className="font-weight-bold" style={{ fontSize: 45 }}>LogIn</p>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
            return errors;
          }

          if(!values.password) {
            errors.password = "Required";
            return errors;
          }
          
        }}
        onSubmit={(values, { setSubmitting }) => {
           let body = {
                "email": values.email,
                "password": values.password
            };
            let data = apiDataReturner(body);
            new Promise((resolve, reject) => { 
                   resolve(data); 
            }).then((value) => {
                if(value !== undefined && value.data.success === true){
                    localStorage.setItem('_jid', value.data.token);
                    const decoded = jwt_decode(value.data.token);
                    if(decoded.role === "admin"){
                      history.push('/admin');
                    } else if (decoded.role === "user" || decoded.role === "admin") {
                      history.push('/user');
                    } else {
                      history.push('/');
                    }
                } else {
                    Swal.fire('Oops...', 'Something went wrong!', 'error')
                }
            })
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <label>Email address</label>
            <input
              type="text"
              name="email"
              style={{ width: '50%' }}
              className="form-control"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              required
            />
            {errors.email && touched.email && errors.email}
            <br />
            
            <br />
            <label>Password</label>
            <input
              type="password"
              name="password"
              style={{ width: '50%' }}
              className="form-control"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              required
            />
            {errors.password && touched.password && errors.password}
            <br />            
            <br />
            <button type="submit" className="btn btn-secondary" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}