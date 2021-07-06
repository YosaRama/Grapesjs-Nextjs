import { Layout, Menu } from "antd";
import { CopyOutlined, CameraOutlined } from "@ant-design/icons";
import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const PageSider = (props) => {
  const Router = useRouter();
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [sideshow, setSideshow] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  useLayoutEffect(() => {
    setSideshow(true);
  });

  return (
    <>
      {sideshow && (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">Y-BUILDER</div>
          <Menu theme="dark" mode="inline" selectedKeys={Router.pathname}>
            <Menu.Item key="/dashboard" icon={<CopyOutlined />}>
              <Link href="/dashboard">Pages</Link>
            </Menu.Item>
            <Menu.Item key="/dashboard/asset-manager" icon={<CameraOutlined />}>
              <Link href="/dashboard/asset-manager">Asset Manager</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      )}
    </>
  );
};

export default PageSider;
