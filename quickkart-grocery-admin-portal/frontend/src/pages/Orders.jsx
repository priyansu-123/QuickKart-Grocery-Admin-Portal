// Orders.jsx
// QuickKart Grocery Admin Portal
// Orders Management Page

import React, { useEffect, useMemo, useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Drawer,
  Input,
  message,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";

import {
  CalendarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  InboxOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

/* =========================================================
   MOCK ORDER DATA
   ---------------------------------------------------------
   This is temporary data for the frontend.
   Later, we can replace this with an Express + PostgreSQL API.
========================================================= */

const initialOrders = [
  {
    key: "ORD-1001",
    orderId: "ORD-1001",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    address: "Madhapur, Hyderabad",
    items: [
      { name: "Fresh Milk 1L", quantity: 2, price: 62 },
      { name: "Brown Bread", quantity: 1, price: 45 },
      { name: "Bananas", quantity: 1, price: 55 },
    ],
    amount: 224,
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Delivered",
    orderDate: "2026-10-07",
    orderTime: "09:25 AM",
    deliveryPerson: "Amit Kumar",
    deliveryProgress: 100,
  },

  {
    key: "ORD-1002",
    orderId: "ORD-1002",
    customer: "Priya Reddy",
    email: "priya@example.com",
    phone: "+91 91234 56789",
    address: "Kondapur, Hyderabad",
    items: [
      { name: "Basmati Rice 5kg", quantity: 1, price: 420 },
      { name: "Toor Dal 1kg", quantity: 2, price: 145 },
    ],
    amount: 710,
    payment: "Paid",
    paymentMethod: "Card",
    status: "Out for Delivery",
    orderDate: "2026-10-08",
    orderTime: "10:15 AM",
    deliveryPerson: "Vikram Singh",
    deliveryProgress: 75,
  },

  {
    key: "ORD-1003",
    orderId: "ORD-1003",
    customer: "Ananya Das",
    email: "ananya@example.com",
    phone: "+91 99887 66554",
    address: "Gachibowli, Hyderabad",
    items: [
      { name: "Almonds 500g", quantity: 1, price: 390 },
      { name: "Greek Yogurt", quantity: 2, price: 90 },
    ],
    amount: 570,
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Processing",
    orderDate: "2026-10-08",
    orderTime: "11:05 AM",
    deliveryPerson: "Not Assigned",
    deliveryProgress: 45,
  },

  {
    key: "ORD-1004",
    orderId: "ORD-1004",
    customer: "Arjun Mehta",
    email: "arjun@example.com",
    phone: "+91 90123 45678",
    address: "Jubilee Hills, Hyderabad",
    items: [
      { name: "Orange Juice 1L", quantity: 2, price: 120 },
      { name: "Potato Chips", quantity: 2, price: 60 },
    ],
    amount: 360,
    payment: "Pending",
    paymentMethod: "Cash on Delivery",
    status: "Pending",
    orderDate: "2026-10-08",
    orderTime: "11:40 AM",
    deliveryPerson: "Not Assigned",
    deliveryProgress: 10,
  },

  {
    key: "ORD-1005",
    orderId: "ORD-1005",
    customer: "Sneha Patel",
    email: "sneha@example.com",
    phone: "+91 93456 78901",
    address: "Banjara Hills, Hyderabad",
    items: [
      { name: "Tomatoes 1kg", quantity: 2, price: 50 },
      { name: "Onions 1kg", quantity: 2, price: 45 },
      { name: "Potatoes 2kg", quantity: 1, price: 80 },
    ],
    amount: 270,
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Delivered",
    orderDate: "2026-10-06",
    orderTime: "06:30 PM",
    deliveryPerson: "Ravi Teja",
    deliveryProgress: 100,
  },

  {
    key: "ORD-1006",
    orderId: "ORD-1006",
    customer: "Kiran Rao",
    email: "kiran@example.com",
    phone: "+91 98712 34567",
    address: "Hitech City, Hyderabad",
    items: [
      { name: "Chicken Breast 500g", quantity: 1, price: 220 },
      { name: "Eggs 12 Pack", quantity: 1, price: 110 },
    ],
    amount: 330,
    payment: "Paid",
    paymentMethod: "Card",
    status: "Out for Delivery",
    orderDate: "2026-10-08",
    orderTime: "12:10 PM",
    deliveryPerson: "Suresh Kumar",
    deliveryProgress: 80,
  },

  {
    key: "ORD-1007",
    orderId: "ORD-1007",
    customer: "Neha Kapoor",
    email: "neha@example.com",
    phone: "+91 97654 32109",
    address: "Manikonda, Hyderabad",
    items: [
      { name: "Green Tea", quantity: 1, price: 180 },
      { name: "Honey 500g", quantity: 1, price: 250 },
    ],
    amount: 430,
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Processing",
    orderDate: "2026-10-08",
    orderTime: "12:45 PM",
    deliveryPerson: "Not Assigned",
    deliveryProgress: 35,
  },

  {
    key: "ORD-1008",
    orderId: "ORD-1008",
    customer: "Rohit Verma",
    email: "rohit@example.com",
    phone: "+91 96543 21098",
    address: "Begumpet, Hyderabad",
    items: [
      { name: "Chocolate Cookies", quantity: 2, price: 85 },
      { name: "Cold Coffee", quantity: 2, price: 95 },
    ],
    amount: 360,
    payment: "Failed",
    paymentMethod: "Card",
    status: "Cancelled",
    orderDate: "2026-10-07",
    orderTime: "08:20 PM",
    deliveryPerson: "Not Assigned",
    deliveryProgress: 0,
  },

  {
    key: "ORD-1009",
    orderId: "ORD-1009",
    customer: "Pooja Singh",
    email: "pooja@example.com",
    phone: "+91 92345 67890",
    address: "Kukatpally, Hyderabad",
    items: [
      { name: "Apple 1kg", quantity: 1, price: 180 },
      { name: "Mangoes 1kg", quantity: 1, price: 160 },
    ],
    amount: 340,
    payment: "Paid",
    paymentMethod: "UPI",
    status: "Delivered",
    orderDate: "2026-10-05",
    orderTime: "04:15 PM",
    deliveryPerson: "Manoj Kumar",
    deliveryProgress: 100,
  },

  {
    key: "ORD-1010",
    orderId: "ORD-1010",
    customer: "Varun Joshi",
    email: "varun@example.com",
    phone: "+91 93412 56780",
    address: "Ameerpet, Hyderabad",
    items: [
      { name: "Wheat Flour 5kg", quantity: 1, price: 280 },
      { name: "Sugar 1kg", quantity: 2, price: 55 },
    ],
    amount: 390,
    payment: "Paid",
    paymentMethod: "Cash on Delivery",
    status: "Pending",
    orderDate: "2026-10-08",
    orderTime: "01:10 PM",
    deliveryPerson: "Not Assigned",
    deliveryProgress: 15,
  },
];

/* =========================================================
   STATUS COLORS
========================================================= */

const statusColors = {
  Pending: "gold",
  Processing: "blue",
  "Out for Delivery": "purple",
  Delivered: "green",
  Cancelled: "red",
};

const paymentColors = {
  Paid: "green",
  Pending: "gold",
  Failed: "red",
};

/* =========================================================
   ORDERS COMPONENT
========================================================= */

const Orders = () => {
  
  // Orders received from the backend API.
  const [orders, setOrders] = useState([]);

  // Loading and error states for the API request.
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Fetch orders when the page first loads.
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setLoadError("");

        const response = await fetch(
          "http://localhost:5000/api/orders"
        );

        if (!response.ok) {
          throw new Error("Unable to load orders from the server.");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to load orders.");
        }

        setOrders(data.orders);
      } catch (error) {
        console.error("Orders API error:", error);
        setLoadError(error.message || "Unable to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  // Search text.
  const [searchText, setSearchText] = useState("");

  // Selected order status.
  const [statusFilter, setStatusFilter] = useState("all");

  // Selected payment status.
  const [paymentFilter, setPaymentFilter] = useState("all");

  // Currently selected order for the details drawer.
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Controls whether the drawer is visible.
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* =======================================================
     CALCULATE DASHBOARD STATISTICS
  ======================================================= */

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const processingOrders = orders.filter(
    (order) => order.status === "Processing"
  ).length;

  const outForDeliveryOrders = orders.filter(
    (order) => order.status === "Out for Delivery"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const totalRevenue = orders
    .filter((order) => order.payment === "Paid")
    .reduce((total, order) => total + order.amount, 0);

  /* =======================================================
     FILTER ORDERS
     
     useMemo prevents unnecessary recalculation.
  ======================================================= */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search by order ID or customer name.
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchText.toLowerCase());

      // Filter by order status.
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      // Filter by payment status.
      const matchesPayment =
        paymentFilter === "all" || order.payment === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, searchText, statusFilter, paymentFilter]);

  /* =======================================================
     OPEN ORDER DETAILS
  ======================================================= */

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };
  const handleUpdateOrderStatus = async (newStatus) => {
  if (!selectedOrder?.id) {
    message.error("Database order ID is missing.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/${selectedOrder.id}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_status: newStatus }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Status update failed.");
    }

    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        Number(order.id) === Number(selectedOrder.id)
          ? { ...order, status: newStatus }
          : order
      )
    );

    setSelectedOrder((previousOrder) => ({
      ...previousOrder,
      status: newStatus,
    }));

    message.success("Order status saved successfully.");
  } catch (error) {
    message.error(error.message || "Unable to update order.");
  }
};

  /* =======================================================
     TABLE COLUMNS
  ======================================================= */

  const columns = [
    {
      title: "Order",
      dataIndex: "orderId",
      key: "orderId",

      render: (orderId) => (
        <div>
          <Text
            strong
            style={{
              color: "#f8fafc",
              fontSize: 14,
            }}
          >
            {orderId}
          </Text>

          <div>
            <Text
              style={{
                color: "#64748b",
                fontSize: 12,
              }}
            >
              QuickKart Order
            </Text>
          </div>
        </div>
      ),
    },

    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",

      render: (customer) => (
        <Space>
          <Avatar
            size={34}
            style={{
              background: "#8b5cf6",
              color: "#ffffff",
            }}
          >
            {customer.charAt(0)}
          </Avatar>

          <div>
            <Text
              style={{
                color: "#f8fafc",
                fontWeight: 500,
              }}
            >
              {customer}
            </Text>

            <div>
              <Text
                style={{
                  color: "#64748b",
                  fontSize: 12,
                }}
              >
                Customer
              </Text>
            </div>
          </div>
        </Space>
      ),
    },

    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",

      render: (date, record) => (
        <div>
          <Text style={{ color: "#f8fafc" }}>{date}</Text>

          <div>
            <Text
              style={{
                color: "#64748b",
                fontSize: 12,
              }}
            >
              {record.orderTime}
            </Text>
          </div>
        </div>
      ),
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",

      render: (amount) => (
        <Text
          strong
          style={{
            color: "#f8fafc",
            fontSize: 14,
          }}
        >
          ₹{amount.toLocaleString("en-IN")}
        </Text>
      ),
    },

    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",

      render: (payment, record) => (
        <div>
          <Tag color={paymentColors[payment]}>{payment}</Tag>

          <div style={{ marginTop: 4 }}>
            <Text
              style={{
                color: "#64748b",
                fontSize: 11,
              }}
            >
              {record.paymentMethod}
            </Text>
          </div>
        </div>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <Tag
          color={statusColors[status]}
          style={{
            borderRadius: 20,
            padding: "3px 10px",
          }}
        >
          {status}
        </Tag>
      ),
    },

    {
      title: "Action",
      key: "action",

      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => handleViewOrder(record)}
          style={{
            color: "#a78bfa",
            fontWeight: 500,
          }}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      {/* ===================================================
          PAGE HEADER
      =================================================== */}

      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <Title
            level={2}
            style={{
              margin: 0,
              color: "#f8fafc",
              fontSize: 28,
            }}
          >
            Orders
          </Title>

          <Text
            style={{
              color: "#94a3b8",
              fontSize: 14,
            }}
          >
            Track and manage all QuickKart customer orders.
          </Text>
        </div>

        <Badge
          count={`${totalOrders} Orders`}
          style={{
            backgroundColor: "#8b5cf6",
            padding: "0 12px",
            boxShadow: "none",
          }}
        />
      </div>

      {/* ===================================================
          STATISTICS CARDS
      =================================================== */}

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* Total Orders */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "#1c1f29",
              border: "1px solid #2a2e3a",
              borderRadius: 16,
            }}
          >
            <Statistic
              title={
                <span style={{ color: "#94a3b8" }}>Total Orders</span>
              }
              value={totalOrders}
              prefix={
                <ShoppingCartOutlined
                  style={{ color: "#8b5cf6" }}
                />
              }
              valueStyle={{
                color: "#f8fafc",
                fontWeight: 700,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 12,
              }}
            >
              All customer orders
            </Text>
          </Card>
        </Col>

        {/* Revenue */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "#1c1f29",
              border: "1px solid #2a2e3a",
              borderRadius: 16,
            }}
          >
            <Statistic
              title={
                <span style={{ color: "#94a3b8" }}>Revenue</span>
              }
              value={totalRevenue}
              prefix="₹"
              valueStyle={{
                color: "#22c55e",
                fontWeight: 700,
              }}
              precision={0}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 12,
              }}
            >
              From paid orders
            </Text>
          </Card>
        </Col>

        {/* Processing */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "#1c1f29",
              border: "1px solid #2a2e3a",
              borderRadius: 16,
            }}
          >
            <Statistic
              title={
                <span style={{ color: "#94a3b8" }}>Processing</span>
              }
              value={processingOrders}
              prefix={
                <ClockCircleOutlined
                  style={{ color: "#3b82f6" }}
                />
              }
              valueStyle={{
                color: "#f8fafc",
                fontWeight: 700,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 12,
              }}
            >
              Being prepared
            </Text>
          </Card>
        </Col>

        {/* Delivered */}
        <Col xs={24} sm={12} lg={6}>
          <Card
            bordered={false}
            style={{
              background: "#1c1f29",
              border: "1px solid #2a2e3a",
              borderRadius: 16,
            }}
          >
            <Statistic
              title={
                <span style={{ color: "#94a3b8" }}>Delivered</span>
              }
              value={deliveredOrders}
              prefix={
                <CheckCircleOutlined
                  style={{ color: "#22c55e" }}
                />
              }
              valueStyle={{
                color: "#f8fafc",
                fontWeight: 700,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 12,
              }}
            >
              Successfully completed
            </Text>
          </Card>
        </Col>
      </Row>

      {/* ===================================================
          ORDER OVERVIEW
      =================================================== */}

      <Card
        bordered={false}
        style={{
          background: "#1c1f29",
          border: "1px solid #2a2e3a",
          borderRadius: 16,
          marginBottom: 24,
        }}
      >
        <Row gutter={[24, 20]} align="middle">
          {/* Delivery progress */}
          <Col xs={24} md={14}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text
                strong
                style={{
                  color: "#f8fafc",
                }}
              >
                Today's Delivery Progress
              </Text>

              <Text
                style={{
                  color: "#94a3b8",
                }}
              >
                {deliveredOrders} of {totalOrders} completed
              </Text>
            </div>

            
        <Progress
          percent={
            totalOrders === 0
              ? 0
              : Math.round((deliveredOrders / totalOrders) * 100)
          }
          strokeColor="#8b5cf6"
          trailColor="#2a2e3a"
        />

          </Col>

          {/* Small status summary */}
          <Col xs={24} md={10}>
            <Space
              size={20}
              wrap
              style={{
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div>
                <TruckOutlined
                  style={{
                    color: "#a78bfa",
                    marginRight: 6,
                  }}
                />

                <Text style={{ color: "#94a3b8" }}>
                  Out for delivery:{" "}
                </Text>

                <Text
                  strong
                  style={{ color: "#f8fafc" }}
                >
                  {outForDeliveryOrders}
                </Text>
              </div>

              <div>
                <CloseCircleOutlined
                  style={{
                    color: "#ef4444",
                    marginRight: 6,
                  }}
                />

                <Text style={{ color: "#94a3b8" }}>
                  Cancelled:{" "}
                </Text>

                <Text
                  strong
                  style={{ color: "#f8fafc" }}
                >
                  {cancelledOrders}
                </Text>
              </div>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* ===================================================
          FILTERS
      =================================================== */}

      <Card
        bordered={false}
        style={{
          background: "#1c1f29",
          border: "1px solid #2a2e3a",
          borderRadius: 16,
          marginBottom: 24,
        }}
      >
        <Row gutter={[12, 12]}>
          {/* Search */}
          <Col xs={24} md={8}>
            <Input
              size="large"
              allowClear
              prefix={
                <SearchOutlined
                  style={{ color: "#64748b" }}
                />
              }
              placeholder="Search order ID or customer..."
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
            />
          </Col>

          {/* Status */}
          <Col xs={24} sm={12} md={5}>
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: "100%" }}
              options={[
                {
                  value: "all",
                  label: "All Status",
                },
                {
                  value: "Pending",
                  label: "Pending",
                },
                {
                  value: "Processing",
                  label: "Processing",
                },
                {
                  value: "Out for Delivery",
                  label: "Out for Delivery",
                },
                {
                  value: "Delivered",
                  label: "Delivered",
                },
                {
                  value: "Cancelled",
                  label: "Cancelled",
                },
              ]}
            />
          </Col>

          {/* Payment */}
          <Col xs={24} sm={12} md={5}>
            <Select
              size="large"
              value={paymentFilter}
              onChange={setPaymentFilter}
              style={{ width: "100%" }}
              options={[
                {
                  value: "all",
                  label: "All Payments",
                },
                {
                  value: "Paid",
                  label: "Paid",
                },
                {
                  value: "Pending",
                  label: "Pending",
                },
                {
                  value: "Failed",
                  label: "Failed",
                },
              ]}
            />
          </Col>

          {/* Date Picker */}
          <Col xs={24} md={6}>
            <RangePicker
              size="large"
              style={{ width: "100%" }}
              suffixIcon={
                <CalendarOutlined
                  style={{ color: "#64748b" }}
                />
              }
            />
          </Col>
        </Row>
      </Card>

      {/* ===================================================
          ORDERS TABLE
      =================================================== */}

      <Card
        bordered={false}
        style={{
          background: "#1c1f29",
          border: "1px solid #2a2e3a",
          borderRadius: 16,
        }}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #2a2e3a",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div>
              <Title
                level={4}
                style={{
                  color: "#f8fafc",
                  margin: 0,
                }}
              >
                Recent Orders
              </Title>

              <Text
                style={{
                  color: "#64748b",
                  fontSize: 13,
                }}
              >
                {filteredOrders.length} orders found
              </Text>
            </div>

            <Button
              icon={<InboxOutlined />}
              style={{
                background: "#242835",
                borderColor: "#343947",
                color: "#f8fafc",
              }}
            >
              Export Orders
            </Button>
          </div>
        </div>

        {loadError && (
  <div
    style={{
      padding: 16,
      color: "#ff7875",
      background: "#2a1c22",
    }}
  >
    {loadError}
  </div>
)}
        <Table
          loading={loading}
          columns={columns}
          dataSource={filteredOrders}
          rowKey="orderId"
          scroll={{ x: 1050 }}
          pagination={{
            pageSize: 7,
            showSizeChanger: true,
            pageSizeOptions: [5, 7, 10, 20],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} orders`,
          }}
        />
      </Card>

      {/* ===================================================
          ORDER DETAILS DRAWER
      =================================================== */}

      <Drawer
        title={
          selectedOrder ? (
            <div>
              <Text
                strong
                style={{
                  color: "#f8fafc",
                  fontSize: 18,
                }}
              >
                Order {selectedOrder.orderId}
              </Text>

              <div>
                <Text
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                  }}
                >
                  Order details and delivery information
                </Text>
              </div>
            </div>
          ) : (
            "Order Details"
          )
        }
        placement="right"
        size="large"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        styles={{
          header: {
            background: "#171922",
            borderBottom: "1px solid #2a2e3a",
          },
          body: {
            background: "#111318",
            padding: 24,
          },
        }}
      >
        {selectedOrder && (
          <div>
            {/* Order status */}
            <div
              style={{
                background: "#1c1f29",
                border: "1px solid #2a2e3a",
                borderRadius: 14,
                padding: 18,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <Text
                  strong
                  style={{
                    color: "#f8fafc",
                    fontSize: 16,
                  }}
                >
                  Current Status
                </Text>

                <Tag
                  color={statusColors[selectedOrder.status]}
                  style={{
                    borderRadius: 20,
                    padding: "3px 12px",
                  }}
                >
                  {selectedOrder.status}
                </Tag>
                <Select
                value={selectedOrder.status}
                onChange={handleUpdateOrderStatus}
                style={{ width: 180 }}
                options={[
                  { value: "Pending", label: "Pending" },
                  { value: "Processing", label: "Processing" },
                  { value: "Shipped", label: "Shipped" },
                  { value: "Delivered", label: "Delivered" },
                  { value: "Cancelled", label: "Cancelled" },
                ]}
              />
              </div>

              <Progress
                percent={selectedOrder.deliveryProgress}
                strokeColor="#8b5cf6"
                trailColor="#2a2e3a"
              />

              <Text
                style={{
                  color: "#64748b",
                  fontSize: 12,
                }}
              >
                Delivery progress
              </Text>
            </div>

            {/* Customer information */}
            <div
              style={{
                background: "#1c1f29",
                border: "1px solid #2a2e3a",
                borderRadius: 14,
                padding: 18,
                marginBottom: 20,
              }}
            >
              <Title
                level={5}
                style={{
                  color: "#f8fafc",
                  marginTop: 0,
                }}
              >
                Customer Information
              </Title>

              <Space
                align="start"
                style={{
                  marginBottom: 16,
                }}
              >
                <Avatar
                  size={48}
                  style={{
                    background: "#8b5cf6",
                  }}
                >
                  {selectedOrder.customer.charAt(0)}
                </Avatar>

                <div>
                  <Text
                    strong
                    style={{
                      color: "#f8fafc",
                      fontSize: 15,
                    }}
                  >
                    {selectedOrder.customer}
                  </Text>

                  <div>
                    <Text
                      style={{
                        color: "#94a3b8",
                        fontSize: 13,
                      }}
                    >
                      {selectedOrder.email}
                    </Text>
                  </div>

                  <div>
                    <Text
                      style={{
                        color: "#64748b",
                        fontSize: 12,
                      }}
                    >
                      {selectedOrder.phone}
                    </Text>
                  </div>
                </div>
              </Space>

              <Descriptions
                column={1}
                size="small"
                items={[
                  {
                    key: "address",
                    label: "Delivery Address",
                    children: selectedOrder.address,
                  },
                  {
                    key: "delivery",
                    label: "Delivery Partner",
                    children:
                      selectedOrder.deliveryPerson,
                  },
                ]}
                labelStyle={{
                  color: "#64748b",
                }}
                contentStyle={{
                  color: "#f8fafc",
                }}
              />
            </div>

            {/* Ordered items */}
            <div
              style={{
                background: "#1c1f29",
                border: "1px solid #2a2e3a",
                borderRadius: 14,
                padding: 18,
                marginBottom: 20,
              }}
            >
              <Title
                level={5}
                style={{
                  color: "#f8fafc",
                  marginTop: 0,
                }}
              >
                Ordered Items
              </Title>

              {selectedOrder.items.map((item, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "12px 0",
                    }}
                  >
                    <div>
                      <Text
                        style={{
                          color: "#f8fafc",
                          fontWeight: 500,
                        }}
                      >
                        {item.name}
                      </Text>

                      <div>
                        <Text
                          style={{
                            color: "#64748b",
                            fontSize: 12,
                          }}
                        >
                          Quantity: {item.quantity}
                        </Text>
                      </div>
                    </div>

                    <Text
                      strong
                      style={{
                        color: "#f8fafc",
                      }}
                    >
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </Text>
                  </div>

                  {index <
                    selectedOrder.items.length - 1 && (
                    <Divider
                      style={{
                        margin: 0,
                        borderColor: "#2a2e3a",
                      }}
                    />
                  )}
                </div>
              ))}

              <Divider
                style={{
                  borderColor: "#343947",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  strong
                  style={{
                    color: "#f8fafc",
                    fontSize: 16,
                  }}
                >
                  Total Amount
                </Text>

                <Text
                  strong
                  style={{
                    color: "#a78bfa",
                    fontSize: 18,
                  }}
                >
                  ₹
                  {selectedOrder.amount.toLocaleString(
                    "en-IN"
                  )}
                </Text>
              </div>
            </div>

            {/* Payment details */}
            <div
              style={{
                background: "#1c1f29",
                border: "1px solid #2a2e3a",
                borderRadius: 14,
                padding: 18,
              }}
            >
              <Title
                level={5}
                style={{
                  color: "#f8fafc",
                  marginTop: 0,
                }}
              >
                Payment Information
              </Title>

              <Descriptions
                column={1}
                size="small"
                items={[
                  {
                    key: "payment-status",
                    label: "Payment Status",
                    children: (
                      <Tag
                        color={
                          paymentColors[
                            selectedOrder.payment
                          ]
                        }
                      >
                        {selectedOrder.payment}
                      </Tag>
                    ),
                  },
                  {
                    key: "payment-method",
                    label: "Payment Method",
                    children:
                      selectedOrder.paymentMethod,
                  },
                  {
                    key: "order-date",
                    label: "Order Date",
                    children: `${selectedOrder.orderDate} ${selectedOrder.orderTime}`,
                  },
                ]}
                labelStyle={{
                  color: "#64748b",
                }}
                contentStyle={{
                  color: "#f8fafc",
                }}
              />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Orders;