import { Upload, Modal, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useMediaLibraries } from "../../hooks/media";
import { useState } from "react";
import axios from "axios";

function FileList() {
  const { data: listsFile, onAdd, onDelete, loading } = useMediaLibraries();
  const listFile = listsFile?.data?.data;
  const [preview, setPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState("");

  const onPreview = async (file) => {
    setPreviewItem(file.url);
    setPreview(true);
  };

  const handleCancel = () => {
    setPreview(false);
  };

  const onRemove = async (file) => {
    onDelete(file.uid, file.url);
  };

  return (
    <Spin spinning={loading}>
      {listsFile && (
        <Upload
          name="theFiles"
          listType="picture-card"
          fileList={listFile}
          onPreview={onPreview}
          onRemove={onRemove}
          multiple={false}
          customRequest={onAdd}
        >
          {
            <div>
              {loading ? (
                <LoadingOutlined style={{ fontSize: 24 }} />
              ) : (
                <PlusOutlined style={{ fontSize: 24 }} />
              )}
              <div className="ant-upload-text">Upload</div>
            </div>
          }
        </Upload>
      )}
      <Modal visible={preview} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewItem} />
      </Modal>
    </Spin>
  );
}

export default FileList;
