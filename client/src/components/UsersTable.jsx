import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Table, Space, Button} from 'antd';
import {Pie, Bar, PolarArea } from 'react-chartjs-2';
import {Chart as chartjs} from 'chart.js/auto'
import {useEffect} from 'react'
import { getAllUsers } from '../api/user.api';


export default function UsersTable() {
    const [users, setUsers]=useState([]);
    let [button1, setbutton1]=useState(0);
    let [button2, setbutton2]=useState(0);
    
    useEffect(()=>{
        
        async function loadUsers(){
            const res = await getAllUsers();
            setUsers(res.data);
            res.data.map((item)=>{
                setbutton1(button1 = button1+item.but1)
                setbutton2(button2 = button2+item.but2)
            })
        }
        loadUsers();

    },[])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Date',
            dataIndex: 'lastDate',
            key: 'lastDate',
        },
        {
            title: 'Time',
            dataIndex: 'lastTime',
            key: 'lastTime',
        },
        {
            title: 'Button 1',
            dataIndex: 'but1',
            key: 'but1',
        },
        {
            title: 'Button 2',
            dataIndex: 'but2',
            key: 'but2',
        },
      ];

      const databutts = {
        labels: [
          'Button 1',
          'Button 2'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [button1, button2],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      };

      
  return (
        <Space direction="vertical">
            <Button>
                <Link to="/login">
                    Logout
                </Link>
            </Button>
            <Table columns={columns} dataSource={users}/>
            <Space direction="horizontal">
                <Pie data={databutts}></Pie>
                <Bar data={databutts}></Bar>
                <PolarArea data={databutts}></PolarArea>
            </Space>
        </Space>
  )
}
