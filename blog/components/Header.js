import React, { useState, useEffect } from 'react'
import '../public/style/components/header.css'
import { Row, Col, Menu, Drawer } from 'antd'
import Link from 'next/link'
import { RadarChartOutlined, AreaChartOutlined, CrownOutlined, PlaySquareOutlined } from '@ant-design/icons'

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [clas, setClas] = useState(0);
  const showNavDrawer = {
    true: () => {
      setVisible(false);
      setClas(0)
    },
    false: () => {
      setVisible(true);
      setClas(1)
    }
  }
  useEffect(() => {
    window.clearTimeout(listSwitch)

  }, [])
  const showDrawer = () => {
    showNavDrawer[visible]();
  };
  const listSwitch = () => {
    setTimeout(() => {
      showNavDrawer[visible]();
    }, 1000)
  }
  const onClose = () => {
    showNavDrawer[visible]();
  };
  return (
    <div className='header'>
      <Row type="flex" justify="center" >
        <Col xs={20} sm={20} md={8} lg={10} xl={7}>
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
                   Node
               </a>
              </Link>
            </Menu.Item>

          </Menu>
        </Col>
        <Col xs={4} sm={4} md={0} lg={0} xl={0} className="memu-div">
          <div id="nav-container" onClick={showDrawer} className={clas !== 0 ? 'pushed' : ''}>
            <div className="toggle-icon">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
          <Drawer
            placement="left"
            closable={false}
            zIndex={1}
            onClose={onClose}
            visible={visible}
          >
            <Menu mode="vertical" >
              <Menu.Item key="mail" className='ftz'>
                <Link href={{ pathname: '/' }} >
                  <a>
                    <CrownOutlined className='ftz' />
                    首页
               </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="1" className='ftz' onClick={listSwitch}>
                <Link href={{ pathname: '/list', query: { id: 1 } }}>
                  <a>
                    <PlaySquareOutlined className='ftz' />
                    JavaScript
               </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="2" className='ftz' onClick={listSwitch}>
                <Link href={{ pathname: '/list', query: { id: 2 } }}>
                  <a>
                    <AreaChartOutlined className='ftz' />
                    Python
               </a>
                </Link>
              </Menu.Item>
              <Menu.Item key="3" className='ftz' onClick={listSwitch}>
                <Link href={{ pathname: '/list', query: { id: 3 } }}>
                  <a>
                    <RadarChartOutlined className='ftz' />
                   Node
               </a>
                </Link>
              </Menu.Item>
            </Menu>
          </Drawer>
        </Col>
      </Row>
    </div>
  )
}

export default Header