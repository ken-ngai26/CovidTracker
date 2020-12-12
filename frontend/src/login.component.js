import * as React from 'react';
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

export default function Login (){


    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [msg, setmsg] = React.useState("");

    let history = useHistory();

    const isAuth = React.useCallback(async () =>{
        fetch("/getUser")
        .then((res) => res.json())
        .then((data) => {
        if (data.user !== undefined) {
            history.push('/');
        }
        });
        isAuth();
    }, [history]);

  async function handleSubmit(e) {
    e.stopPropagation();
    if (validate()) {
      e.preventDefault();
      let data = await fetch_request();
      if (await data['user'] != null) {
        history.push('/');
      }
      if (await data['msg'] != null) {
        setmsg(data['msg']);
      }
    }
  }
  async function fetch_request() {
    let data = await fetch('/sig-in', {
      method: 'post',
      body: JSON.stringify({ "email": email, "password": password })    
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      return data;
    }).catch(error => console.warn(error));
    return data;
  }

  function validate() {
    let isValid = true;
    if (password.length <= 0) {
      isValid = false;
    }
    if (email.length <= 0) {
      isValid = false;
    }
    return isValid;
  }

        return (
            <div className="Login">
      <div className="LoginBox">
        <Form method='post'>
          <h2>
            Login
          </h2>
          <FormGroup controlId="email" >
            <FormControl
              placeholder="Email"
              autoFocus
              name='email'
              value={email}
              type='email'
              onChange={e => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId='password'>
            <FormControl
              placeholder="Password"
              name='password'
              value={password}
              type='password'
              onChange={e => setPassword(e.target.value)}
            >
            </FormControl>
          </FormGroup>
          <p className='error'>{msg}</p>
        </Form>
        <Button block onClick={e => handleSubmit(e)} type='submit'>
          Login
          </Button>
        <p className='sign-up'>
          Don't have an account? <p className='link' onClick={() => history.push('/sign-up')} >Sign-up</p>
        </p>
      </div>
    </div>
  )
}