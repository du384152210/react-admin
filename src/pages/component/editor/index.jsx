import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Card } from 'antd';

export default function EditorPage() {
  const editorRef = useRef(null);

  const imagesUploadHandler = async (blobInfo, success, failure, progress) => {
    console.log(blobInfo);
    // var data = new FormData();
    // data.append('files', blobInfo.blob(), blobInfo.filename());
    // let res = await uploadFile(data);
    // if (res) {
    //     let { errno } = res;
    //     if (errno === 0) {
    //         success(res.data[0]);//return Json Format is ["imageUrl","imageUrl1"]
    //     } else {
    //         failure("图片上传失败")
    //     }
    // } else {
    //     failure("图片上传失败")
    // }
  }

  const handleEditorChange = (content, editor) => {
    console.log(content);
  }

  return (
    <div>
      <Card >
        <h1 className="t-c" style={{fontSize: '30px'}}>富文本编辑器 🍓🍇🍈🍉</h1>
        <p className='fw-b' style={{fontSize: '20px', margin: '20px 0'}}>配置项 📚</p>
        <table className='ant-descriptions_table' style={{marginBottom: '20px'}}>
          <tbody>
            <tr>
              <td className='ant-descriptions_label ant-descriptions_cell'>文档说明</td>
              <td className='ant-descriptions_cell ant-descriptions_content'>
                <a href="https://www.tiny.cloud/docs/integrations/react/" target='_blank' rel="noopener noreferrer">tinymce富文本编辑器</a>
              </td>
            </tr>
          </tbody>
        </table>
        <Editor
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue=""
          apiKey="dussaqw1pedqjai0gq5wdnvb4jiu7zga971e70o9yo69f92w"
          init={{
              height: 500,
              plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'print', 'preview', 'anchor',
                  'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'paste', 'code', 'help', 'wordcount', 'imagetools', 'codesample'
              ],
              toolbar:
                  'undo redo | formatselect | bold italic backcolor |  alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image | codesample | code | preview | fullscreen | help',
              menu: {
                  file: { title: '文件', items: 'newdocument restoredraft | preview | print' },
                  edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
                  view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
                  insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
                  format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
                  tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
                  table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
                  favs: { title: 'My Favorites', items: 'code visualaid | searchreplace | spellchecker | emoticons' }
              },
              menubar: 'file edit view insert format tools table',
              codesample_languages: [
                  { text: 'HTML/XML', value: 'markup' },
                  { text: 'JavaScript', value: 'javascript' },
                  { text: 'CSS', value: 'css' },
                  { text: 'PHP', value: 'php' },
                  { text: 'Ruby', value: 'ruby' },
                  { text: 'Python', value: 'python' },
                  { text: 'Java', value: 'java' },
                  { text: 'C', value: 'c' },
                  { text: 'C#', value: 'csharp' },
                  { text: 'C++', value: 'cpp' },
                  { text: 'Scala', value: 'scala' }
              ],
              language: "zh_CN",
              image_uploadtab: true,
              images_upload_handler: imagesUploadHandler
          }}
          onEditorChange={handleEditorChange}
        />
      </Card>
    </div>
  )
}
