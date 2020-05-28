import React from 'react';
import { Result, Button } from 'antd';

const DoesNotExist = (props) => {
  const go = () => {
    props.history.goBack();
  }
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="您访问的页面 让外星人吃掉啦~"
        extra={<Button type="primary" onClick={go}>返回上一级</Button>}
      />,
    </div>
  )
}
export default DoesNotExist;
