import React, {useState} from 'react';
import { Row, Card, Col, Upload, Button, Alert,message,Modal } from 'antd';
import { UploadOutlined,LoadingOutlined, PlusOutlined,InboxOutlined  } from '@ant-design/icons';
import './index.scss';
const { Dragger } = Upload;

const props = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  defaultFileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      percent: 33,
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500',
      // custom error message to show
      // url: 'http://www.baidu.com/zzz.png',
    },
  ],
};
const props2 = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
}
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64_list(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const getBase64_list = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
  const handleChange_list = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <Row gutter={[16,16]}>
      <Col span={24}>
        <Card size='small'>
          <h1 className='t-c' style={{fontSize: '30px'}}>文件上传 🍓🍇🍈🍉</h1>
        </Card>
      </Col>
      <Col span={24}>
        <Card size='small'>
          <Row gutter={[16,16]}>
            <Col span={8}>
              <Alert message="经典款式，用户点击按钮弹出文件选择框。" type="info" showIcon />
              <div style={{marginTop: '15px'}}>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </div>
            </Col>
            <Col span={8}>
                <Alert message="点击上传用户头像。" type="info" showIcon />
                <div style={{marginTop: '15px'}} className='flex f-a-c'>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: '100%',
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                  <Upload
                    name="avatar"
                    listType="picture-circle"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: '100%',
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
            </Col>
            <Col span={8}>
              <Alert message="把文件拖入指定区域，完成上传，同样支持点击上传。
                设置 multiple 后，在 IE10+ 可以一次上传多个文件。" type="info" showIcon />
              <div style={{marginTop: '15px'}}>
              <Dragger {...props2}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                  banned files.
                </p>
              </Dragger>
              </div>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={12}>
        <Card size='small'>
          <Alert message="照片墙 用户可以上传图片并在列表中显示缩略图。当上传照片数到达限制后，上传按钮消失。" type="info" showIcon />
            <div style={{marginTop: '15px'}}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange_list}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </div>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img
                alt="example"
                style={{
                  width: '100%',
                }}
                src={previewImage}
              />
            </Modal>
        </Card>
      </Col>
      <Col span={12}>
        <Card size='small'>
          <Alert message="图片列表样式。" type="info" showIcon />
            <div style={{marginTop: '15px'}}>
              <Upload {...props} listType="picture">
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
        </Card>
      </Col>
      <Col span={24}>
        <Card size='small'>
        <p className='fw-b' style={{fontSize: '20px', margin: '20px 0'}}>配置项 📚</p>
          <table className='ant-descriptions_table'>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>官方文档说明</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>
                <a href="https://ant.design/components/upload-cn#api" target='_blank' rel="noopener noreferrer">antd文件上传</a>
              </td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>defaultFileList</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>默认上传列表object[uid,name,status,url,percent]</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>action</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>上传的地址</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>accept</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>接受上传的文件类型</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>beforeUpload</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>上传文件之前的钩子</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>data</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>{'object|(file) => object | Promise<object>'}</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>fileList</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>已经上传的文件列表（受控）</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>listType</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>支持四种基本样式 text, picture, picture-card 和 picture-circle</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>onChange</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>上传文件改变时的回调file,fileList,event</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>onPreview</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>点击文件链接或预览图标时的回调function(file)</td>
            </tr>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>onDrop</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>{'当文件被拖入上传区域时执行的回调功能(event: React.DragEvent) =>void'}</td>
            </tr>
          </table>
        </Card>
      </Col>
    </Row>
  )
}
