import React from 'react';
import {doc, deleteDoc, getFirestore, getDocs, query, collection} from 'firebase/firestore'
import app from '../../../firebase/firebase-config'
import {useState, useEffect} from 'react'
import {Button, Dialog, List, ListItem, ListItemButton} from '@mui/material'

const GroupDelete = () => {
    const db = getFirestore(app)
    const groupQ = query(collection(db, "groupCollection"))
    const [groupData, setGroupData] = useState([])
    const [pickedGroup, setPickedGroup] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const handleDialogClose = () => {
        setDialogOpen(false)
    }
    const fetchGroups =async () => {
        return await getDocs(groupQ)
    }
   useEffect(() => {
      fetchGroups().then(data => setGroupData(data._snapshot.docChanges))
  })
const handleGroupClick = (e) => {
    setPickedGroup(e.target.id)
    setDialogOpen(true)
    console.log(pickedGroup)
}
const handleDeleteRequest =async () => {
 console.log(pickedGroup)
 await deleteDoc(doc(db, 'groupCollection' , pickedGroup))
 setDialogOpen(false)
 

}
   return (
        <div className='content-box'>
        <h1>Hello World</h1>
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
       <Dialog onClose={handleDialogClose} open={dialogOpen} >
           <h1>You Want to delete This group?</h1>
           <div className='button-box'>
           <Button variant='outlined' color='success' style={{'width' : '50%'}} onClick={handleDeleteRequest}>Confirm</Button>
           <Button varinat='outlined' color='error' style={{'width' : '50%'}} onClick={handleDialogClose}>Cancel</Button>
            </div>
       </Dialog>
        </div>
         
    );
};

export default GroupDelete;