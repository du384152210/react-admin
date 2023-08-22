import React, { useState } from 'react';
import { SearchOutlined, PlusCircleOutlined, SyncOutlined, DownOutlined } from '@ant-design/icons';
import { Card, Input, Row, Select, Space, Button, Table, Tag, Switch, Image, Tabs, Badge, Dropdown } from 'antd';
import logo from '@/assets/logo-react.png';
import './index.scss';
import { useSelector } from 'react-redux';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Table1 () {
  const { tableSize } = useSelector((state) => state.global);
  const data = [] //表格数据
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      code: `Y000${i}`,
      name: `John Brown${i}`,
      avatar: logo,
      state: false,
      age: i,
      phone: '13612121212',
      date: '2020-11-15 18:16:10',
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    })
  }
  const columns = [
    {
      title: 'Code',
      dataIndex: 'code',
      width: 100,
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: 200,
      key: 'name',
      render: (text) => <a href='javascript'>{text}</a>,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      width: 100,
      key: 'avatar',
      render: (text) => <Image src={text} alt='' style={{ width: 40, height: 40 }} />,
    },
    {
      title: 'State',
      dataIndex: 'state',
      width: 150,
      key: 'state',
      render: (text, _, index) => {
        return (
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={text} onChange={()=>changeState(index)} />
        )
      }
    },
    {
      title: 'Age',
      dataIndex: 'age',
      width: 100,
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: 150,
      key: 'phone',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: 200,
      key: 'date',
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: 250,
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      width: 220,
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record, index) => (
        <Space size="middle" style={{flexWrap: 'nowrap'}}>
          <Button type="link">编辑</Button>
          <Button type="link" danger onClick={() => handleDelete(record.key)}>删除</Button>
        </Space>
      ),
    },
  ];
  const [listData, setListData] = useState(data)
  const [hasData, setHasData] = useState(true)
  const [loading, setLoading] = useState(false)
  const [bordered, setBordered] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const changeState = (index) => {
    const res = [...listData]
    res[index].state = !res[index].state
    setListData(res)
  }
  const changeHasData = (newHasData) => {
    setLoading(true)
    setTimeout(() => {
      setHasData(newHasData)
      setLoading(false)
    }, 1000);
  }
  const changeBorder = (bordered) => {
    setBordered(bordered)
  } 
  const handleDelete = (key) => {}
  const onSelectChange = (newSelectedRowKeys) => {
    console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

  }
  const clearChecked = () => {
    setSelectedRowKeys([])
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  return (
    <>
      <Row>
        <Space style={{flexWrap: 'wrap'}}>
          <Input style={{ width: 200 }} placeholder="Basic usage" />
          <Select
            defaultValue="lucy"
            style={{ width: 200,}}
            allowClear
            options={[
              {
                value: 'lucy',
                label: 'Lucy',
              },
            ]}
          />
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
          <Button type="primary" icon={<PlusCircleOutlined />} >添加</Button>
          <Button icon={<SyncOutlined />}>刷新</Button>
          <Button type="primary" icon={<SyncOutlined />} onClick={clearChecked} disabled={selectedRowKeys.length === 0}>清空选中</Button>
          <Switch checkedChildren="有数据" unCheckedChildren="无数据" checked={!!hasData} onChange={changeHasData}/>
          <Switch checkedChildren="有边框" unCheckedChildren="无边框" checked={!!bordered} onChange={changeBorder}/>
        </Space>
      </Row>
      <Table className='mt-15'
        bordered={bordered}
        columns={columns}
        rowSelection={rowSelection}
        dataSource={hasData ? listData : []}
        loading={loading}
        size={tableSize}
        scroll={{
          y: 600,
          x: 1200
        }}
      />
    </>
  )
}

