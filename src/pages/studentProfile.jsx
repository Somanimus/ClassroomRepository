import { Button, FormControlLabel, RadioGroup,Radio, TextField, FormLabel } from '@mui/material';
import { Context } from '../context/Context';
import React, { useContext, useState } from 'react';
import {doc, getFirestore, updateDoc} from 'firebase/firestore'
import app from '../firebase/firebase-config'

const StudentProfile = () => {
    const db = getFirestore(app)
    const [redactMode, setMode] = useState(false)
    const [userNickname, setNickname] = useState('')
    const [userAge, setAge] = useState('')
    const [userEmail , setEmail]= useState ('')
    const [password, setPassword] = useState('')
    const [pickedCategory, setPickedCategory] = useState('')
   
    const {user, dispatch} = useContext(Context)
const handleSubjectChange = (e) => {
    setPickedCategory(e.target.value)
}
const changeFunction = () =>
{   setMode(true) 
    setAge(user.userAge.stringValue)
    setNickname(user.userNickname.stringValue)
    setPickedCategory(user.pickedSubject.stringValue)
    
}
const discardFunction = () => {
    setMode(false)
}
   const handleEdit =async (e) => {
       e.preventDefault()
    const resp = await updateDoc(doc(db, 'userCollection', user.userId.stringValue), {
           userNickname,
           userAge,
           pickedSubject: pickedCategory
       })
    //  dispatch({type: "USER_UPDATE", payload: res.data})
       console.log(resp)

    
}
 
    return (
        <div className='main-content-box'>
            {redactMode ? 
            <form  className='redact-mode-active'>

                <TextField
                style={{
                    "margin": "20px"
               }}
                value={userNickname}
                label='nickname'
                onChange={e => setNickname(e.target.value)}
                />
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
                <TextField
                style={{
                    "margin" : "20px"
                }}
                value={userAge}
                label='age'
                onChange={e => setAge(e.target.value)}
                type="number"
                />
                
            
            <Button variant="outlined" className='discard-button' onClick={discardFunction} color="error">Discard changes</Button>
            <Button variant="outlined" className="save-button" onClick={handleEdit} color="success">Save Changes</Button>
            </form> : 
            <div className='user-box content-box'>

            <div className='user-headers'>
                <h1>{user.userNickname.stringValue}</h1>
                <h2>{user.pickedSubject.stringValue}</h2>
           </div>

           <div className='user-info'>
                <p> gender : {user.userGender.stringValue}</p>
                <p> age : {user.userAge.stringValue}</p>
                <p> group : {user.userGroup ? user.userGroup.stringValue : "not assigned"}</p>
           </div>

            <h3>Manage Profile</h3>

            <div className='user-buttons'>
                <Button variant="contained" className='redact-button' onClick={changeFunction}>Redact</Button>
            </div>
        </div>
 }
        </div>
   );
};

export default StudentProfile;
/*          <div className='user-box content-box'>

            <div className='user-headers'>
                <h1>{user.nickname}</h1>
                <h2>{user.section}</h2>
           </div>

           <div className='user-info'>
                <p> gender : {user.gender}</p>
                <p> age : {user.age}</p>
                <p> group : {user.group}</p>
           </div>

            <h3>Manage Profile</h3>

            <div className='user-buttons'>
                <Button variant="contained" onClick={changeFunction}>Redact</Button>
                <Button variant="contained" onClick={handleDelete}>Delete</Button>
            </div>
        </div>
 */