import React from 'react';
import {doc,setDoc, updateDoc, collection, query, where, getDocs, getFirestore, arrayUnion} from 'firebase/firestore'
import { useState, useEffect } from 'react';
import app from '../../../firebase/firebase-config'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Radio from '@mui/material/Radio'
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog'
import {FormControlLabel, RadioGroup, Button } from '@mui/material';

const UserAssign = () => {

   const db = getFirestore(app)
   const q = query(collection(db, 'userCollection'), where("userType", "==" ,"student"), where('groupId' , '==' , ""))
   const groupQ = query(collection(db, 'groupCollection'))
   const [studentData, setStudentData] = useState([])
   const [groupData, setGroupData] = useState([])
   const [pickedStudent, setPickedStudent] = useState('')
   const [pickedStudentId, setPickedStudentId] = useState('')
   const [pickedGroup, setPickedGroup] = useState('')
   const [userSelectOpen, setUserSelectOpen] = useState(false)

   const fetchData = async () => {return await getDocs(q)} 

   const handleGroupClick =  (e) => {
       setPickedGroup(e.target.id)
       setUserSelectOpen(true)
   }
   
   const handleObjectCheck = () => {
       const object = {
           pickedStudent,
           pickedGroup,
           pickedStudentId
           
       }
       console.log(object)
   }
   const handleDialogClose = () => {
      setUserSelectOpen(false) 
   }
   const handleStudentAssign = async() => {
       console.log("hello world")
        await setDoc(doc(db, 'groupCollection' , pickedGroup), {
           students: arrayUnion(pickedStudent)
       }, {merge: true})
        await setDoc(doc(db, 'userCollection', pickedStudentId), {
            groupId: pickedGroup
        }, {merge: true}).then(console.log("success"
        ))
       
        
   }
   const handleStudentPick = (e) => {
       setPickedStudent(e.target.id)
       setPickedStudentId(e.target.value)
   }
  useEffect(() => {
      fetchData().then(data => setStudentData(data._snapshot.docChanges))
      }, [])
  useEffect(() => {
      fetchGroups().then(data => setGroupData(data._snapshot.docChanges))
  })
   
   const fetchGroups =async () => {
       return await getDocs(groupQ)
   }
   
    return (
        <div>
       <h1>Groups</h1> 
       <List className='group-table'>
            {groupData.map((group) =>{
                const shortcut = group.doc.data.value.mapValue.fields
                return (
                    <ListItem  id={'ListItem'}>
                        <ListItemButton id={group.doc.key.path.segments.slice(-1)} onClick={handleGroupClick} style={{"display" : "flex", "justifyContent" : "space-between"}}>
                    <h1>{shortcut.groupName.stringValue} {shortcut.teacherName.stringValue}</h1> <h2 style={{"color" : "gray"}}>{shortcut.date.stringValue}</h2>
                        </ListItemButton>
                    </ListItem>
                )
            })
            }            
       </List>
       <Dialog onClose={handleDialogClose} open={userSelectOpen}>
           <h1>Lorem Ipsum</h1>
          <RadioGroup required name="Pick a student" value={pickedStudentId} onChange={handleStudentPick}> 
          {studentData.map((group) => {
              const shortcut = group.doc.data.value.mapValue.fields
              return (
                  <FormControlLabel value={shortcut.userId.stringValue} control={<Radio id={shortcut.userName.stringValue}/>} label={shortcut.userName.stringValue}/>
              )
          })} 
          </RadioGroup>
          <Button onClick={handleStudentAssign} color="success" variant="outlined" style={{"width" : "50%" , "margin" : "auto"}}> Submit</Button>
           
       </Dialog>
       <Button onClick={handleObjectCheck}> Click this to check out our Object</Button>
        </div>
    );
};

export default UserAssign;