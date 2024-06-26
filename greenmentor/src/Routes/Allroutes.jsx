import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Component/Login'
import Signup from '../Component/Signup'
import Taskcreate from '../TaskComp/Task'
import Taskcard from '../TaskComp/Taskcard'
import Taskmain from '../TaskComp/Taskmain'
import { useSelector } from 'react-redux'
import Task from '../TaskComp/Task'

function Allroutes() {
  const token = useSelector((state) => state.user.token);
  // const loginhandle = useSelector((state) => state.user.loginhandle);
  const tokenv = localStorage.getItem("Token");

  useEffect((tokenv)=>{

  },[tokenv])
  console.log(token);
  return (
    <div>
      <Routes>
      <Route path="/" element={tokenv ==="Logout"? <Login /> : <Taskmain />} />
      {/* <Route path="/" element= {<Taskmain />  }/> */}
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/createtask' element={<Taskmain/>} />
        <Route path='/taskcards' element={<Taskcard/>} />
      </Routes>
    </div>
  )
}

export default Allroutes
