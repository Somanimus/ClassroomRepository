import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { getFirestore } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import app from '../../../firebase/firebase-config';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore'
const TeacherAdd = () => {
    const auth = getAuth(app)
    const [userName, setUserName] = useState('')
    const [userSurname, setUserSurname] = useState('')
    const [userEmail, setEmail] = useState('')
    const [phoneNumber, setphoneNumber] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pwdError, setPwdError] = useState(false)
    const db = getFirestore(app)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (userPassword != confirmPassword) {
            setPwdError(true)
        }
        else if ( userPassword == confirmPassword) {
            setPwdError(false)
        }
             const res =  await createUserWithEmailAndPassword(auth, userEmail, userPassword)
             console.log(res)
      try {
          const docRef = await setDoc(doc(db, "userCollection", res.user.uid), {
              userName,
              userSurname,
              userType: "teacher",
              userEmail,
              userId: res.user.uid
          });
          console.log(docRef)
      } catch (e) {
          console.error("Error adding document : ", e)
      }
 
           // window.location.assign('/admin-profile')
    }
    return (

        <div className='content-box'>
            <h1>Add a teacher account</h1>
            <form  onSubmit={handleSubmit} style={{
                "display" : "flex",
                "flexDirection" : "column",
                "alignItems" : "center",
            }}> 
                <TextField
                label="Name"
                variant='outlined'
                value={userName} 
                onChange={e => setUserName(e.target.value)}/>

                <TextField 
                label="Surname" 
                variant='outlined' 
                value={userSurname} 
                onChange={e => setUserSurname(e.target.value)}/>
                
                <TextField 
                label="Email" 
                variant='outlined' 
                value={userEmail} 
                onChange={e => setEmail(e.target.value)}/>

                <TextField 
                label="Phone Number" 
                variant='outlined' 
                value={phoneNumber} 
                onChange={e => setphoneNumber(e.target.value)}/>
                <TextField
                style={{
                   "marginBottom" : "5%"
                }}
                required
                type='password'
                value={userPassword}
                onChange={e => setUserPassword(e.target.value)}
                id='password-form'
                label='Enter password'
                variant='outlined'/>
                <TextField
                style={{
                   "marginBottom" : "5%"
                 }}
                required
                error={pwdError == true}
                helperText={pwdError ? 'Correctly confirm your password' : ''}
                type='password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                id='password-confirm'
                label='Confirm password'
                variant='outlined'/>
                <Button type="submit" onSubmit={handleSubmit} variant='outlined' color='success' className='registration-button'>Submit</Button>
 
            </form>
            
        </div>
    );
};

export default TeacherAdd;