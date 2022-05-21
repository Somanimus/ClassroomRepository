import React, { useContext } from 'react';
import Main from '../pages/main';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import { Button } from '@mui/material';

const Header = () => {
    const {user, dispatch} = useContext(Context)
    const logOutFunction =async () => {
      await dispatch({type: "LOG_OUT"})
      localStorage.clear()
      window.location.assign('/'
      )
      }
    return (
       <header>    
           <div className='header-logo'>
               <h1>IT-RUN classroom</h1>
           
           </div>
           <nav>
             {user ? user.userType.stringValue == "admin" ? '' : '' : ''}
            
                  
            {user ? <Button onClick={logOutFunction}>Log out</Button>:<Link to="login">Log In</Link>}
            {user ?

             user.userType.stringValue == 'admin'?
             <Link to="admin-profile"className='profile-link' >Profile</Link>: user.userType.stringValue == 'teacher' ?
             <Link to="teacher-profile" className='profile-link'>Profile</Link> : <Link to="student-profile" className='profile-link'>Profile</Link> 
            : <Link to="register" className='profile-link'>Register</Link>}
          </nav>
       </header> 
    );
};

export default Header
//  {(() => {
//                 switch (user.userType) {
//                     case 'admin':
//                         return(
//                             <h1>Admin</h1>
//                         )
//                     case 'student':
//                         return(
//                             <h1>Student</h1>
//                         )
//                     default: 
//                     return(<h1>this is a normal page</h1>)
//                 }
//             })()} 