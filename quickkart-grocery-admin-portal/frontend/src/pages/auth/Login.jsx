import React, { useState } from "react";

import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  message,
} from "antd";

import {
  MailOutlined,
  LockOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Title, Paragraph } = Typography;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Runs after the form passes Ant Design validation.
  const handleLogin = async (values) => {
    setLoading(true);

    try {
      await login(values.email, values.password);

      message.success("Welcome to QuickKart!");

      // Replace the login page in browser history.
      navigate("/dashboard", { replace: true });
    } catch (error) {
      message.error(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <ShoppingCartOutlined
            style={{ fontSize: 40, color: "#16a34a" }}
          />

          <Title level={2}>Welcome back</Title>

          <Paragraph>
            Sign in to manage your QuickKart store.
          </Paragraph>
        </div>

        <Form
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              {
                required: true,
                message: "Please enter your email address.",
              },
              {
                type: "email",
                message: "Please enter a valid email address.",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="admin@quickkart.com"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password.",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Sign In
          </Button>
        </Form>

        <Paragraph className="auth-footer">
          New to QuickKart? <Link to="/register">Create an account</Link>
        </Paragraph>
      </Card>
    </div>
  );
}