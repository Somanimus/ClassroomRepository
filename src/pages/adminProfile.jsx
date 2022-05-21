import React from 'react';
import { Link } from 'react-router-dom';

const AdminProfile = () => {
    return (
        <div className='content-box admin-content-box'>
            <div style={{
                "display" : 'flex',
                "alignItems" : "center",
                "justifyContent" : "space-around",
                "flexDirection" : 'column',
                "height" : "30%"
            }}>
                <h2>Manage Users</h2>
                <Link to="/user-assign">Assign student to a group</Link>
                <Link to="/teacher-add">Add a teacher account</Link>
            </div>
            <div style={{
                "display" : 'flex',
                "alignItems" : "center",
                "justifyContent" : "space-around",
                "flexDirection" : 'column',
                "height" : "30%"
            }}>
                <h2>Manage Groups</h2>
                <Link to="/group-add">Add a new group</Link>
                <Link to="/group-info">See All Groups</Link>
                <Link to="/group-delete">Delete Group</Link>
            </div>
        </div>
    );
};

export default AdminProfile;