/*
  ============================================================
  QUICKKART - DASHBOARD PAGE
  ============================================================

  This page is the main admin dashboard.

  It contains:
  1. Welcome section
  2. Sales / order statistics
  3. Revenue overview
  4. Order status progress
  5. Recent orders table
  6. Top selling products
  7. Quick business insights

  The page uses mock data so it works without a backend.
*/

import React, { useEffect, useState } from "react";

import {
  Avatar,
  Badge,
  Card,
  Col,
  Progress,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";

import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BoxPlotOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FireOutlined,
  ShoppingCartOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

/*
  ============================================================
  MOCK DASHBOARD DATA
  ============================================================
*/

const recentOrders = [
  {
    key: "1",
    orderId: "#QK-1048",
    customer: "Rahul Sharma",
    items: 4,
    amount: "₹1,240",
    status: "Delivered",
    time: "10 min ago",
  },
  {
    key: "2",
    orderId: "#QK-1047",
    customer: "Ananya Reddy",
    items: 7,
    amount: "₹860",
    status: "Out for delivery",
    time: "18 min ago",
  },
  {
    key: "3",
    orderId: "#QK-1046",
    customer: "Arjun Kumar",
    items: 3,
    amount: "₹540",
    status: "Processing",
    time: "27 min ago",
  },
  {
    key: "4",
    orderId: "#QK-1045",
    customer: "Sneha Patil",
    items: 8,
    amount: "₹1,780",
    status: "Delivered",
    time: "35 min ago",
  },
  {
    key: "5",
    orderId: "#QK-1044",
    customer: "Vikram Singh",
    items: 2,
    amount: "₹320",
    status: "Pending",
    time: "42 min ago",
  },
];

const topProducts = [
  {
    name: "Fresh Milk",
    category: "Dairy",
    sold: 428,
    revenue: "₹25,680",
  },
  {
    name: "Banana",
    category: "Fruits",
    sold: 361,
    revenue: "₹10,830",
  },
  {
    name: "Brown Bread",
    category: "Bakery",
    sold: 294,
    revenue: "₹11,760",
  },
  {
    name: "Potato",
    category: "Vegetables",
    sold: 247,
    revenue: "₹8,645",
  },
];

/*
  ============================================================
  HELPER - ORDER STATUS TAG
  ============================================================
*/

const getOrderStatus = (status) => {
  switch (status) {
    case "Delivered":
      return (
        <Tag color="success" icon={<CheckCircleOutlined />}>
          Delivered
        </Tag>
      );

    case "Out for delivery":
      return (
        <Tag color="processing" icon={<ThunderboltOutlined />}>
          Out for delivery
        </Tag>
      );

    case "Processing":
      return (
        <Tag color="warning" icon={<ClockCircleOutlined />}>
          Processing
        </Tag>
      );

    case "Pending":
      return (
        <Tag color="default" icon={<ClockCircleOutlined />}>
          Pending
        </Tag>
      );

    default:
      return <Tag>{status}</Tag>;
  }
};

/*
  ============================================================
  RECENT ORDERS TABLE COLUMNS
  ============================================================
*/

const orderColumns = [
  {
    title: "ORDER",
    dataIndex: "orderId",
    key: "orderId",
    render: (orderId) => (
      <Text strong style={{ color: "#a78bfa" }}>
        {orderId}
      </Text>
    ),
  },

  {
    title: "CUSTOMER",
    dataIndex: "customer",
    key: "customer",

    render: (customer) => (
      <Space>
        <Avatar
          size={32}
          icon={<UserOutlined />}
          style={{
            background:
              "linear-gradient(135deg, #8b5cf6, #3b82f6)",
          }}
        />

        <Text style={{ color: "#f8fafc" }}>
          {customer}
        </Text>
      </Space>
    ),
  },

  {
    title: "ITEMS",
    dataIndex: "items",
    key: "items",

    render: (items) => (
      <Text style={{ color: "#94a3b8" }}>
        {items} items
      </Text>
    ),
  },

  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",

    render: (amount) => (
      <Text strong style={{ color: "#f8fafc" }}>
        {amount}
      </Text>
    ),
  },

  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (status) => getOrderStatus(status),
  },

  {
    title: "TIME",
    dataIndex: "time",
    key: "time",

    render: (time) => (
      <Text style={{ color: "#64748b" }}>
        {time}
      </Text>
    ),
  },
];

