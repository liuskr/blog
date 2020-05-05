import React from 'react';
import { Avatar, Divider } from 'antd'
import '../public/style/components/author.css'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'

const Author = () => {
  return (
    <div className='author-div comm-box'>
      <div>
        <Avatar size={100} src='https://mirror-gold-cdn.xitu.io/16b2ad1a66368293ded?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1' />
      </div>
      <div className='author-introduction'>
        当了多年备胎的女神对你说，轮奸都轮不到你,女神怀孕后找人接盘，但是她对你说，他的孩子，你不配养。你不试试，怎么知道自己没用？你试了才知道，自己是真的没用
            <Divider>社交账号</Divider>
        <Avatar size={28} icon={<GithubOutlined />} className="account" />
        <Avatar size={28} icon={<QqOutlined />} className="account" />
        <Avatar size={28} icon={<WechatOutlined />} className="account" />
      </div>
    </div>
  )
}

export default Author