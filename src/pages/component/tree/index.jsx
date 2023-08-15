import React from 'react';
import TreeCom from '@/components/TreeCom';
import { initTree } from '@/utils';
import { useSelector } from 'react-redux';
import { Card, Row,Col,Divider, message  } from 'antd';
import './index.scss';

export default function TreePage() {
  const menuList = useSelector(state => state.auth.authMenuList);
  const {cardSize} = useSelector((state) => state.global);
  const defaultData = initTree(menuList, 'id','label','children'); // 初始化菜单数组
  const [messageApi, contextHolder] = message.useMessage();

  const onSelect = (keys) => {
    if(keys.length) {
      messageApi.success('你选择了key为【'+ keys +'】的数据');
    }
  }

  return (
    <Row gutter={[16,16]} style={{height: '100%'}}>
      {contextHolder}
      <Col span={6}>
        <Card style={{height: '100%'}} size={cardSize}>
          <Divider className='tree-title'>树形列表(单选)</Divider>
          <TreeCom 
          treeData={defaultData}
          onSelect={onSelect}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{height: '100%'}} size={cardSize}>
          <Divider className='tree-title'>树形列表(多选)</Divider>
          <TreeCom 
          treeData={defaultData} 
          checkable={true}
          onSelect={onSelect}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card style={{height: '100%'}} size={cardSize}>
          <h1 className='t-c' style={{fontSize: '30px'}}>树形筛选器 🍓🍇🍈🍉</h1>
          <p className='fw-b' style={{fontSize: '20px', marginBottom: '20px'}}>配置项 📚</p>
          <table className='ant-descriptions_table'>
            <tbody>
              <tr>
                <td className='ant-descriptions_label ant-descriptions_cell'>treeData</td>
                <td className='ant-descriptions_cell ant-descriptions_content'>传入组件数据</td>
              </tr>
              <tr>
                <td className='ant-descriptions_label ant-descriptions_cell'>checkable</td>
                <td className='ant-descriptions_cell ant-descriptions_content'>是否多选(true/false)</td>
              </tr>
              <tr>
                <td className='ant-descriptions_label ant-descriptions_cell'>onSelect</td>
                <td className='ant-descriptions_cell ant-descriptions_content'>[事件]选择回调 function(keys)</td>
              </tr>
              <tr>
                <td className='ant-descriptions_label ant-descriptions_cell'>defaultValue</td>
                <td className='ant-descriptions_cell ant-descriptions_content'>	默认选中的节点 [...key]</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </Col>
    </Row>
    
  )
}
