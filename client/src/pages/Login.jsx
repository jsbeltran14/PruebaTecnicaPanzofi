import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Input, Button, Form } from 'antd';
import { updateUser, getUser } from '../api/user.api';

const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = React.useState(false);
  
    // Watch all values
    const values = Form.useWatch([], form);
    React.useEffect(() => {
      form
        .validateFields({
          validateOnly: true,
        })
        .then(
          () => {
            setSubmittable(true);
          },
          () => {
            setSubmittable(false);
          },
        );
    }, [values]);
    return (
      <Button type="primary" htmlType="submit" disabled={!submittable} >
        Submit
      </Button>
    );
  };

export default function Login() {
   
    const [user, setUser] = useState({
        username:'',
        password:'',
        lastDate: new Date(),
        lastTime: 15,
        but1: 0,
        but2: 0
    
      })
      const [id, setId] = useState(0)
      const [name, setName] = useState("")
      const [pass, setPass] = useState("")
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const onFinish = async(values) => {
        console.log('Success:', values);
        console.log(id);
        const res = await getUser(id);
        setUser(res.data)
        if(res.data.id &&name===res.data.username&&pass===res.data.password){
            if(res.data.userType==="normal"){
                navigate(`/user/${id}`)

            }
            else{
                navigate(`/users/`)
            }

        }
        
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        
      };
  return (
    <div className='logincontainer'>
        <Form
        form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="ID"
      name="userid"
      
      onChange={(event)=>{
            setId(event.target.value)
      }}
      rules={[{ required: true, message: 'Please input your ID' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Username"
      name="username"
      onChange={(event)=>{
        setName(event.target.value)
        }}
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      onChange={(event)=>{
        setPass(event.target.value)
        }}
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <SubmitButton form={form} />
      {/* <Button type="primary" htmlType="submit"  onClick={()=>{
                navigate(`/user/1`)
            }}>
        Submit
      </Button> */}
    </Form.Item>
  </Form>
        
    </div>
  )
}
