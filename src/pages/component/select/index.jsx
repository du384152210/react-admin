import React from 'react';
import { Card, Select, Space, Cascader } from 'antd';
import { useSelector } from 'react-redux';
import './index.scss';

const { SHOW_CHILD } = Cascader;

function Select1 () {
  const options = [
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
    {
      value: 'Yiminghe',
      label: 'yiminghe',
    },
    {
      value: 'disabled',
      label: 'Disabled',
      disabled: true,
    },
  ];
  const handleChange = (value) => {
    console.log(value);
  }
  return (
    <Space wrap>
      <Select
        defaultValue="lucy"
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={options}
      />
      <Select
        defaultValue="lucy"
        style={{
          width: 120,
        }}
        disabled
        options={options}
      />
      <Select
        defaultValue="lucy"
        style={{
          width: 120,
        }}
        loading
        options={options}
      />
      <Select
        defaultValue="lucy"
        style={{
          width: 120,
        }}
        allowClear
        options={options}
      />
    </Space>
  )
}
function Select2 () {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  return (
    <>
      <Select
        style={{width: '100%'}}
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
    </>
  )
}
function Select3 () {
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <Select
        mode="multiple"
        allowClear
        style={{
          width: '100%',
        }}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        options={options}
      />
    </>
  )
}
function Select4 () {
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  const onChange = (value) => {
    console.log(value);
  };
  const filter = (inputValue, path) =>
  path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  return (
    <>
      <Cascader 
        options={options} 
        onChange={onChange} 
        placeholder="Please select" 
        onSearch={(value) => console.log(value)}
        showSearch={{
          filter,
        }}
      />
    </>
  )
}
function Select5 () {
  const options = [
    {
      label: 'Light',
      value: 'light',
      children: new Array(20).fill(null).map((_, index) => ({
        label: `Number ${index}`,
        value: index,
      })),
    },
    {
      label: 'Bamboo',
      value: 'bamboo',
      children: [
        {
          label: 'Little',
          value: 'little',
          children: [
            {
              label: 'Toy Fish',
              value: 'fish',
              disableCheckbox: true,
            },
            {
              label: 'Toy Cards',
              value: 'cards',
            },
            {
              label: 'Toy Bird',
              value: 'bird',
            },
          ],
        },
      ],
    },
  ];
  const onChange = (value) => {
    console.log(value);
  };
  return (
    <>
      <Cascader
        style={{
          width: '100%',
        }}
        showCheckedStrategy={SHOW_CHILD}
        options={options}
        onChange={onChange}
        multiple
        maxTagCount="responsive"
      />
    </>
  )
}

export default function SelectPage() {
  const { cardSize } = useSelector((state) => state.global);
  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Card size={cardSize}>
        <p className='select-title'>1.基础使用</p>
        <Select1/>
        <p className='select-title'>2.带搜索框</p>
        <Select2/>
        <p className='select-title'>3.多选，带搜索 (从已有条目中选择) </p>
        <Select3/>
        <p className='select-title'>4.级联选择 搜索</p>
        <Select4/>
        <p className='select-title'>5.级联多选</p>
        <Select5/>
      </Card>
      <Card size={cardSize}>
        <p className='fw-b' style={{fontSize: '20px', margin: '20px 0'}}>配置项 📚</p>
        <table className='ant-descriptions_table'>
          <tbody>
          <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>antd文档</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>
                <a href="https://ant.design/components/select-cn" target='_blank'  rel="noreferrer">Select选择器</a>
                <span style={{margin: '0 15px'}}>|</span>
                <a href="https://ant.design/components/cascader-cn" target='_blank'  rel="noreferrer">Cascader级联选择</a>
              </td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>allowClear</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>支持清除</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>defaultValue</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>指定默认选中的条目string | string[] |number | number[] |LabeledValue | LabeledValue[]</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>fieldNames</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>自定义节点 label、value、options、groupLabel 的字段</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>showSearch</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>配置是否可搜索</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>onSearch</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>文本框值变化时回调function(value: string)</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>onChange</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>选中 option，或 input 的 value 变化时，调用此函数function(value, option:Option | Array{'<Option>'})</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>onSelect</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>被选中时调用，参数为选中项的 value (或 key) 值function(value: string | number | LabeledValue, option: Option)</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </Space>
  )
}
