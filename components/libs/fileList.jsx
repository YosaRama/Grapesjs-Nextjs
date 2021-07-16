import { Upload, Modal, Spin, Row, Col, Card, Form, Input, Button } from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  CheckOutlined,
  StarOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useMediaLibraries } from "../../hooks/media";
import { useState } from "react";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import ButtonGroup from "antd/lib/button/button-group";

function FileList() {
  const { data: listsFile, onAdd, onDelete, loading } = useMediaLibraries();
  const listFile = listsFile?.data?.data;
  const [preview, setPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState("");
  const [imageDetail, setImageDetail] = useState(null);
  const showFile = listFile?.map((item) => {
    return {
      uid: item.id,
      name: item.filename,
      type: item.mimetype,
      url: item.url,
    };
  });

  const onPreview = async (file) => {
    setPreviewItem(file.url);
    setPreview(true);
  };

  const handleCancel = () => {
    setPreview(false);
  };

  const onRemove = async (file) => {
    onDelete(file.id, file.url);
  };

  const handleSelect = (file) => {
    setImageDetail(file);
    console.log("selected");
  };

  return (
    <Spin spinning={loading}>
      {listsFile && (
        <Row gutter={[24, 0]}>
          <Col span={14}>
            <Card title="File List">
              <Upload
                name="theFiles"
                listType="picture-card"
                fileList={showFile}
                // onPreview={onPreview}
                onRemove={handleSelect}
                multiple={false}
                customRequest={onAdd}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                  removeIcon: <CheckOutlined />,
                }}
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
            </Card>
          </Col>
          <Col span={10}>
            <Card title="File Detail">
              <img
                src={
                  imageDetail ? imageDetail.url : "/images/default-image.png"
                }
                style={{ width: "100%" }}
              />
              <Form layout="vertical" style={{ marginTop: 30 }}>
                <Form.Item label="Title">
                  <Input />
                </Form.Item>
                <Form.Item label="Alt Image">
                  <Input />
                </Form.Item>
                <Form.Item label="Description">
                  <TextArea />
                </Form.Item>
                <Form.Item label="URL Image">
                  <Row gutter={[4, 0]}>
                    <Col span={20}>
                      <Input disabled />
                    </Col>
                    <Col span={4}>
                      <Button>Copy URL</Button>
                    </Col>
                  </Row>
                </Form.Item>
                <Row justify="end" gutter={[4, 0]} style={{ marginTop: 50 }}>
                  <Col>
                    <Button danger>Delete</Button>
                  </Col>
                  <Col>
                    <Button>Update</Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      )}
      <Modal visible={preview} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewItem} />
      </Modal>
    </Spin>
  );
}

export default FileList;
