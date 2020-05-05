import React, { useState } from 'react';
import { Input, Card, Spin, Avatar, Button, Form, message } from 'antd'
import { Logins } from '../api'
import '../static/css/login.css'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const Login = (props) => {
  const [Loading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true)
    const { username, password } = values;
    const data = {
      userName: username,
      password: password
    }
    await Logins(data).then(res => {
      if (res.data.code === 0) {
        localStorage.setItem('openId', res.data.openId)
        message.success(res.data.data)
        props.history.push('/index')
      }
    })
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  };

  return (
    <div className='login'>
      <Spin tip="Loading..." spinning={Loading}>
        <Card
          hoverable
          style={{ width: 400 }}
          cover={
            <Avatar style={{ margin: '20px auto' }} size={100} src="https://mirror-gold-cdn.xitu.io/16b2ad1a66368293ded?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" />}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input size="large"
                placeholder="Please Enter username"
                prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password size="large"
                placeholder="Please Enter Password"
                prefix={<LockOutlined />} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block className="login-form-button">
                登录
               </Button>
            </Form.Item>
          </Form>
        </Card>

      </Spin >
    </div >
  )
}

export default Login