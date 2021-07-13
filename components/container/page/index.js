import { useBuilder } from "../../../hooks/builder";
import { useRouter } from "next/router";
import { Table, Row, Col, Button, Tooltip, Modal, Card } from "antd";
import {
  DeleteOutlined,
  ExpandAltOutlined,
  FormOutlined,
} from "@ant-design/icons";
import Wrapper from "../../layout/wrapper";

function Dashboard() {
  const router = useRouter();
  const { data: pagesListing, error, onDelete } = useBuilder();
  const pagesList = pagesListing?.data?.result;
  const { confirm } = Modal;

  const handlerPreview = (permalink) => {
    router.push("/dashboard/page/preview?id=" + permalink);
  };

  const handleEdit = (currentTitle) => {
    router.push("/dashboard/page/edit?id=" + currentTitle);
  };

  const handleDelete = (currentId) => {
    onDelete(currentId);
  };

  const handleCreate = () => {
    router.push("/dashboard/page/create");
  };

  const columns = [
    {
      title: "Page ID",
      dataIndex: "page_id",
      key: "page_id",
      render: (t, r) => <p>Page - {r?.id} </p>,
    },
    {
      title: "Page Title",
      dataIndex: "page_title",
      key: "page_title",
      render: (t, r) => r?.title,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (t, r) => {
        return (
          <Row>
            <Col>
              <Tooltip title="Preview Page">
                <span onClick={() => handlerPreview(r?.id)}>
                  <ExpandAltOutlined
                    style={{ fontSize: 22, marginRight: 20 }}
                    className="action-icon"
                  />
                </span>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Edit Page">
                <span onClick={() => handleEdit(r?.id)}>
                  <FormOutlined
                    style={{ fontSize: 22, marginRight: 20 }}
                    className="action-icon"
                  />
                </span>
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Delete Page">
                <span
                  onClick={() =>
                    confirm({
                      title: "Delete this page",
                      content: "Are you sure delete this page ?",
                      onOk: () => handleDelete(r?.id),
                    })
                  }
                >
                  <DeleteOutlined
                    style={{ fontSize: 22, marginRight: 20 }}
                    className="action-icon"
                  />
                </span>
              </Tooltip>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Wrapper>
      <Card
        title="Page Builder"
        extra={
          <Button onClick={() => handleCreate()} style={{ marginBottom: 0 }}>
            Create New Page
          </Button>
        }
      >
        <Table dataSource={pagesList} columns={columns} bordered />
      </Card>
    </Wrapper>
  );
}

export default Dashboard;
