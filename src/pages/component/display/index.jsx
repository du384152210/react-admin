import React, { useState } from 'react';
import { Card, Divider, Button, Space, Tooltip, Avatar, Badge, Tag, Timeline, Radio, Collapse } from 'antd';
import { useSelector } from 'react-redux';
import { UserOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  SyncOutlined, 
  CloseCircleOutlined, 
  ExclamationCircleOutlined, 
  MinusCircleOutlined, 
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  SmileOutlined
} from '@ant-design/icons';

function TooltipCom1 () {
  const colors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
  ];
  return (
    <>
      <Space wrap>
        {colors.map((color) => (
          <Tooltip title="prompt text" color={color} key={color}>
            <Button>{color}</Button>
          </Tooltip>
        ))}
      </Space>
    </>
  )
}
function TooltipCom2 () {
  const text = <span>prompt text</span>;
  const buttonWidth = 70;
  const gap = 8;
  const btnProps = {
    style: {
      width: buttonWidth,
    },
  };
  return (
    <>
      <div className="demo">
        <div
          style={{
            marginLeft: buttonWidth,
            display: 'flex',
            flexWrap: 'nowrap',
            columnGap: gap,
          }}
        >
          <Tooltip placement="topLeft" title={text} >
            <Button {...btnProps}>TL</Button>
          </Tooltip>
          <Tooltip placement="top" title={text} >
            <Button {...btnProps}>Top</Button>
          </Tooltip>
          <Tooltip placement="topRight" title={text} >
            <Button {...btnProps}>TR</Button>
          </Tooltip>
        </div>
        <div
          style={{
            width: buttonWidth,
            float: 'left',
            display: 'flex',
            flexDirection: 'column',
            rowGap: gap,
          }}
        >
          <Tooltip placement="leftTop" title={text} >
            <Button>LT</Button>
          </Tooltip>
          <Tooltip placement="left" title={text} >
            <Button>Left</Button>
          </Tooltip>
          <Tooltip placement="leftBottom" title={text} >
            <Button>LB</Button>
          </Tooltip>
        </div>
        <div
          style={{
            width: buttonWidth,
            marginLeft: buttonWidth * 4 + 24,
            display: 'flex',
            flexDirection: 'column',
            rowGap: gap,
          }}
        >
          <Tooltip placement="rightTop" title={text} >
            <Button>RT</Button>
          </Tooltip>
          <Tooltip placement="right" title={text} >
            <Button>Right</Button>
          </Tooltip>
          <Tooltip placement="rightBottom" title={text} >
            <Button>RB</Button>
          </Tooltip>
        </div>
        <div
          style={{
            marginLeft: buttonWidth,
            clear: 'both',
            display: 'flex',
            flexWrap: 'nowrap',
            columnGap: gap,
          }}
        >
          <Tooltip placement="bottomLeft" title={text} >
            <Button {...btnProps}>BL</Button>
          </Tooltip>
          <Tooltip placement="bottom" title={text} >
            <Button {...btnProps}>Bottom</Button>
          </Tooltip>
          <Tooltip placement="bottomRight" title={text} >
            <Button {...btnProps}>BR</Button>
          </Tooltip>
        </div>
      </div>
    </>
  )
}
function AvatarCom () {
  const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
  return (
    <Space direction="vertical" size={16}>
      <Space wrap size={16}>
        <Avatar size={64} icon={<UserOutlined />} />
        <Avatar size="large" icon={<UserOutlined />} />
        <Avatar icon={<UserOutlined />} />
        <Avatar size="small" icon={<UserOutlined />} />
        <Avatar shape="square" size={64} icon={<UserOutlined />} />
        <Avatar shape="square" size="large" icon={<UserOutlined />} />
        <Avatar shape="square" icon={<UserOutlined />} />
        <Avatar shape="square" size="small" icon={<UserOutlined />} />
      </Space>
      <Space size={16} wrap>
        <Avatar icon={<UserOutlined />} />
        <Avatar>U</Avatar>
        <Avatar size={40}>USER</Avatar>
        <Avatar src={url} />
        <Avatar src={<img src={url} alt="avatar" />} />
        <Avatar
          style={{
            backgroundColor: '#fde3cf',
            color: '#f56a00',
          }}
        >
          U
        </Avatar>
        <Avatar
          style={{
            backgroundColor: '#87d068',
          }}
          icon={<UserOutlined />}
        />
      </Space>
    </Space>
  )
}
function BadgeCom1 () {
  const colors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
  ];
  return (
    <Space direction="vertical" size={16}>
      <Space size="middle">
        <Badge count={5}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={0} showZero>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge
          count={
            <ClockCircleOutlined
              style={{
                color: '#f5222d',
              }}
            />
          }
        >
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={99}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={100}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={99} overflowCount={10}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Badge count={1000} overflowCount={999}>
          <Avatar shape="square" size="large" />
        </Badge>
      </Space>
      <Space wrap>
        {colors.map((color) => (
         <Badge key={color} color={color} text={color} />
        ))}
      </Space>
      <Space wrap size={16}>
        <Badge.Ribbon text="Hippies">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="pink">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="red">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="cyan">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
        <Badge.Ribbon text="Hippies" color="green">
          <Card title="Pushes open the window" size="small">
            and raises the spyglass.
          </Card>
        </Badge.Ribbon>
      </Space>
      
    </Space>
  )
}
function TagCom () {
  return (
    <Space direction="vertical">
      <Space size={[0, 8]} wrap>
        <Tag color="magenta">magenta</Tag>
        <Tag color="red">red</Tag>
        <Tag color="volcano">volcano</Tag>
        <Tag color="orange">orange</Tag>
        <Tag color="gold">gold</Tag>
        <Tag color="lime">lime</Tag>
        <Tag color="green">green</Tag>
        <Tag color="cyan">cyan</Tag>
        <Tag color="blue">blue</Tag>
        <Tag color="geekblue">geekblue</Tag>
        <Tag color="purple">purple</Tag>
      </Space>
      <Space size={[0, 8]} wrap>
        <Tag color="#f50">#f50</Tag>
        <Tag color="#2db7f5">#2db7f5</Tag>
        <Tag color="#87d068">#87d068</Tag>
        <Tag color="#108ee9">#108ee9</Tag>
      </Space>
      <Space size={[0, 8]} wrap>
        <Tag color="success">success</Tag>
        <Tag color="processing">processing</Tag>
        <Tag color="error">error</Tag>
        <Tag color="warning">warning</Tag>
        <Tag color="default">default</Tag>
      </Space>
      <Space size={[0, 8]} wrap>
        <Tag icon={<CheckCircleOutlined />} color="success">
          success
        </Tag>
        <Tag icon={<SyncOutlined spin />} color="processing">
          processing
        </Tag>
        <Tag icon={<CloseCircleOutlined />} color="error">
          error
        </Tag>
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
          warning
        </Tag>
        <Tag icon={<ClockCircleOutlined />} color="default">
          waiting
        </Tag>
        <Tag icon={<MinusCircleOutlined />} color="default">
          stop
        </Tag>
      </Space>
      <Space size={[0, 8]} wrap>
        <Tag icon={<TwitterOutlined />} color="#55acee">
          Twitter
        </Tag>
        <Tag icon={<YoutubeOutlined />} color="#cd201f">
          Youtube
        </Tag>
        <Tag icon={<FacebookOutlined />} color="#3b5999">
          Facebook
        </Tag>
        <Tag icon={<LinkedinOutlined />} color="#55acee">
          LinkedIn
        </Tag>
      </Space>
      <Space size={[0, 8]} wrap>
        <Tag bordered={false}>Tag 1</Tag>
        <Tag bordered={false}>Tag 2</Tag>
        <Tag bordered={false} closable>
          Tag 3
        </Tag>
        <Tag bordered={false} closable>
          Tag 4
        </Tag>
      </Space>
    </Space>
  )
}
function CollapseCom () {
  const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;
  const items = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>{text}</p>,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
    </>
  )
}
function TimelineCom () {
  const [mode, setMode] = useState('left');
  const onChange = (e) => {
    setMode(e.target.value);
  };
  return (
    <Space size={0} wrap direction="vertical">
      <Timeline
        items={[
          {
            color: 'green',
            children: 'Create a services site 2015-09-01',
          },
          {
            color: 'green',
            children: 'Create a services site 2015-09-01',
          },
          {
            color: 'red',
            children: (
              <>
                <p>Solve initial network problems 1</p>
                <p>Solve initial network problems 2</p>
                <p>Solve initial network problems 3 2015-09-01</p>
              </>
            ),
          },
          {
            children: (
              <>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </>
            ),
          },
          {
            color: 'gray',
            children: (
              <>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </>
            ),
          },
          {
            color: 'gray',
            children: (
              <>
                <p>Technical testing 1</p>
                <p>Technical testing 2</p>
                <p>Technical testing 3 2015-09-01</p>
              </>
            ),
          },
          {
            color: '#00CCFF',
            dot: <SmileOutlined />,
            children: <p>Custom color testing</p>,
          },
        ]}
      />
      <Divider></Divider>
      <Timeline
        mode="alternate"
        items={[
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            children: 'Solve initial network problems 2015-09-01',
            color: 'green',
          },
          {
            dot: (
              <ClockCircleOutlined
                style={{
                  fontSize: '16px',
                }}
              />
            ),
            children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
          },
          {
            color: 'red',
            children: 'Network problems being solved 2015-09-01',
          },
          {
            children: 'Create a services site 2015-09-01',
          },
          {
            dot: (
              <ClockCircleOutlined
                style={{
                  fontSize: '16px',
                }}
              />
            ),
            children: 'Technical testing 2015-09-01',
          },
        ]}
      />
      <Divider></Divider>
      <>
        <Radio.Group
          onChange={onChange}
          value={mode}
          style={{
            marginBottom: 20,
          }}
        >
          <Radio value="left">Left</Radio>
          <Radio value="right">Right</Radio>
          <Radio value="alternate">Alternate</Radio>
        </Radio.Group>
        <Timeline
          mode={mode}
          items={[
            {
              label: '2015-09-01',
              children: 'Create a services',
            },
            {
              label: '2015-09-01 09:12:11',
              children: 'Solve initial network problems',
            },
            {
              children: 'Technical testing',
            },
            {
              label: '2015-09-01 09:12:11',
              children: 'Network problems being solved',
            },
          ]}
        />
      </>
    </Space>
  )
}

export default function DisplayPage() {
  const { cardSize } = useSelector((state) => state.global);
  return (
    <Card size={cardSize}>
      <Divider orientation='left'>Tooltip 文字提示</Divider>
      <TooltipCom1/>
      <Divider orientation='left'>Tooltip 文字提示(所有位置)</Divider>
      <TooltipCom2/>
      <Divider orientation='left'>Avatar 头像</Divider>
      <AvatarCom/>
      <Divider orientation='left'>Badge 徽标数</Divider>
      <BadgeCom1/>
      <Divider orientation='left'>Tag 标签</Divider>
      <TagCom/>
      <Divider orientation='left'>Collapse 折叠面板</Divider>
      <CollapseCom/>
      <Divider orientation='left'>Timeline 时间轴</Divider>
      <TimelineCom/>
    </Card>
  )
}
