import React, { useState, useEffect } from 'react';
import { Table, Spin, Button, Modal, message } from 'antd'
import { getUserInfo, delArticle } from '../api'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

const ArticleList = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getUserTable()
  }, [])


  const getUserTable = async () => {
    setLoading(false)
    await getUserInfo().then(res => {
      setDataSource(res.data.list)
    })
  }

  const delectArticle = (id) => {
    confirm({
      title: 'Are you sure you want to delete this article?',
      icon: <ExclamationCircleOutlined />,
      content: 'This operation will be irreversible',
      onOk() {
        delArticle(id).then(res => {
          getUserTable()
        })
      },
      onCancel() {
        message.error('Cancelled')
      },
    });
  }
  const columns = [
    {
      title: '标题',     //列名称
      dataIndex: 'title',      //数据源的字段名
      key: 'title'
    },
    {
      title: '类别',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '发布时间',
      dataIndex: 'addTime',
      key: 'addTime',
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
      key: 'view_count',
    },

    {
      title: '操作',
      key: "capz",
      render: (text, record, index) => (
        <div>
          <Button>修改</Button>
          <Button danger style={{ marginLeft: 10 }} onClick={() => delectArticle(record.id)}>删除</Button>
        </div>

      ),
    },
  ]
  return (
    <div>
      <Spin tip="Loading..." spinning={loading}>
        <Table columns={columns} dataSource={dataSource} bordered pagination={false} />
      </Spin>
    </div>

  )
}

export default ArticleList