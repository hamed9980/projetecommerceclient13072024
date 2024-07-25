import React from "react";
import  { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import MultiStepHeader from './MultiStepHeader'
import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios, {isCancel, AxiosError} from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import   { useRef  } from 'react';
const SecondStep = (props) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const myElementRef = useRef(null);
  

  useEffect(() => {
    if (countdown === 0) {
      navigate('/auth');
    }
  }, [countdown, navigate]);
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },reset
  } = useForm({
    defaultValues: {
      user_email: user.user_email,
      user_password: user.user_password
    }
  });

  const onSubmit = async (data) => {
    try{
    props.updateUser(data);
    

    var dataf=props.user;
    
    if(dataf.user_email==undefined || dataf.user_email==''){
      console.log('added data')
      dataf.user_email=data.user_email;
      dataf.user_password=data.user_password
    }
    const body=dataf
 
    const response = await axios.post(
      'http://localhost:5001/users/signup',
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
       console.log(response.data)
       console.log(body)
       reset()
       props.updateUser({first_name:"",
        last_name:"",
        user_email:"",
        user_password:""

       })
        
       console.log('reset form')
       if(response.data==="Something Went Wrong"){
       
        myElementRef.current.innerText="You are already registered "+".Redirecting to auth page in "+countdown+" seconds"


        const interval = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
          
        }, 1000);
    
        return () => clearInterval(interval);
        
       }
       else{
        
        myElementRef.current.innerText="Registration success"+".Redirecting to auth page in "+countdown+" seconds"
        const interval = setInterval(() => {
          setCountdown(prevCountdown => prevCountdown - 1);
          
        }, 1000);
    
        return () => clearInterval(interval);
       }
      }catch(ex){

        console.log(ex)
      }
  };

  return (
    <>
     <MultiStepHeader/>
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Form.Group controlId="first_name">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="user_email"
            placeholder="Enter your email address"
            autoComplete="off"
            {...register("user_email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid."
              }
            })}
            className={`${errors.user_email ? "input-error" : ""}`}
          />
          {errors.user_email && (
            <p className="errorMsg">{errors.user_email.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="user_password"
            placeholder="Choose a password"
            autoComplete="off"
            {...register("user_password", {
              required: "Password is required.",
              minLength: {
                value: 6,
                message: "Password should have at least 6 characters."
              },
              validate: {
                matchPattern: value =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#*$])/.test(value) ||
                  "Password must contain lowercase and uppercase letters, digits, and special symbols"
              }
            })}
            
            className={`${errors.user_password ? "input-error" : ""}`}
          />
            {errors.user_password?.type === "required" && (
    <p className="errorMsg">Password is required.</p>
)}
{errors.user_password?.type === "minLength" && (
    <p className="errorMsg">
    	Password should be at-least 6 characters.
    </p>
)}
{errors.user_password?.type === "matchPattern" && (
    <p className="errorMsg">
    	Password should contain at least one uppercase letter, lowercase
letter, digit, and special symbol.
    </p>)}
        </Form.Group>

        <Button variant="primary" type="submit">
          Next
        </Button>
      </motion.div>
    </Form>
    <div ref={myElementRef}></div>
    </>
  );
};

export default SecondStep;
