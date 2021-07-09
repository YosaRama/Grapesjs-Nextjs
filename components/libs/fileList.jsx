import { Fragment, useState } from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { useMediaLibraries } from "../../hooks/media";

function FileList() {
  const { data: listFile, error, onAdd } = useMediaLibraries();
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange = ({ fileList: newFileList, file: sendFile }) => {
    setFileList(newFileList);
    // TODO : Add upload file system right here
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
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
    >
      {"+ Upload"}
    </Upload>
  );
}

export default FileList;
