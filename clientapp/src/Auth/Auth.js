import { useForm } from 'react-hook-form';
import axios, {isCancel, AxiosError} from 'axios';
import React, { useRef, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
export default function Auth(){
 
const {
  register,
  handleSubmit,
  formState: { errors },
  reset
} = useForm();
const myElementRef = useRef(null);
const onSubmit = async (data) => {
  reset()
  console.log(data);
   
  try {
  const data1= await axios.post(
    'http://localhost:5001/users/login', 
         
        data,{
        headers: {
            'Content-Type': 'application/json'
        }
      }
    ) 
    console.log(data1)
  
  }
    
    catch (error) {
      if (error.response) {
        console.log('response error')
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        myElementRef.current.innerHTML =JSON.stringify(error.response.data);
      } else if (error.request) {
        console.log('request error')
        console.log(error.request);
        myElementRef.current.innerHTML ="Network Error"
      } else {
        console.log('Error', error.message);
        myElementRef.current.innerHTML ="Network Error"
      }
    }
    
};
return (
  <div className="Auth">
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label>Email</label>
        <input
          type="text"
          name="email"
          {...register("user_email", {
            required: true,
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid."
            }
          })}
        />
      </div>
      {errors["user_email"] && <p className="errorMsg">{errors["user_email"].message}</p>}

      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          name="password"
          {...register("user_password", {
            required: true,
            minLength: 6,
            validate: {
              checkLength: (value) => value.length >= 6,
              matchPattern: (value) =>
                /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value)
            }
          })}
        />
        <br/>
        Résultat: <div ref={myElementRef}></div>
        
        {errors["user_email"] && (
          <p className="errorMsg">{errors["user_email"].message}</p>
        )}
        {errors["user_password"]?.type === "required" && (
          <p className="errorMsg">Password is required.</p>
        )}
        {errors["user_password"]?.type === "minLength" && (
          <p className="errorMsg">Password should be at least 6 characters.</p>
        )}
        {errors["user_password"]?.type === "matchPattern" && (
          <p className="errorMsg">Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.</p>
        )}
      </div>
      <div className="form-control">
        <label></label>
        <button type="submit">Login</button>
      </div>
    </Form>
  </div>
);
}