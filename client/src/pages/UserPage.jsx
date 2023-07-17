import React, { useState, useEffect } from 'react'
import { updateUser, getUser } from '../api/user.api';
import { UserOutlined } from '@ant-design/icons';
import {Link, useParams,useNavigate} from 'react-router-dom'
import { Space, Button, Avatar} from 'antd';

export default function UserPage() {

  const [initDate, SetInitDate] = useState(new Date())
  const [counter1, setCounter1] = useState(0)
  const [counter2, setCounter2] = useState(0)
  const [user, setUser] = useState({
    username:'',
    password:'',
    lastDate: new Date(),
    lastTime: 15,
    but1: 0,
    but2: 0

  })
  const navigate = useNavigate()
  const params = useParams()

  const handleClick1 = () => {
    setCounter1(counter1 + 1)
    console.log(counter1)
  }
  
  const handleClick2 = () => {
    setCounter2(counter2 + 1)
    console.log(counter2)
  }

  useEffect( ()=>{
    async function loadUser(){
      if(params.id){
        const res = await getUser(params.id);
        setUser(res.data)
        console.log(initDate)
      }

    }
    loadUser();
  },[])

  return (
    <Space className='logincontainer' direction="vertical">
      <Button 
      onClick={async()=>{
        let sub =(new Date()-initDate)
        var difmin = Math.round(((sub % 86400000) % 3600000) / 60000)
        console.log(difmin);
        const d= initDate.getFullYear()+"-"+initDate.getMonth()+"-"+initDate.getDate()
        console.log(d);
        setUser(user.lastTime=difmin)
        setUser(user.lastDate= d)
        setUser(user.but1=counter1)
        setUser(user.but2=counter2)
        const accept = window.confirm("are you sure?");
        if(accept){
          await updateUser(params.id, user)
          navigate('/login')
        }
      }}
      >
        Logout          
      </Button>
      <Space direction="horizontal">
        <Avatar shape="square" size={128} icon={<UserOutlined />} />
          <Space direction="vertical">
            <h1>Titulo</h1>
            <h2>descripcion</h2>
          </Space>
      </Space>
      <Space direction="horizontal">
        <Button 
        className='buttonclick' 
        type="primary" 
        onClick={handleClick1}
        >
          Button 1
        </Button>
        <Button 
        className='buttonclick' 
        type="primary"
        onClick={handleClick2}
        >
          Button 2
        </Button>
      </Space>
    </Space>
  )
}
