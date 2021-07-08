import React, { useEffect, useState } from "react";
React.useLayoutEffect = React.useEffect;
import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";
import { useRouter } from "next/router";

function PageContent(props) {
  const Router = useRouter();
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const pathName = Router.pathname.split("/");
    setPaths(pathName);
  }, []);

  return (
    <Content style={{ margin: "0 16px" }}>
      <Breadcrumb style={{ margin: "16px 0" }}>
        {paths.map((path) => (
          <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360 }}
      >
        {props.children}
      </div>
    </Content>
  );
}

export default PageContent;
