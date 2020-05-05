import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, Link } from "react-router-dom";
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import '../static/css/AdminIndex.css'
import {
  // PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const AdminIndex = (props) => {
  const [collapsed, setCollapsed] = useState(false);


  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  return (

    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.history.location.pathname]}>
          {/* <Menu.Item key="/index/add/">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item> */}
          <SubMenu
            key="sub1"
            title={<span><UserOutlined /><span>文章管理</span></span>}
          >
            <Menu.Item key="/index/add/">
              <Link to='/index/add/'>
                添加文章
                </Link>
            </Menu.Item>

            <Menu.Item key="/index/list/">
              <Link to='/index/list/'>
                文章列表
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <TeamOutlined />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              {/* <Route path="/index/" exact component={AddArticle} /> */}
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/list/" component={ArticleList} />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminIndex