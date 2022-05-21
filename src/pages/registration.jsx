import { Button, FormControlLabel, RadioGroup,Radio, TextField, FormLabel } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import app from '../firebase/firebase-config'
import {getAuth, createUserWithEmailAndPassword, EmailAuthCredential, getAdditionalUserInfo} from 'firebase/auth'
import { setDoc, collection, addDoc, getFirestore, doc } from 'firebase/firestore';
const Register = () => {
    const auth = getAuth(app)
    const db = getFirestore(app)
const [userEmail, setUserEmail] = useState('')
const [userName, setUserName] = useState('')
const [userSurname, setUserSurname] = useState('')
const [userPassword, setUserPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [pickedCategory, setPickedCategory] = useState('')
const [pickedGender, setPickedGender] = useState('')
const [userAge, setUserAge] = useState('')

const [pwdError, setPwdError] = useState(false)

const handleSubjectChange = (e) => {
    setPickedCategory(e.target.value)
}
const HandleGenderChange = (e) => {
    setPickedGender(e.target.value)
}
const handleSubmit = async (e) => {
        e.preventDefault()
        if (userPassword != confirmPassword) {
            setPwdError(true)
        }
        else if ( userPassword == confirmPassword) {
            setPwdError(false)
        }
      const res =  await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      try {
          const docRef = await setDoc(doc(db, "userCollection", res.user.uid), {
              userName,
              userAge,
              pickedSubject : pickedCategory,
              userType: "student",
              userGender: pickedGender,
              userEmail,
              userId: res.user.uid,
              groupId: ""
          });
          console.log(docRef)
      } catch (e) {
          console.error("Error adding document : ", e)
      }
        window.location.assign('/')
}
    
    return (
        <main>
           <form className='Registration-form' onSubmit={handleSubmit}>

            <h1>Registration Form</h1>
               <TextField 
               style={{
                   "marginBottom" : "5%"
               }}
               required
               type='email'
               value={userEmail}
               onChange={e => setUserEmail(e.target.value)}
               id='Email-form'
               label='Enter your Email'
               variant='outlined'/>
               <TextField
               style={{
                   "marginBottom" : "5%"
               }}
               required
               value={userName}
               onChange={e => setUserName(e.target.value)}
                id='Name-form'
                label='Enter your name' 
                variant='outlined'/>
               <TextField
               style={{
                   "marginBottom" : "5%"
               }}
               required
               value={userSurname}
               onChange={e => setUserSurname(e.target.value)}
                id='Surname-form'
                label='Enter your surname' 
                variant='outlined'/>
 
                 <TextField style={{
                   'marginBottom' : '5%'
               }}

               value={userAge}
               type='number'
               onChange={e => setUserAge(e.target.value)}
               id="age-form"
               label="Enter your age"
               variant='outlined'/>


                <FormLabel id='front-back-radio'>Pick your specialization</FormLabel>
                <RadioGroup required name='Pick your specialization'
                aria-labelledby='front-back-radio'
                value={pickedCategory}
                onChange={handleSubjectChange}>

                                  <FormControlLabel
                    value='front-end'
                    control={<Radio />}
                    label='front-end' />
                    <FormControlLabel
                    value='back-end'
                    control={<Radio/>}
                    label='back-end' />
                </RadioGroup>
                <FormLabel id="gender-radio">Pick you gender</FormLabel>
                <RadioGroup required name='Select your gender'
                aria-labelledby='gender-radio'
                value={pickedGender}
                onChange={HandleGenderChange}>


                    <FormControlLabel
                    value='male'
                    control={<Radio />}
                    label='male' />
                    <FormControlLabel
                    value='female'
                    control={<Radio/>}
                    label='female' />
                </RadioGroup>
                
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
        </main>
    );
};

export default Register;