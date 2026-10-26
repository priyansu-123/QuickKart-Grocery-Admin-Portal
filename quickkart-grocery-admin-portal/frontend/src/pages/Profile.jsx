import React from "react";

import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Space,
  Steps,
  Tag,
  Typography,
  message,
} from "antd";

import {
  UserOutlined,
  SaveOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Title, Text } = Typography;

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  // If the user is unavailable, do not render an empty profile.
  if (!user) {
    return null;
  }

  // Save editable details into shared authentication state.
  const handleSave = (values) => {
    updateUser({
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      department: values.department.trim(),
    });

    message.success("Profile updated successfully.");
  };

  // Sign out through AuthContext, not by editing localStorage here.
  const handleSignOut = () => {
    logout();
    message.success("You have signed out.");
    navigate("/login", { replace: true });
  };

  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex" }}
    >
      <Card>
        <Space align="center" size="middle">
          <Avatar size={80} icon={<UserOutlined />} />

          <div>
            <Title level={2} style={{ marginBottom: 4 }}>
              {user.name}
            </Title>

            <Tag color="green">{user.role || "Admin"}</Tag>

            <Text type="secondary">
              {user.department || "Operations"}
            </Text>
          </div>
        </Space>
      </Card>

      <Card title="Edit Profile">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: user.name || "",
            email: user.email || "",
            department: user.department || "Operations",
          }}
          onFinish={handleSave}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter your name.",
              },
            ]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email.",
              },
              {
                type: "email",
                message: "Enter a valid email address.",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter your department.",
              },
            ]}
          >
            <Input placeholder="Enter your department" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
          >
            Save Changes
          </Button>
        </Form>
      </Card>

      <Card title="Account Information">
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Account ID">
            {user.id}
          </Descriptions.Item>

          <Descriptions.Item label="Role">
            {user.role || "Admin"}
          </Descriptions.Item>

          <Descriptions.Item label="Email">
            {user.email}
          </Descriptions.Item>

          <Descriptions.Item label="Department">
            {user.department || "Operations"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Account Setup">
        <Steps
          current={2}
          items={[
            { title: "Account Created" },
            { title: "Profile Setup" },
            { title: "Ready" },
          ]}
        />
      </Card>

      <Card>
        <Space direction="vertical" size="middle">
          <Title level={4}>Sign out</Title>

          <Text type="secondary">
            Sign out of your current QuickKart session on this browser.
          </Text>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </Space>
      </Card>
    </Space>
  );
}