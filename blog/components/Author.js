import React from 'react';
import { Avatar, Divider, Tooltip } from 'antd'
import '../public/style/components/author.css'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'

const Author = () => {
  return (
    <div className='author-div comm-box'>
      <div>
        <Avatar size={100} src='https://hongdujuan.oss-cn-shenzhen.aliyuncs.com/Avatar.jpg' />
      </div>
      <div className='author-introduction'>
        <p>代码是写出来给人看的</p>
        <p>附带能在机器上运行</p>
        <Divider>社交账号</Divider>
        <Tooltip title="prompt text">
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
        </Tooltip>
        <Tooltip title="1728524385">
          <a href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=1728524385&website=www.oicqzone.com">
            <Avatar size={28} icon={<QqOutlined />} className="account" />
          </a>
        </Tooltip>
        <Tooltip title="qq_1728524385">
          <Avatar size={28} icon={<WechatOutlined />} className="account" />
        </Tooltip>
      </div>
    </div>
  )
}

export default Author