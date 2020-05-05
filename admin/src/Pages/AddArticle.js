import React, { useState, useEffect } from 'react';
import marked from 'marked';
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import { getTypeInfos, postArticle } from '../api'
const { Option } = Select;
const { TextArea } = Input
const AddArticle = (props) => {
  const renderer = new marked.Renderer();

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  // const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState('请选择') //选择的文章类别

  useEffect(() => {
    getTypeInfo()
  }, [])

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  })

  const getTypeInfo = async () => {
    await getTypeInfos().then(res => {
      // if (res.data.code === 0) {
      setTypeInfo(res.data.data)
      // } else {
      //   message.error(res.data.data)
      //   props.history.push('/')
      //   localStorage.removeItem('openId')
      // }
    })
  }

  const saveArticle = () => {
    if (selectedType === '请选择') {
      message.error('必须选择类别')
      return false
    } else if (!articleTitle) {
      message.error('标题不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
    const dataProps = {
      type_id: selectedType,
      title: articleTitle,
      article_content: articleContent,
      introduce: introducemd,
      addTime: (new Date(datetext).getTime()) / 1000
    }
    if (articleId === 0) {
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
      postArticle(dataProps).then(res => {
        setArticleId(res.data.insertId)
        if (res.data.isScuccess) {
          message.success('文章保存成功')
        } else {
          message.error('文章保存失败');
        }
      })
    }

  }

  const selectTypeHandler = (value) => {
    setSelectType(value)
  }

  const changeContent = e => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html)
  }

  const changeIntroduce = e => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html)
  }
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                onChange={e => {
                  setArticleTitle(e.target.value)
                }}
              />
            </Col>
            <Col span={4}>
              <Select defaultValue={selectedType} size="large" style={{ width: 120 }} onChange={selectTypeHandler}>
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.Id}>{item.typeName}</Option>
                  )
                })}
              </Select>
            </Col>
          </Row>
          <Row gutter={10} style={{ marginTop: 10 }}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }}>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row gutter={10}>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle} >发布文章</Button>
            </Col>
            <Col span={24} className='spacing'>
              <TextArea
                rows={4}
                placeholder="文章简介"
                onChange={changeIntroduce}
              />
              <div className="introduce-html spacing"
                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  onChange={(date, dateString) => setShowDate(dateString)}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
};
export default AddArticle