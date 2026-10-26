import React, { useState } from "react";

import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Typography,
  message,
} from "antd";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const { Title, Paragraph } = Typography;

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);

    try {
      await register(values);

      message.success("Account created successfully!");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      message.error(
        error.message || "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card className="auth-card">
        <Title level={2}>Create account</Title>

        <Paragraph>
          Set up an account for the QuickKart admin portal.
        </Paragraph>

        <Form
          layout="vertical"
          onFinish={handleRegister}
          requiredMark={false}
          initialValues={{
            role: "Manager",
            department: "Operations",
          }}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Please enter your full name.",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter your name"
              autoComplete="name"
            />
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
            <Input
              size="large"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please create a password.",
              },
              {
                min: 6,
                message: "Use at least 6 characters.",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Create a password"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Select
              size="large"
              options={[
                { value: "Admin", label: "Admin" },
                { value: "Manager", label: "Manager" },
                { value: "Staff", label: "Staff" },
              ]}
            />
          </Form.Item>

          <Form.Item name="department" label="Department">
            <Select
              size="large"
              options={[
                { value: "Operations", label: "Operations" },
                { value: "Inventory", label: "Inventory" },
                { value: "Delivery", label: "Delivery" },
                { value: "Marketing", label: "Marketing" },
              ]}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            Create Account
          </Button>
        </Form>

        <Paragraph className="auth-footer">
          Already registered? <Link to="/login">Sign in</Link>
        </Paragraph>
      </Card>
    </div>
  );
}