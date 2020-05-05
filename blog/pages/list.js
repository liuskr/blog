import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Aurhor from '../components/Author'
import Link from 'next/link'
import axios from 'axios'
import marked from 'marked'
import servicePath from '../config/api'
import '../public/style/pages/list.css'
import { Row, Col, List, Breadcrumb, Spin } from 'antd'
import { CarryOutOutlined, YoutubeOutlined, FireOutlined, } from '@ant-design/icons'
import CountUp from 'react-countup';
const myList = (list) => {
  const [ilist, setList] = useState(list.data);
  const [loading, setLoading] = useState(false);

  const renderer = new marked.Renderer();
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

  const goLoading = () => {

    setLoading(true)
  }

  useEffect(() => {
    setList(list.data)
  });

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className='comm-main' justify="center">
        <Col className='comm-left' xs={24} sm={24} md={16} lg={14} xl={12}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{ilist[0].typeName}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div className='comm-title'>{ilist[0].typeName}</div>}
            dataSource={ilist}
            itemLayout='vertical'
            renderItem={item =>
              <Spin spinning={loading}>
                <List.Item>
                  <div className='list-title' onClick={goLoading}>
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className='list-icon'>
                    <span><CarryOutOutlined />{item.addTime}</span>
                    <span style={{ color: '#00a1d6' }}><YoutubeOutlined />{item.typeName}</span>
                    <span style={{ color: 'red' }}><FireOutlined /><CountUp end={item.view_count} />人 </span>
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
    </div>
  )
}
myList.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(res =>
      resolve(res.data)
    )
  })
  return await promise
}
export default myList