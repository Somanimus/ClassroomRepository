import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getDoc,doc, getDocs, query, getFirestore, collection } from 'firebase/firestore';
import app from '../../../firebase/firebase-config'

const GroupsInfo = () => {
    const db = getFirestore(app)
    const q = query(collection(db, 'groupCollection'))
    const [teacherData , setTeacherData] = useState('')
    const fetchData = () => {
      return getDocs(collection(db, 'groupCollection')) 
    }
 
 const [groupData, setGroupData] = useState([])
   useEffect(() => {
       fetchData().then(data => setGroupData(data._snapshot.docChanges))
   }, [])
//       useEffect(() => {
//         fetchData().then(data => setGroupData(data)) 
//     }, [])
 
//   fetchData().then(data => console.log(data))
   
   
    return (
        <div className='content-box'>
           {groupData.map((group) => {
               const path = group.doc.data.value.mapValue.fields
               return(
                   
                   <div className='groupContainer'>
                       <h1>{path.groupName.stringValue}</h1>
                        <p>{path.groupSubject.stringValue}</p>
                        <p>{path.teacherName.stringValue}</p>
                   </div>
               )
           })} 
       </div>
    );
};
//console.log(data._document.data.value.mapValue.fields.userName.stringValue
export default GroupsInfo;