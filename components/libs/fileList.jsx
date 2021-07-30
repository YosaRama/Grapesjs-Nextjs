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
  Descriptions,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  CheckOutlined,
  StarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
// import ImgCrop from "antd-img-crop";
import { useMediaLibraries } from "../../hooks/media";
import { useCallback, useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useRouter } from "next/router";

function FileList() {
  // Custom Hooks
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
      uid: item?.id,
      name: item?.filename,
      type: item?.mimetype,
      originalUrl: item?.url,
      url: item?.thumb_url,
      title: item?.title,
      altText: item?.alt_text,
      desc: item?.description,
      uploadedOn: item?.created_at,
      uploadedBy: "admin",
      size: item?.size,
      dimension: item?.width + " by " + item?.height + " pixels ",
    };
  });

  // Next.js default
  const router = useRouter();

  // Ant design stuff
  const [form] = Form.useForm();
  const [formSearch] = Form.useForm();
  const { Search } = Input;

  // Custom Function
  const onPreview = async (file) => {
    setPreviewItem(file.url);
    setPreview(true);
  };

  const handleCancel = () => {
    setPreview(false);
  };

  const handleRemove = (file) => {
    onDelete(file.uid, file.name);
    setImageDetail("");
  };

  const handleSelect = (file) => {
    form.resetFields();
    setImageDetail(file);
  };

  useEffect(() => {
    form.setFieldsValue({
      file_name: imageDetail?.name,
      title: imageDetail?.title,
      alt: imageDetail?.altText,
      description: imageDetail?.desc,
    });
  }, [imageDetail]);

  const handleUpdate = (value) => {
    const data = { ...value, id: imageDetail.uid };
    onUpdate(data);
  };

  const handlePreview = (file) => {
    window.open(file.originalUrl);
  };

  const handleSearch = (value) => {
    router.push(`/dashboard/media?name=${value}`);
  };

  const handleClear = () => {
    formSearch.resetFields();
    router.push(`/dashboard/media`);
  };

  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={15}>
          <Card
            title="File List"
            extra={
              <Form form={formSearch}>
                <Row>
                  <Form.Item name="search">
                    <Search
                      placeholder="input search text"
                      onSearch={handleSearch}
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                  <Button onClick={handleClear}>Clear</Button>
                </Row>
              </Form>
            }
          >
            <Spin spinning={loading}>
              {listsFile && (
                <Upload
                  name="theFiles"
                  listType="picture-card"
                  fileList={showFile}
                  onRemove={handleSelect}
                  multiple={true}
                  customRequest={onAdd}
                  showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: true,
                    removeIcon: (
                      <button
                        title="View Details"
                        style={{
                          width: "100%",
                          padding: 0,
                          background: "none",
                          border: "none",
                        }}
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
              )}
            </Spin>
          </Card>
        </Col>
        <Col span={9}>
          <Card title="File Detail">
            <img
              src={imageDetail ? imageDetail.url : "/images/default-image.png"}
              style={{ width: "100%" }}
            />
            {imageDetail && (
              <Descriptions style={{ margin: "20px 0px" }}>
                {imageDetail?.uploadedOn && (
                  <Descriptions.Item
                    label="Uploaded on"
                    labelStyle={{ fontWeight: "bold" }}
                    span={3}
                    style={{ padding: "5px 0" }}
                  >
                    {new Date(imageDetail?.uploadedOn).toLocaleDateString()}
                  </Descriptions.Item>
                )}
                {imageDetail?.uploadedBy && (
                  <Descriptions.Item
                    label="Uploaded by"
                    labelStyle={{ fontWeight: "bold" }}
                    span={3}
                    style={{ padding: "5px 0" }}
                  >
                    {imageDetail?.uploadedBy}
                  </Descriptions.Item>
                )}
                {imageDetail?.name && (
                  <Descriptions.Item
                    label="File name"
                    labelStyle={{ fontWeight: "bold" }}
                    span={3}
                    style={{ padding: "5px 0" }}
                  >
                    {imageDetail?.name}
                  </Descriptions.Item>
                )}
                {imageDetail?.type && (
                  <Descriptions.Item
                    label="File type"
                    labelStyle={{ fontWeight: "bold" }}
                    span={3}
                    style={{ padding: "5px 0" }}
                  >
                    {imageDetail?.type}
                  </Descriptions.Item>
                )}
                {imageDetail?.size && (
                  <Descriptions.Item
                    label="File size"
                    labelStyle={{ fontWeight: "bold" }}
                    span={3}
                    style={{ padding: "5px 0" }}
                  >
                    {imageDetail?.size + " KB"}
                  </Descriptions.Item>
                )}
                {imageDetail?.size && (
                  <Descriptions.Item
                    label="Dimension"
                    labelStyle={{ fontWeight: "bold" }}
                    span={3}
                    style={{ padding: "5px 0" }}
                  >
                    {imageDetail?.dimension}
                  </Descriptions.Item>
                )}
              </Descriptions>
            )}
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
                  <Col>
                    <Button
                      disabled={!imageDetail}
                      onClick={() => handlePreview(imageDetail)}
                    >
                      Preview
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Modal visible={preview} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewItem} />
      </Modal>
    </>
  );
}

export default FileList;
