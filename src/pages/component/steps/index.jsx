import React, { useState } from 'react';
import { Card, Steps, theme, Button, message, Divider, Alert } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import './index.scss';

function Steps1 () {
  const description = 'This is a description.';
  return (
    <>
      <Steps
        current={1}
        items={[
          {
            title: 'Finished',
            description,
          },
          {
            title: 'In Progress',
            description,
            subTitle: 'Left 00:00:08',
          },
          {
            title: 'Waiting',
            description,
          },
        ]}
      />
    </>
  )
}
function Steps2 () {
  return (
    <>
      <Steps
        items={[
          {
            title: 'Login',
            status: 'finish',
            icon: <UserOutlined />,
          },
          {
            title: 'Verification',
            status: 'finish',
            icon: <SolutionOutlined />,
          },
          {
            title: 'Pay',
            status: 'process',
            icon: <LoadingOutlined />,
          },
          {
            title: 'Done',
            status: 'wait',
            icon: <SmileOutlined />,
          },
        ]}
      />
    </>
  )
}
function Steps3 () {
  const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </>
  )
}
function Steps4 () {
  const [current, setCurrent] = useState(0);
  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };
  const description = 'This is a description.';
  return (
    <>
      <Steps
        current={current}
        onChange={onChange}
        items={[
          {
            title: 'Step 1',
            description,
          },
          {
            title: 'Step 2',
            description,
          },
          {
            title: 'Step 3',
            description,
          },
        ]}
      />
      <Divider />
      <Steps
        current={current}
        onChange={onChange}
        direction="vertical"
        items={[
          {
            title: 'Step 1',
            description,
          },
          {
            title: 'Step 2',
            description,
          },
          {
            title: 'Step 3',
            description,
          },
        ]}
      />
    </>
  )
}

export default function StepsPage() {
  const { cardSize } = useSelector((state) => state.global);
  return (
    <Card size={cardSize}>
      <h1 className="t-c" style={{fontSize: '30px'}}>步骤条 🍓🍇🍈🍉</h1>
      <Alert message="简单步骤条" type="info" showIcon className='steps-title' style={{marginTop: '0'}}/>
      <Steps1/>
      <Alert message="带图标步骤条" type="info" showIcon className='steps-title'/>
      <Steps2/>
      <Alert message="通常配合内容及按钮使用，表示一个流程的处理进度" type="info" showIcon className='steps-title'/>
      <Steps3/>
      <Alert message="可点击" type="info" showIcon className='steps-title'/>
      <Steps4/>
    </Card>
  )
}
