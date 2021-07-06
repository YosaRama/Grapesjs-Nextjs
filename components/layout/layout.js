import { Layout } from "antd";
import Sidebar from "./sider";
import Content from "./content";

const { Header, Footer } = Layout;

function PageLayout(props) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content>{props.children}</Content>
        <Footer style={{ textAlign: "center" }}>Y-Builder v1.0 ©2021</Footer>
      </Layout>
    </Layout>
  );
}

export default PageLayout;
