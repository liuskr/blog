import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Aurhor from '../components/Author'
import servicePath from '../config/api'
import marked from 'marked'
import '../public/style/pages/index.css'
import { Row, Col, List, Affix, Spin, BackTop } from 'antd'
import CountUp from 'react-countup';
import { CarryOutOutlined, YoutubeOutlined, FireOutlined, RocketOutlined } from '@ant-design/icons'
const Home = (props) => {
  const [mylist, setList] = useState(props.data);
  const [loading, setLoading] = useState(false);
  const renderer = new marked.Renderer();

  const goLoading = () => {
    setLoading(true)
  }
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize: false,
    xhtml: false,
  });
  const style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 50,
    backgroundColor: '#333',
    color: '#fff',
    opacity: .6,
    textAlign: 'center',
    fontSize: 20,
  };
  return (
    <div>
      <Head>
        <title>首页</title>
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className='comm-main' justify="center">
        <Col className='comm-left' xs={24} sm={24} md={16} lg={14} xl={12}>
          <List
            header={<div className='comm-title'>最新发表</div>}
            dataSource={mylist}
            itemLayout='vertical'
            split
            renderItem={item =>
              <Spin spinning={loading}>
                <List.Item>
                  <div className='list-title' onClick={goLoading}>
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className='list-icon'>
                    <span className='icon-time'><CarryOutOutlined />{item.addTime}</span>
                    <span className='icon-category'><YoutubeOutlined />{item.typeName}</span>
                    <span className='icon-numberpeople' ><FireOutlined /><CountUp end={item.view_count} />人 </span>
                  </div>
                  <div className='list-context' dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
                  </div>
                </List.Item>

              </Spin>
            }
          />
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={6} lg={6} xl={3}>
          <Aurhor />
        </Col>
      </Row>
      <BackTop>
        <RocketOutlined style={style} />
      </BackTop>
    </div>
  )
}
Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios(servicePath.getArticleList).then(res => {
      console.log(res.data)
      resolve(res.data)

    })
  })
  return await promise
}
export default Home
