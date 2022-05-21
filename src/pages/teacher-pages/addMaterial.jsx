import React from 'react';
import {List, ListItem, ListItemButton, Dialog, TextField} from '@mui/material'
import {Button} from '@mui/material'
import {useContext, useEffect, useState} from 'react'
import app from '../../firebase/firebase-config.js'
import {Context} from '../../context/Context.js'
import {updateDoc, doc} from 'firebase/firestore'

import {getFirestore, query,getDocs, collection, where} from 'firebase/firestore'
const AddMaterial = () => {
    const {user, dispatch} = useContext(Context)
    const db = getFirestore(app)
    const q = query(collection(db, 'groupCollection'), where("groupPlaylist", '==', '' ))
    const [groupData, setGroupData] = useState([])
    const [pickedGroup, setPickedGroup] = useState('')
    const [IdWriteOpen, setIdWriteOpen] = useState(false)
    const [pickedPlaylistID, setPickedPlaylistID] = useState('')

    const fetchGroups =async () => {
    return await getDocs(q)
    }
    
    const HandleButtonClick= () => {
        console.log(groupData)
        console.log(user.userName)

    }

    const handleGroupClick = (e) => {
        console.log('this activates dialog')
        setIdWriteOpen(true)
        setPickedGroup(e.target.id)
    }
    const handleDialogClose = () => {

        setIdWriteOpen(false)
    }
    const handleIDSubmit = async (e) => {
        console.log('this is submit button')
        console.log(pickedGroup)
        await updateDoc(doc(db, 'groupCollection' , pickedGroup), {
            groupPlaylist: pickedPlaylistID
        })
        setPickedPlaylistID('')
        setIdWriteOpen(false)

    }

    useEffect(() => {
      fetchGroups().then(data => setGroupData(data._snapshot.docChanges))
    
      
    }, [])
    
    
    return (
        <div className='content-box'>
            
            <h1>Hello </h1>
            <Button color='success' variant='outlined' onClick={HandleButtonClick}> Click here to see what happens</Button>
          <List>
                {groupData.map((group) => {
                const shortcut = group.doc.data.value.mapValue.fields
                return (
                   <ListItem>
                       <ListItemButton id={group.doc.key.path.segments.slice(-1)} style={{
                           'display' : 'flex',
                           "justifyContent" : "space-between"
                       }} onClick={handleGroupClick}>
                            <h1>{shortcut.groupName.stringValue} </h1><p style={{'fontSize' : '24px'}}>{shortcut.date.stringValue}</p>
                       </ListItemButton>
                   </ListItem> 
                )
            })}
              </List>           
              <Dialog onClose={handleDialogClose} open={IdWriteOpen} sx={
                  {

                  }
              } >
                <div style={{
                    'padding' : '50px',
                }}>
                    <h2>Insert Youtube Playlist Id</h2>
                  <TextField style={{
                      'width' : '100%'
                  }}
                  required
                  value={pickedPlaylistID}
                  onChange={e => setPickedPlaylistID(e.target.value)}
                  label="enter the ID"
                  variant='outlined'
                  />     
                  <div style={{
                      'display' : 'flex',
                      'justifyContent' : 'space-between',
                      'marginTop' : '3%'

                  }}>
                  <Button variant="outlined" color="success" onClick={handleIDSubmit}> Submit</Button>
                  <Button variant="outlined" color="error" onClick={handleDialogClose}> Cancel</Button>
                  </div>
                </div> 
                
              </Dialog>
        </div>
    );
};

export default AddMaterial;