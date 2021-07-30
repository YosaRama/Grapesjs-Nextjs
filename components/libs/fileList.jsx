import {
  Upload,
  Modal,
  Spin,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  message,
  Tooltip,
} from "antd";
import { LoadingOutlined, PlusOutlined, EyeOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useMediaLibraries } from "../../hooks/media";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import ButtonGroup from "antd/lib/button/button-group";

function FileList() {
  const {
    data: listsFile,
    onAdd,
    onDelete,
    onUpdate,
    loading,
  } = useMediaLibraries();
  const listFile = listsFile?.data?.data;
  const [preview, setPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState("");
  const [imageDetail, setImageDetail] = useState(null);
  const showFile = listFile?.map((item) => {
    return {
      uid: item.id,
      name: item.filename,
      type: item.mimetype,
      originalUrl: item.url,
      url: item.thumb_url,
      title: item.title,
      altText: item.alt_text,
      desc: item.description,
    };
  });
  const [form] = Form.useForm();

  const onPreview = async (file) => {
    setPreviewItem(file.url);
    setPreview(true);
  };

  const handleCancel = () => {
    setPreview(false);
  };

  const handleRemove = (file) => {
    onDelete(file.uid, file.url);
    setImageDetail("");
  };

  const handleSelect = (file) => {
    form.resetFields();
    setImageDetail(file);
  };

  useEffect(() => {
    form.setFieldsValue({
      title: imageDetail?.title,
      alt: imageDetail?.altText,
      description: imageDetail?.desc,
    });
  }, [imageDetail]);

  const handleUpdate = (value) => {
    const data = { ...value, id: imageDetail.uid };
    onUpdate(data);
  };

  return (
    <Spin spinning={loading}>
      {listsFile && (
        <Row gutter={[24, 0]}>
          <Col span={15}>
            <Card title="File List">
              <Upload
                name="theFiles"
                listType="picture-card"
                fileList={showFile}
                //Remove button is Preview button
                onRemove={handleSelect}
                multiple={false} //Change for upload multiple
                customRequest={onAdd}
                showUploadList={{
                  showPreviewIcon: false,
                  showRemoveIcon: true,
                  removeIcon: (
                    <button
                      title="View Details"
                      style={{ width: "100%", padding: 0 }}
                    >
                      <EyeOutlined style={{ margin: 0 }} />
                    </button>
                  ),
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
          <Col span={9}>
            <Card title="File Detail">
              <img
                src={
                  imageDetail ? imageDetail.url : "/images/default-image.png"
                }
                style={{ width: "100%" }}
              />
              <Form
                layout="vertical"
                style={{ marginTop: 30 }}
                onFinish={handleUpdate}
                form={form}
              >
                <Form.Item label="Title" name="title">
                  <Input disabled={!imageDetail} />
                </Form.Item>
                <Form.Item label="Alt Image" name="alt">
                  <Input
                    disabled={!imageDetail}
                    value={imageDetail && imageDetail.originalUrl}
                  />
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <TextArea disabled={!imageDetail} />
                </Form.Item>
                <Form.Item label="URL Image">
                  <Row gutter={[4, 0]}>
                    <Col span={18}>
                      <Input
                        disabled
                        value={imageDetail && imageDetail.originalUrl}
                      />
                    </Col>
                    <Col span={4}>
                      <Button
                        disabled={!imageDetail}
                        onClick={(e) => {
                          e.preventDefault();
                          try {
                            // This copy url of file
                            navigator.clipboard.writeText(
                              imageDetail &&
                                `localhost:3000${imageDetail.originalUrl}`
                            );
                            message.success("Copied");
                          } catch (e) {
                            message.error("Please try again!");
                          }
                        }}
                      >
                        Copy URL
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item>
                  <Row justify="end" gutter={[4, 0]} style={{ marginTop: 20 }}>
                    <Col>
                      <Button
                        danger
                        onClick={() => imageDetail && handleRemove(imageDetail)}
                        disabled={!imageDetail}
                      >
                        Delete
                      </Button>
                    </Col>
                    <Col>
                      <Button disabled={!imageDetail} htmlType="submit">
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
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
