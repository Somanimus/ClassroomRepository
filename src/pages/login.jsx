import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Context } from '../context/Context';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import app from '../firebase/firebase-config'
import {collection, getDoc, getFirestore, doc} from 'firebase/firestore'

const Login = () => {
  const auth = getAuth(app)
  const db = getFirestore(app)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [object, setObject] = useState('')
  const {dispatch, user} = useContext(Context)
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
    try {const res = await signInWithEmailAndPassword(auth, email, password)
      // dispatch({type: "LOGIN_SUCCESS", payload: res.data.user})
      const querySnapshot = await getDoc(doc(db, 'userCollection', res.user.uid))
      dispatch({type: "LOGIN_SUCCESS", payload: querySnapshot._document.data.value.mapValue.fields})
      

    setEmail('')
    setPassword('')
    // window.location.assign('/curriculum')
    }
    catch (err){
      console.log(err)
      dispatch({type: "LOGIN_FAILURE"})
    }
 }
    return (
        <main>
          <h1>This should be a Login Page</h1>  
          <p>{object}</p>

          <form onSubmit={handleLogin} className='login-form'>
             
            <TextField
            label='email'
            value={email}
            onChange={e => setEmail(e.target.value)} 
            type='email' 
            variant='outlined'/>

            <TextField 
            label='password' 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            type='password' 
            variant='outlined'/>

            <Button 
            type='submit' 
            variant='outlined' 
            color='success' 
            onSubmit={handleLogin}>Login</Button>

          </form>
        </main>
    );
};

export default Login;