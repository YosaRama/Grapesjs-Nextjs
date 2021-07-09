import { Fragment, useEffect, useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useMediaLibraries } from "../../hooks/media";
import Form from "antd/lib/form/Form";
import axios from "axios";

function FileList() {
  const { data: listsFile, error } = useMediaLibraries();
  const listFile = listsFile?.data?.data;

  useEffect(() => {
    setFileList(listFile);
  }, [listsFile]);

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <>
      {listFile && (
        <Upload
          name="theFiles"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          multiple={false}
          action="/api/media"
        >
          {"+ Upload"}
        </Upload>
      )}
    </>
  );
}

export default FileList;
