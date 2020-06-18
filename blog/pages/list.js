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
const myList = (props) => {
  const [ilist, setList] = useState(props.data);
  const [loading, setLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(true)

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
    setList(props.data);
  }, [props.data]);

  return (
    <div>
      <Head>
        <title>列表 | JavaScript 算法学习 Java开发</title>
        <link rel="icon" href="../public/favicon.ico" mce_href="../public/favicon.ico" type="image/x-icon" />
      </Head>
      <Header />
      <Row className='comm-main' justify="center">
        <Col className='comm-left' xs={24} sm={24} md={16} lg={14} xl={12}>

          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{Array.isArray(ilist) && ilist.length === 0 ? '算法' : ilist[0].typeName}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            header={<div className='comm-title'>{Array.isArray(ilist) && ilist.length === 0 ? '博主正在加班加点的码字~' : ilist[0].typeName}</div>}
            dataSource={ilist}
            // locale={{ emptyText: '博主正在加班加点的码字~' }}

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
                    <span className='icon-numberpeople'><FireOutlined /><CountUp end={item.view_count} />人 </span>
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