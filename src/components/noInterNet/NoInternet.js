import React from "react";
import { Space, Typography } from "antd";

const { Title } = Typography;

function NoInternet() {
  return (
    <Space direction="vertical" align="center">
      <Title  type="warning">No Internet</Title>
      <Title  type="warning">
        Please try to reconnect to the server!!
      </Title>
    </Space>
  );
}

export default NoInternet;