function Table2 () {
  const { tableSize } = useSelector((state) => state.global);
  const data = [
    {
      key: 1,
      name: `款式选择`,
      date: '',
      tags: [],
      children: [
        {
          key: 11,
          name: `休闲款`,
          logo: logo,
          state: false,
          date: '2020-11-15 18:16:10',
          tags: ['休闲', 'Leisure'],
        },
        {
          key: 12,
          name: `运动款`,
          logo: logo,
          state: false,
          date: '2020-11-15 18:16:10',
          tags: ['运动', 'Sport'],
        }
      ]
    },
    {
      key: 2,
      name: `分类选择`,
      date: '',
      tags: [],
      children: [
        {
          key: 21,
          name: `T恤`,
          logo: logo,
          state: false,
          date: '2020-11-15 18:16:10',
          tags: ['T恤', 'T-shirt'],
        },
        {
          key: 22,
          name: `帽子`,
          logo: logo,
          state: false,
          date: '2020-11-15 18:16:10',
          tags: ['帽子', 'hat'],
        }
      ]
    }
  ] //表格数据
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
      key: 'name',
      onCell: (_, index) => ({
        colSpan: _.children ? 6 : 1,
      }),
    },
    {
      title: 'Logo',
      dataIndex: 'logo',
      width: 100,
      key: 'logo',
      onCell: sharedOnCell,
      render: (text) => <Image src={text} alt='' style={{ width: 40, height: 40 }} />,
    },
    {
      title: '上/下架',
      dataIndex: 'state',
      width: 150,
      key: 'state',
      onCell: sharedOnCell,
      render: (text, _, index) => {
        return (
          <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={text} />
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'date',
      width: 200,
      key: 'date',
      sorter: (a, b) => a.date - b.date,
      onCell: sharedOnCell,
    },
    {
      title: '标签',
      key: 'tags',
      width: 220,
      dataIndex: 'tags',
      onCell: sharedOnCell,
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 3 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      onCell: sharedOnCell,
      render: (_, record, index) => (
        <Space size="middle">
          <Button type="link" >编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ];
  function sharedOnCell (_, index) {
    if(_.children) {
      return {
        colSpan: 0,
      };
    }
    return {};
  };
  return (
    <>
      <Row>
        <Space>
          <Input style={{ width: 200 }} placeholder="Basic usage" />
          <Select
            defaultValue="lucy"
            style={{ width: 200,}}
            allowClear
            options={[
              {
                value: 'lucy',
                label: 'Lucy',
              },
            ]}
          />
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
          <Button type="primary" icon={<PlusCircleOutlined />}>添加</Button>
          <Button  icon={<SyncOutlined />}>刷新</Button>
        </Space>
      </Row>
      <Table className='mt-15'
        columns={columns}
        dataSource={data}
        // loading={loading}
        size={tableSize}
        rowSelection
        scroll={{
          y: 600,
          x: 1200
        }}
      />
      <p className='fw-b' style={{fontSize: '20px', margin: '20px 0'}}>配置项 📚</p>
      <table className='ant-descriptions_table'>
        <tbody>
          <tr>
            <td className='ant-descriptions_label ant-descriptions_cell'>onCell</td>
            <td className='ant-descriptions_cell ant-descriptions_content'>
              表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

function Table3 () {
  const { tableSize } = useSelector((state) => state.global);
  const items = [
    {
      key: '1',
      label: 'Action 1',
    },
    {
      key: '2',
      label: 'Action 2',
    },
  ];
  // 额外展开行
  const expandedRowRender = () => {
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Status',
        key: 'state',
        render: () => <Badge status="success" text="Finished" />,
      },
      {
        title: 'Upgrade Status',
        dataIndex: 'upgradeNum',
        key: 'upgradeNum',
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Upgraded',
      dataIndex: 'upgradeNum',
      key: 'upgradeNum',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'operation',
      render: () => <a>Publish</a>,
    },
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screen',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }
  return (
    <>
      <Table
      size={tableSize}
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ['0'],
        }}
        dataSource={data}
      />
      <p className='fw-b' style={{fontSize: '20px', margin: '20px 0'}}>配置项 📚</p>
      <table className='ant-descriptions_table'>
        <tbody>
          <tr>
            <td className='ant-descriptions_label ant-descriptions_cell'>expandable</td>
            <td className='ant-descriptions_cell ant-descriptions_content'>
              额外展开行 可在此项配置多级表格
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

function Table4 () {
  const { tableSize } = useSelector((state) => state.global);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 100
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const Row = (props) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: props['data-row-key'],
    });
    const style = {
      ...props.style,
      transform: CSS.Transform.toString(
        transform && {
          ...transform,
          scaleY: 1,
        },
      ),
      transition,
      cursor: 'move',
      ...(isDragging
        ? {
            position: 'relative',
            zIndex: 9999,
          }
        : {}),
    };
    return <tr {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
  };
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address:
        'Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text Long text',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    }),
  );
  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };
  return (
    <>
      <DndContext sensors={sensors}  onDragEnd={onDragEnd}>
        <SortableContext
          // rowKey array
          items={dataSource.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            size={tableSize}
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
      <p className='fw-b' style={{fontSize: '20px', margin: '20px 0'}}>配置项 📚</p>
      <table className='ant-descriptions_table'>
        <tbody>
          <tr>
            <td className='ant-descriptions_label ant-descriptions_cell'> dnd-kit </td>
            <td className='ant-descriptions_cell ant-descriptions_content'>
              使用自定义元素，我们可以集成
              <a href="https://docs.dndkit.com/" target='_blank' rel="noreferrer noopener">dnd-kit</a>
              来实现拖拽排序
            </td>
          </tr>
        </tbody>
      </table>
    </>
    
  )
}

export default function TablePage() {
  const { cardSize } = useSelector((state) => state.global);
  const items = [
    {
      key: '1',
      label: `普通表格`,
      children: <Table1 />,
    },
    {
      key: '2',
      label: `树形表格`,
      children: <Table2 />,
    },
    {
      key: '3',
      label: `嵌套表格`,
      children: <Table3 />,
    },
    {
      key: '4',
      label: `拖拽表格`,
      children: <Table4 />,
    },
  ];
  return (
    <Card size={cardSize}>
      <Tabs tabPosition="left" defaultActiveKey="1" items={items} />
    </Card>
  )
}
