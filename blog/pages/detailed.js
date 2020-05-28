import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Aurhor from '../components/Author'
import '../public/style/pages/detailed.css'
import axios from 'axios'
import { Row, Col, Breadcrumb, Affix, BackTop } from 'antd'
import { HourglassOutlined, YoutubeOutlined, FireOutlined, RocketOutlined } from '@ant-design/icons'
import marked from 'marked'
import Tocify from '../components/tocify.tsx'
import hljs from "highlight.js";
import servicePath from '../config/api'
import 'highlight.js/styles/monokai-sublime.css';
import CountUp from 'react-countup';
const Detailed = (props) => {

  const tocift = new Tocify();
  const renderer = new marked.Renderer();
  renderer.heading = (text, level) => {
    const achor = tocift.add(text, level);
    return `<a id='${achor}' herf='#${achor}' class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
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
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })
  let html = marked(props.article_content);
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
        <title>Home</title>
      </Head>
      <Header />
      <Row className='comm-main' justify="center">
        <Col className='comm-left' xs={24} sm={24} md={16} lg={14} xl={12}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="detailed-title">
              {props.title}
            </div>
            <div className='list-icon center'>
              <span className='icon-time'><HourglassOutlined />{props.addTime}</span>
              <span className='icon-category'><YoutubeOutlined />{props.typeName}</span>
              <span className='icon-numberpeople'><FireOutlined /> <CountUp end={props.view_count} />人</span>
            </div>
            <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }}>
              {/* <ReactMarkdown source={markdown} escapeHtml={false} /> */}
            </div>
          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={6} lg={6} xl={3}>
          <Aurhor />
          <Affix>
            <div className="detailed-nav comm-box">
              <div className='nav-title'>文章目录</div>
              <div className="toc-list">
                {tocift && tocift.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <BackTop ><RocketOutlined style={style} /></BackTop>

    </div>
  )
}
Detailed.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then(res => {
      const list = [res.data.data]
      resolve(list[0])
    })
  })
  return await promise
}
export default Detailed