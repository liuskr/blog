import React from 'react'
import '../public/style/components/header.css'
import { Row, Col, Menu } from 'antd'
import Link from 'next/link'
import { RadarChartOutlined, AreaChartOutlined, CrownOutlined, PlaySquareOutlined } from '@ant-design/icons'

const Header = () => {


  return (
    <div className='header'>

      <Row type="flex" justify="center" >
        <Col xs={24} sm={24} md={8} lg={10} xl={7}>
          <div className='text logo' >Stone</div>
          <div className='text text2'>
            <span>一个热爱编程的小菜鸟</span>
          </div>
        </Col>
        <Col xs={0} sm={0} md={14} lg={12} xl={8} className="memu-div">
          <Menu mode="horizontal" >
            <Menu.Item key="mail" className='ftz'>
              <Link href={{ pathname: '/' }} >
                <a>
                  <CrownOutlined className='ftz' />
                    首页
               </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="mails" className='ftz'>
              <Link href={{ pathname: '/list', query: { id: 1 } }}>
                <a>
                  <PlaySquareOutlined className='ftz' />
                    JavaScript
               </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="maild" className='ftz'>
              <Link href={{ pathname: '/list', query: { id: 2 } }}>
                <a>
                  <AreaChartOutlined className='ftz' />
                    Python
               </a>
              </Link>
            </Menu.Item>
            <Menu.Item key="mailq" className='ftz'>
              <Link href={{ pathname: '/list', query: { id: 3 } }}>
                <a>
                  <RadarChartOutlined className='ftz' />
                   Java
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