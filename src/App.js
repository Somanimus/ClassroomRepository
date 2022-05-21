import './App.css';
import {Route, Routes} from 'react-router-dom'
import Main from './pages/main.jsx';
import Header from './components/header';
import Footer from './components/footer';
import Login from './pages/login';
import Register from './pages/registration';
import Curriculum from './pages/curriculum'
import StudentProfile from './pages/studentProfile';
import AdminProfile from './pages/adminProfile'
import GroupAdd from './pages/admin-pages/GroupManage/groupAdd';
import TeacherAdd from './pages/admin-pages/UserManage/teacherAdd';
import TeacherProfile from './pages/teacherProfile';
import GroupsInfo from './pages/admin-pages/GroupManage/GroupsInfo';
import UserAssign from './pages/admin-pages/UserManage/userAssign';
import GroupDelete from './pages/admin-pages/GroupManage/groupDelete'
import AddMaterial from './pages/teacher-pages/addMaterial'
import AddHomework from './pages/teacher-pages/addHomework';
import CheckHomework from './pages/student-pages/checkHomework';
import WatchMaterial from './pages/student-pages/watchMaterial';
import Videos from './pages/videos'
function App() { return (
    <div className="App">
      <Header/>
    <Routes>
      <Route path='videos' element={<Videos/>}/>
      <Route path="add-material" element={<AddMaterial/>}/>
      <Route path="add-homework" element={<AddHomework/>}/>
      <Route path="check-homework" element={<CheckHomework/>}/>
      <Route path="watch-material" element={<WatchMaterial/>}/>
      <Route path="curriculum" element={<Curriculum/>}/>
      <Route path="student-profile" element={<StudentProfile/>}/>
      <Route path="/" element={<Main/>}/>
      <Route path="login/" element={<Login/>}/>
      <Route path="register/" element={<Register/>}/>
      <Route path="admin-profile" element={<AdminProfile/>}/>
      <Route path="group-add" element={<GroupAdd/>}/>
      <Route path="teacher-add" element={<TeacherAdd/>}/>
      <Route path="teacher-profile" element={<TeacherProfile/>}/>
      <Route path="group-info" element={<GroupsInfo/>}/>
      <Route path="user-assign" element={<UserAssign/>}/>
      <Route path="group-delete" element={<GroupDelete/>}/>
      
    </Routes> 
      <Footer/> 
    </div>
  );
}

export default App;
