import { Button, FormControlLabel,FormLabel,Radio, RadioGroup, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { addDoc, collection, getDocs,query,where,setDoc, doc, getFirestore, arrayUnion } from 'firebase/firestore';
import app from '../../../firebase/firebase-config'
const GroupAdd = () => {
    const db = getFirestore(app)
    const current = new Date()
    const date = `${current.getDate()}/${current.getMonth()}/${current.getFullYear()}` 
    const [groupName, setGroupName] = useState('')
    const [userData, setUserData] = useState([])
    const [teacherName, setTeacherName] = useState('')
   const [groupSubject, setGroupSubject] = useState('')
   const q = query(collection(db, 'userCollection'), where("userType", "==" ,"teacher"))
   const handleRadioChange = (e) => {
        setGroupSubject(e.target.value)
    }
    const handleTeacherRadioChange = (e) => {
        setTeacherId(e.target.value)
        setTeacherName(e.target.id)
    }
    console.log(teacherName)
    const fetchUsers =async () => {
     return  await getDocs(q) 
    }
          const handleGroupSubmit =async (e) => {
        e.preventDefault()
        await  addDoc(collection(db, "groupCollection"), {
            groupName,
            teacherName,
            teacherId,
            students: [],
            groupSubject,
            date,
            groupPlaylist: ''

        }
        )
        await setDoc(doc(db, 'userCollection' , teacherId), {
            groupsAssigned: arrayUnion(groupName)
        })
        window.location.assign('/admin-profile/')
    }
    const [teacherId, setTeacherId] = useState('')
    useEffect(() => {
            fetchUsers().then(data => setUserData(data._snapshot.docChanges))
      }, [])


  
   return (
       <form onSubmit={handleGroupSubmit} className="content-box"

       style={{
           "display" : "flex",
           "flexDirection" : "column",
           "margin" : "auto",
           "alignItems" : "center"
       }}>
           <h1>Create New Group</h1>
           <TextField variant='outlined' label='Name of the Group' 
           value={groupName}
           onChange={e => setGroupName(e.target.value)}
           required
           style={{
               "width" : "50%",
               "marginBottom" : "3%"
           }}/>
           <FormLabel>Subject of the Group</FormLabel>
           <RadioGroup
           name='subject-radio-group'
           required
           value={groupSubject}
           onChange={handleRadioChange}>

               <FormControlLabel value="front-end" control={<Radio/>} label="front-end" />
               <FormControlLabel value="back-end" control={<Radio/>} label="back-end" />
               
           </RadioGroup>
           <h1>There would be teacher assignment</h1>
           <RadioGroup required name="teacher-assign-radio" value={teacherId} onChange={handleTeacherRadioChange}>
               {userData.map((user) => {
               return (

                   <FormControlLabel className='hello' value={user.doc.data.value.mapValue.fields.userId.stringValue} control={<Radio id={user.doc.data.value.mapValue.fields.userName.stringValue}/>} label={user.doc.data.value.mapValue.fields.userName.stringValue}/>
                   
               )
           })}
           </RadioGroup>
          <Button variant='outlined' color='success' type="submit" onSubmit={handleGroupSubmit} >Submit</Button> 
      </form>
    );
};

export default GroupAdd;