/*
  ============================================================
  TOP PRODUCTS TABLE COLUMNS
  ============================================================
*/

const productColumns = [
  {
    title: "PRODUCT",
    dataIndex: "name",
    key: "name",

    render: (name) => (
      <Space>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            background: "rgba(139, 92, 246, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a78bfa",
          }}
        >
          <BoxPlotOutlined />
        </div>

        <Text strong style={{ color: "#f8fafc" }}>
          {name}
        </Text>
      </Space>
    ),
  },

  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",

    render: (category) => (
      <Tag>{category}</Tag>
    ),
  },

  {
    title: "SOLD",
    dataIndex: "sold",
    key: "sold",

    render: (sold) => (
      <Text style={{ color: "#94a3b8" }}>
        {sold} units
      </Text>
    ),
  },

  {
    title: "REVENUE",
    dataIndex: "revenue",
    key: "revenue",

    render: (revenue) => (
      <Text strong style={{ color: "#22c55e" }}>
        {revenue}
      </Text>
    ),
  },
];

/*
  ============================================================
  DASHBOARD COMPONENT
  ============================================================
*/

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");

useEffect(() => {
  const loadDashboard = async () => {
    try {
      setDashboardLoading(true);
      setDashboardError("");

      const response = await fetch(
        "http://localhost:5000/api/dashboard"
      );

      if (!response.ok) {
        throw new Error("Unable to load dashboard data.");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(
          result.message || "Unable to load dashboard data."
        );
      }

      setDashboardData(result);
    } catch (error) {
      console.error("Dashboard loading error:", error);
      setDashboardError(error.message);
    } finally {
      setDashboardLoading(false);
    }
  };

  loadDashboard();
}, []);
  return (
    <div className="quickkart-dashboard">

      {/* =====================================================
          WELCOME HEADER
          ===================================================== */}

      <div
        style={{
          marginBottom: 26,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <Text
            style={{
              color: "#8b5cf6",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            QUICKKART OPERATIONS
          </Text>

          <Title
            level={2}
            style={{
              color: "#f8fafc",
              marginTop: 6,
              marginBottom: 5,
              fontSize: 28,
            }}
          >
            Good morning, Admin 👋
          </Title>

          <Text
            style={{
              color: "#94a3b8",
              fontSize: 13,
            }}
          >
            Here is what's happening with your store today.
          </Text>
        </div>

        <div
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            background: "rgba(34, 197, 94, 0.08)",
            border: "1px solid rgba(34, 197, 94, 0.18)",
          }}
        >
          <Space>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                boxShadow: "0 0 10px rgba(34,197,94,.7)",
              }}
            />

            <Text
              style={{
                color: "#22c55e",
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Store operating normally
            </Text>
          </Space>
        </div>
      </div>

      {/* =====================================================
          STATISTICS
          ===================================================== */}

      <Row gutter={[16, 16]}>

        {/* TOTAL SALES */}

        <Col xs={24} sm={12} lg={6}>
          <Card
            className="dashboard-stat-card"
            style={{
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Statistic
                title="Today's Revenue"
                value={dashboardData?.statistics?.todayRevenue ?? 0}
                prefix="₹"
                valueStyle={{
                  color: "#f8fafc",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              />

              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(34, 197, 94, 0.12)",
                  color: "#22c55e",
                  fontSize: 18,
                }}
              >
                <DollarOutlined />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: "#22c55e",
                  fontSize: 11,
                }}
              >
                <ArrowUpOutlined /> 12.8%
              </Text>

              <Text
                style={{
                  color: "#64748b",
                  fontSize: 11,
                  marginLeft: 6,
                }}
              >
                vs yesterday
              </Text>
            </div>
          </Card>
        </Col>

        {/* ORDERS */}

        <Col xs={24} sm={12} lg={6}>
          <Card
            className="dashboard-stat-card"
            style={{
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Statistic
                title="Total Orders"
                value={dashboardData?.statistics?.todayOrders ?? 0}
                valueStyle={{
                  color: "#f8fafc",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              />

              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(139, 92, 246, 0.12)",
                  color: "#a78bfa",
                  fontSize: 18,
                }}
              >
                <ShoppingCartOutlined />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: "#22c55e",
                  fontSize: 11,
                }}
              >
                <ArrowUpOutlined /> 8.4%
              </Text>

              <Text
                style={{
                  color: "#64748b",
                  fontSize: 11,
                  marginLeft: 6,
                }}
              >
                vs yesterday
              </Text>
            </div>
          </Card>
        </Col>

        {/* CUSTOMERS */}

        <Col xs={24} sm={12} lg={6}>
          <Card
            className="dashboard-stat-card"
            style={{
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Statistic
                title="Active Customers"
                value={dashboardData?.statistics?.totalCustomers ?? 0}
                valueStyle={{
                  color: "#f8fafc",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              />

              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(59, 130, 246, 0.12)",
                  color: "#60a5fa",
                  fontSize: 18,
                }}
              >
                <UserOutlined />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: "#22c55e",
                  fontSize: 11,
                }}
              >
                <ArrowUpOutlined /> 5.2%
              </Text>

              <Text
                style={{
                  color: "#64748b",
                  fontSize: 11,
                  marginLeft: 6,
                }}
              >
                this week
              </Text>
            </div>
          </Card>
        </Col>

        {/* LOW STOCK */}

        <Col xs={24} sm={12} lg={6}>
          <Card
            className="dashboard-stat-card"
            style={{
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <Statistic
                title="Low Stock Items"
                value={dashboardData?.statistics?.lowStockItems ?? 0}
                valueStyle={{
                  color: "#f8fafc",
                  fontSize: 24,
                  fontWeight: 700,
                }}
              />

              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(245, 158, 11, 0.12)",
                  color: "#f59e0b",
                  fontSize: 18,
                }}
              >
                <FireOutlined />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <Text
                style={{
                  color: "#ef4444",
                  fontSize: 11,
                }}
              >
                <ArrowUpOutlined /> 3 items
              </Text>

              <Text
                style={{
                  color: "#64748b",
                  fontSize: 11,
                  marginLeft: 6,
                }}
              >
                need attention
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* =====================================================
          SECOND ROW
          REVENUE + ORDER STATUS
          ===================================================== */}

      <Row
        gutter={[16, 16]}
        style={{
          marginTop: 16,
        }}
      >

        {/* REVENUE OVERVIEW */}

        <Col xs={24} lg={16}>
          <Card
            title={
              <div>
                <Text
                  style={{
                    color: "#f8fafc",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  Revenue Overview
                </Text>

                <div
                  style={{
                    marginTop: 3,
                  }}
                >
                  <Text
                    style={{
                      color: "#64748b",
                      fontSize: 11,
                    }}
                  >
                    Weekly performance
                  </Text>
                </div>
              </div>
            }
            extra={
              <Tag
                color="purple"
                style={{
                  margin: 0,
                }}
              >
                This Week
              </Tag>
            }
          >
            {/* Fake chart built using progress bars */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(7, 1fr)",
                gap: 12,
                alignItems: "end",
                height: 190,
                paddingTop: 20,
              }}
            >
              {[
                {
                  day: "Mon",
                  value: 62,
                  amount: "₹18K",
                },
                {
                  day: "Tue",
                  value: 74,
                  amount: "₹22K",
                },
                {
                  day: "Wed",
                  value: 58,
                  amount: "₹17K",
                },
                {
                  day: "Thu",
                  value: 82,
                  amount: "₹25K",
                },
                {
                  day: "Fri",
                  value: 91,
                  amount: "₹28K",
                },
                {
                  day: "Sat",
                  value: 100,
                  amount: "₹31K",
                },
                {
                  day: "Sun",
                  value: 78,
                  amount: "₹24K",
                },
              ].map((item) => (
                <div
                  key={item.day}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "#94a3b8",
                      fontSize: 9,
                      marginBottom: 6,
                    }}
                  >
                    {item.amount}
                  </Text>

                  <div
                    style={{
                      width: "100%",
                      maxWidth: 34,
                      height: `${item.value}%`,
                      minHeight: 35,
                      borderRadius:
                        "7px 7px 3px 3px",

                      background:
                        item.value === 100
                          ? "linear-gradient(180deg, #a78bfa, #8b5cf6)"
                          : "linear-gradient(180deg, #3b82f6, #8b5cf6)",

                      boxShadow:
                        item.value === 100
                          ? "0 8px 20px rgba(139,92,246,.25)"
                          : "none",

                      transition:
                        "height .4s ease",
                    }}
                  />

                  <Text
                    style={{
                      color: "#64748b",
                      fontSize: 10,
                      marginTop: 8,
                    }}
                  >
                    {item.day}
                  </Text>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 20,
                paddingTop: 16,
                borderTop:
                  "1px solid #2a2e3a",
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <div>
                <Text
                  style={{
                    color: "#64748b",
                    fontSize: 11,
                  }}
                >
                  Total weekly revenue
                </Text>

                <div
                  style={{
                    color: "#f8fafc",
                    fontSize: 20,
                    fontWeight: 700,
                    marginTop: 4,
                  }}
                >
                  ₹1,65,420
                </div>
              </div>

              <div
                style={{
                  textAlign: "right",
                }}
              >
                <Text
                  style={{
                    color: "#22c55e",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <ArrowUpOutlined /> 18.6%
                </Text>

                <div
                  style={{
                    color: "#64748b",
                    fontSize: 10,
                    marginTop: 4,
                  }}
                >
                  compared to last week
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* ORDER STATUS */}

        <Col xs={24} lg={8}>
          <Card
            title={
              <Text
                style={{
                  color: "#f8fafc",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Order Status
              </Text>
            }
          >
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  Delivered
                </Text>

                <Text
                  style={{
                    color: "#f8fafc",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  68%
                </Text>
              </div>

              <Progress
                percent={68}
                showInfo={false}
                strokeColor="#22c55e"
              />
            </div>

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  Out for delivery
                </Text>

                <Text
                  style={{
                    color: "#f8fafc",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  17%
                </Text>
              </div>

              <Progress
                percent={17}
                showInfo={false}
                strokeColor="#3b82f6"
              />
            </div>

            <div
              style={{
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  Processing
                </Text>

                <Text
                  style={{
                    color: "#f8fafc",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  10%
                </Text>
              </div>

              <Progress
                percent={10}
                showInfo={false}
                strokeColor="#8b5cf6"
              />
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  Pending
                </Text>

                <Text
                  style={{
                    color: "#f8fafc",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  5%
                </Text>
              </div>

              <Progress
                percent={5}
                showInfo={false}
                strokeColor="#f59e0b"
              />
            </div>

            <div
              style={{
                marginTop: 26,
                padding: 14,
                borderRadius: 10,
                background:
                  "rgba(139, 92, 246, 0.07)",
                border:
                  "1px solid rgba(139, 92, 246, 0.12)",
              }}
            >
              <Space align="start">
                <ThunderboltOutlined
                  style={{
                    color: "#a78bfa",
                    fontSize: 18,
                  }}
                />

                <div>
                  <Text
                    strong
                    style={{
                      color: "#f8fafc",
                      fontSize: 12,
                    }}
                  >
                    Delivery performance
                  </Text>

                  <div
                    style={{
                      color: "#64748b",
                      fontSize: 10,
                      marginTop: 4,
                    }}
                  >
                    94% of today's orders
                    are on time.
                  </div>
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>

      {/* =====================================================
          THIRD ROW
          RECENT ORDERS
          ===================================================== */}

      <Row
        gutter={[16, 16]}
        style={{
          marginTop: 16,
        }}
      >
        <Col span={24}>
          <Card
            title={
              <div>
                <Text
                  style={{
                    color: "#f8fafc",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  Recent Orders
                </Text>

                <div>
                  <Text
                    style={{
                      color: "#64748b",
                      fontSize: 11,
                    }}
                  >
                    Latest customer orders
                  </Text>
                </div>
              </div>
            }
            extra={
              <Badge
                count={384}
                overflowCount={999}
                color="#8b5cf6"
                showZero
              />
            }
          >
            <Table
            columns={orderColumns}
            dataSource={(dashboardData?.recentOrders ?? []).map((order) => ({
              key: order.id,
              orderId: `#QK-${order.id}`,
              customer: order.customer_name || "Unknown Customer",
              items: "—",
              amount: `₹${Number(order.total_amount ?? 0).toLocaleString("en-IN")}`,
              status: order.order_status || "Pending",
              time: order.order_date
                ? new Date(order.order_date).toLocaleString("en-IN")
                : "—",
            }))}
            loading={dashboardLoading}
            pagination={false}
            scroll={{
              x: 800,
            }}
          />
          </Card>
        </Col>
      </Row>

      {/* =====================================================
          FOURTH ROW
          TOP PRODUCTS + QUICK INSIGHTS
          ===================================================== */}

      <Row
        gutter={[16, 16]}
        style={{
          marginTop: 16,
        }}
      >

        {/* TOP PRODUCTS */}

        <Col xs={24} lg={16}>
          <Card
            title={
              <div>
                <Text
                  style={{
                    color: "#f8fafc",
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  Top Selling Products
                </Text>

                <div>
                  <Text
                    style={{
                      color: "#64748b",
                      fontSize: 11,
                    }}
                  >
                    Best performing products today
                  </Text>
                </div>
              </div>
            }
          >
            <Table
            columns={productColumns}
            dataSource={(dashboardData?.topProducts ?? []).map((product) => ({
              key: product.id,
              name: product.name,
              category: product.category || "Uncategorized",
              sold: Number(product.sold ?? 0),
              revenue: `₹${Number(product.revenue ?? 0).toLocaleString("en-IN")}`,
            }))}
            loading={dashboardLoading}
            pagination={false}
            scroll={{
              x: 600,
            }}
          />
          </Card>
        </Col>

        {/* QUICK INSIGHTS */}

        <Col xs={24} lg={8}>
          <Card
            title={
              <Text
                style={{
                  color: "#f8fafc",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Quick Insights
              </Text>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >

              {/* INSIGHT 1 */}

              <div
                style={{
                  padding: 14,
                  borderRadius: 10,
                  background:
                    "rgba(34, 197, 94, 0.06)",
                  border:
                    "1px solid rgba(34, 197, 94, 0.12)",
                }}
              >
                <Space align="start">
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "rgba(34,197,94,.12)",
                      color: "#22c55e",
                    }}
                  >
                    <ArrowUpOutlined />
                  </div>

                  <div>
                    <Text
                      style={{
                        color: "#f8fafc",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Revenue is growing
                    </Text>

                    <div
                      style={{
                        color: "#64748b",
                        fontSize: 10,
                        marginTop: 4,
                      }}
                    >
                      Revenue increased 18.6%
                      this week.
                    </div>
                  </div>
                </Space>
              </div>

              {/* INSIGHT 2 */}

              <div
                style={{
                  padding: 14,
                  borderRadius: 10,
                  background:
                    "rgba(245, 158, 11, 0.06)",
                  border:
                    "1px solid rgba(245, 158, 11, 0.12)",
                }}
              >
                <Space align="start">
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "rgba(245,158,11,.12)",
                      color: "#f59e0b",
                    }}
                  >
                    <FireOutlined />
                  </div>

                  <div>
                    <Text
                      style={{
                        color: "#f8fafc",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Stock needs attention
                    </Text>

                    <div
                      style={{
                        color: "#64748b",
                        fontSize: 10,
                        marginTop: 4,
                      }}
                    >
                      18 products are running
                      low on inventory.
                    </div>
                  </div>
                </Space>
              </div>

              {/* INSIGHT 3 */}

              <div
                style={{
                  padding: 14,
                  borderRadius: 10,
                  background:
                    "rgba(59, 130, 246, 0.06)",
                  border:
                    "1px solid rgba(59, 130, 246, 0.12)",
                }}
              >
                <Space align="start">
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "rgba(59,130,246,.12)",
                      color: "#60a5fa",
                    }}
                  >
                    <UserOutlined />
                  </div>

                  <div>
                    <Text
                      style={{
                        color: "#f8fafc",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Customer growth
                    </Text>

                    <div
                      style={{
                        color: "#64748b",
                        fontSize: 10,
                        marginTop: 4,
                      }}
                    >
                      64 new customers joined
                      this week.
                    </div>
                  </div>
                </Space>
              </div>

              {/* INSIGHT 4 */}

              <div
                style={{
                  padding: 14,
                  borderRadius: 10,
                  background:
                    "rgba(139, 92, 246, 0.06)",
                  border:
                    "1px solid rgba(139, 92, 246, 0.12)",
                }}
              >
                <Space align="start">
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "rgba(139,92,246,.12)",
                      color: "#a78bfa",
                    }}
                  >
                    <ShoppingCartOutlined />
                  </div>

                  <div>
                    <Text
                      style={{
                        color: "#f8fafc",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Orders are healthy
                    </Text>

                    <div
                      style={{
                        color: "#64748b",
                        fontSize: 10,
                        marginTop: 4,
                      }}
                    >
                      Average order value is
                      ₹742 today.
                    </div>
                  </div>
                </Space>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

    </div>
  );
};

/*
  ============================================================
  EXPORT DASHBOARD
  ============================================================
*/

export default Dashboard;