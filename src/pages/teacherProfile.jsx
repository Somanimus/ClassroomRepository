import React from 'react';
import {Link} from 'react-router-dom'

const TeacherProfile = () => {
    return (
        <div className='content-box'>
            <h1>Hello I guess</h1>
            <Link to="/add-material">Add Material</Link>
            <Link to="/videos">Watch the videos</Link>
        </div>
    );
};

export default TeacherProfile;