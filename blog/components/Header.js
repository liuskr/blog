import React from 'react'
import '../public/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import Link from 'next/link'
import { ContainerOutlined, CrownOutlined, PlaySquareOutlined, SmileOutlined } from '@ant-design/icons'

const Header = () => {


  return (
    <div className='header'>

      <Row type="flex" justify="center" >
        <Col xs={24} sm={24} md={8} lg={10} xl={7}>
          <div className='text logo' >Welcome</div>
          <div className='text text2'>
            <span>Come to my personal blog</span>
          </div>
        </Col>
        <Col xs={0} sm={0} md={14} lg={12} xl={8} className="memu-div">
          <Menu mode="horizontal" >
            <Menu.Item key="mail">
              <Link href={{ pathname: '/' }}>
                <a>
                  <CrownOutlined />
                    首页
               </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="mails">
              <Link href={{ pathname: '/list', query: { id: 1 } }}>
                <a>
                  <PlaySquareOutlined />
                    最新番剧
               </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="maild">
              <Link href={{ pathname: '/list', query: { id: 2 } }}>
                <a>
                  <ContainerOutlined />
                    经典情怀
               </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="mailq">
              <Link href={{ pathname: '/list', query: { id: 3 } }}>
                <a>
                  <SmileOutlined />
                    快乐生活
               </a>
              </Link>
            </Menu.Item>

          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header