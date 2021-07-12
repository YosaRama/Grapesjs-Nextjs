import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useMediaLibraries } from "../../hooks/media";

function UploadFile() {
  const { Dragger } = Upload;
  const { onAdd, status } = useMediaLibraries();

  const props = {
    name: "theFiles",
    customRequest(info) {
      message.success(`${info.file.name} file uploaded successfully.`);
      onAdd({ file: info.file });
    },
    multiple: false,
    showUploadList: false,
  };

  return (
    <div style={{ height: 450 }}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </div>
  );
}

export default UploadFile;
