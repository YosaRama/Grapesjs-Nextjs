import { useBuilder } from "../../hooks/builder";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import { Table, Row, Col, Button } from "antd";
import {
  DeleteOutlined,
  ExpandAltOutlined,
  FormOutlined,
} from "@ant-design/icons";

function Dashboard() {
  const router = useRouter();
  const { data: pagesListing, error, onDelete } = useBuilder();
  const pagesList = pagesListing?.data?.result;

  const handlerPreview = (permalink) => {
    router.push("/" + permalink);
  };

  const handleEdit = (currentTitle) => {
    router.push("/builder/" + currentTitle);
  };

  const handleDelete = (currentId) => {
    onDelete(currentId);
  };

  const handleCreate = () => {
    router.push("/builder");
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
              <span onClick={() => handlerPreview(r?.title)}>
                <ExpandAltOutlined style={{ fontSize: 22, marginRight: 20 }} />
              </span>
            </Col>
            <Col>
              <span onClick={() => handleEdit(r?.title)}>
                <FormOutlined style={{ fontSize: 22, marginRight: 20 }} />
              </span>
            </Col>
            <Col>
              <span onClick={() => handleDelete(r?.id)}>
                <DeleteOutlined style={{ fontSize: 22, marginRight: 20 }} />
              </span>
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <Layout>
      <Button onClick={() => handleCreate()} style={{ marginBottom: 20 }}>
        Create New Page
      </Button>
      <Table dataSource={pagesList} columns={columns} />
    </Layout>
  );
}

export default Dashboard;
