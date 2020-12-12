import * as React from 'react';
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import {  useHistory } from 'react-router-dom';



export default function SignUp() {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [conf_password, setConfPassword] = React.useState("");
  const [emailErr, setEmailError] = React.useState("");
  const [PError, setPError] = React.useState("");
  const [confPError, setConfPError] = React.useState("");
  const [regErr, setRegError] = React.useState(""); 

  const history = useHistory();

  function handleSubmit(e) {
    e.stopPropagation();
    if (isPassword() && isEmail()) {
      e.preventDefault();
      fetch('/sign-up', {
        method: 'post',
        body: JSON.stringify({"email":email, "password":password})
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.err){
          setRegError(data.err);
        }else{
          setRegError("");
        }
      });
    }
  }


  const isAuth = React.useCallback(async () =>{
    fetch("/getUser")
    .then((res) => res.json())
    .then((data) => {
      if (data.user !== undefined) {
          history.push('/');
      }
    });
  }, [history]);
  
  React.useEffect(() => {
    isAuth(); 
    isPassword();
    isEmail();
  }, [password, conf_password, email]);

  function isPassword() {
    if ( password.length < 3 && password.length > 0) {
      setPError("Password must be at least 3 character long");
      return false;
    }else {
      setPError('');
    }
    if (password !== conf_password) {
      setConfPError("Passwords dont match");
      return false;
    } else {
      setConfPError("");
    }

    return true;
  }
                    
  function isEmail() {
    if (email.length === 0 || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      setEmailError("");
    }
    else {
      setEmailError("Email is Invalid");
      return false;
    }
    return true;
  }


  return (
    <div>
      <div>
        <Form method="post">
          <h2>
            Sign up
           </h2>
            <FormGroup controlId="email" >
            <FormControl name='email' placeholder="Email" autoFocus type='email' onChange={e => setEmail(e.target.value)}
              isInvalid={!!emailErr || !!regErr}/>
            <Form.Control.Feedback type='invalid'>
              {emailErr || regErr}
            </Form.Control.Feedback>
            </FormGroup>
            <FormGroup controlId='password'>
            <FormControl name='password' placeholder="Password" type='password' onChange={e => setPassword(e.target.value)}
              isInvalid={!!PError}/>
            <Form.Control.Feedback type='invalid'>
              {PError}
            </Form.Control.Feedback>
            </FormGroup>
            <FormGroup controlId='password-match'>
            <FormControl name='conf_password' placeholder="Confirm Password" type='password' onChange={e => setConfPassword(e.target.value)}
              isInvalid={!!confPError}>
            </FormControl>
            <Form.Control.Feedback type='invalid'>
              {confPError}
            </Form.Control.Feedback>
            </FormGroup>
        </Form>

        <Button block onClick={e => handleSubmit(e)} type='submit'>SignUp</Button>
        <p className = 'SignUp'>
        Already have an account? <strong className='link' onClick = {() => history.push('/sign-in')} >Login!</strong>
        </p>
      </div>
    </div>
  )
}
