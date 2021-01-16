import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from "formik";
import * as Yup from "yup";
import apiDataReturner from '../adminQuery/admin.axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  textPadding: {
      marginLeft: '40%',
      className: 'container'
  }
}));

export default function AdminForm() {
  const classes = useStyles();
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const logOut = () => {
      localStorage.removeItem("_jid");
      history.push("/login");
  };

  return (
    <Formik
    initialValues={{ location: "" }}
    onSubmit={async values => {
      setDisable(true);
      let data = apiDataReturner(values.location.toUpperCase().replace(/ /g,''));
      new Promise((resolve, reject) => { 
          resolve(data); 
      }).then((value) => {
            if(value.data.success === true) {
                Swal.fire('Created', `${value.data.status}`, 'success');
                setDisable(false);
            } else {
                Swal.fire('Oops...', `${value.data.error}`, 'error')
                setDisable(false);
            }
      })
    }}
    validationSchema={Yup.object().shape({
        location: Yup.string()
        .required("Required")
        .test(',', 'You must enter an address like <CITY>,<CountryCode>', val => val !== undefined ? (val.includes(',') === true) : 'Required')
    })}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;
      return (
        <form onSubmit={handleSubmit} className={classes.textPadding}>
          <label htmlFor="location" style={{ display: "block" }}>
            Default Location
          </label>
          <input
            id="location"
            placeholder="Eg: Kolkata, IN"
            type="text"
            style={{ width: '30%' }}
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            className={
              errors.location && touched.location
                ? "form-control error"
                : "form-control"
            }
          />
          {errors.location && touched.location && (
            <div className="input-feedback">{errors.location}</div>
          )}
          <br />
          <button type="submit" className="btn btn-primary" disabled={disable}>
            Submit
          </button>
          &nbsp;
          <button onClick={logOut} className="btn btn-danger" disabled={disable}>
            LogOut
          </button>
        </form>
      );
    }}
  </Formik>
  );
}