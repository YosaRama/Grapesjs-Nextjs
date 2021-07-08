import { Card, Button } from "antd";
import { useState } from "react";
import FileList from "../../../components/libs/fileList";
import UploadFile from "../../../components/libs/uploadFile";

function AssetManager() {
  const [content, setContent] = useState();

  return (
    <Card
      title="Media"
      extra={
        <>
          <Button
            style={{ marginRight: 5 }}
            type="dashed"
            onClick={() => setContent("1")}
          >
            Upload File
          </Button>
          <Button
            style={{ marginLeft: 5 }}
            type="primary"
            onClick={() => setContent("2")}
          >
            File List
          </Button>
        </>
      }
    >
      {content === "1" ? <UploadFile /> : <FileList />}
    </Card>
  );
}

export default AssetManager;
