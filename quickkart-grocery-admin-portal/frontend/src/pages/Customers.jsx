// Customers.jsx
// QuickKart Grocery Admin Portal
// Customer Management Page

import React, { useEffect, useMemo, useState } from "react";

import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Drawer,
  Input,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Form,
  Modal,
  message,
  Typography,
} from "antd";

import {
  CheckCircleOutlined,
  CrownOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

/* =========================================================
   MOCK CUSTOMER DATA
   ---------------------------------------------------------
   This is frontend mock data.
   Later this can be replaced with an Express API.
========================================================= */

const initialCustomers = [
  {
    key: "CUS-001",
    id: "CUS-001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Madhapur, Hyderabad",
    status: "Active",
    orders: 24,
    totalSpent: 12450,
    lastOrder: "2026-10-07",
    joinedDate: "2026-02-15",
    favoriteCategory: "Dairy",
    membership: "Premium",
  },

  {
    key: "CUS-002",
    id: "CUS-002",
    name: "Priya Reddy",
    email: "priya.reddy@example.com",
    phone: "+91 91234 56789",
    location: "Kondapur, Hyderabad",
    status: "Active",
    orders: 31,
    totalSpent: 18760,
    lastOrder: "2026-10-08",
    joinedDate: "2026-01-20",
    favoriteCategory: "Groceries",
    membership: "Premium",
  },

  {
    key: "CUS-003",
    id: "CUS-003",
    name: "Ananya Das",
    email: "ananya.das@example.com",
    phone: "+91 99887 66554",
    location: "Gachibowli, Hyderabad",
    status: "Active",
    orders: 18,
    totalSpent: 9320,
    lastOrder: "2026-10-08",
    joinedDate: "2026-03-11",
    favoriteCategory: "Snacks",
    membership: "Standard",
  },

  {
    key: "CUS-004",
    id: "CUS-004",
    name: "Arjun Mehta",
    email: "arjun.mehta@example.com",
    phone: "+91 90123 45678",
    location: "Jubilee Hills, Hyderabad",
    status: "Inactive",
    orders: 7,
    totalSpent: 3480,
    lastOrder: "2026-08-21",
    joinedDate: "2026-04-18",
    favoriteCategory: "Beverages",
    membership: "Standard",
  },

  {
    key: "CUS-005",
    id: "CUS-005",
    name: "Sneha Patel",
    email: "sneha.patel@example.com",
    phone: "+91 93456 78901",
    location: "Banjara Hills, Hyderabad",
    status: "Active",
    orders: 42,
    totalSpent: 24580,
    lastOrder: "2026-10-06",
    joinedDate: "2025-12-10",
    favoriteCategory: "Fresh Produce",
    membership: "Premium",
  },

  {
    key: "CUS-006",
    id: "CUS-006",
    name: "Kiran Rao",
    email: "kiran.rao@example.com",
    phone: "+91 98712 34567",
    location: "Hitech City, Hyderabad",
    status: "Active",
    orders: 15,
    totalSpent: 7890,
    lastOrder: "2026-10-08",
    joinedDate: "2026-05-02",
    favoriteCategory: "Meat & Eggs",
    membership: "Standard",
  },

  {
    key: "CUS-007",
    id: "CUS-007",
    name: "Neha Kapoor",
    email: "neha.kapoor@example.com",
    phone: "+91 97654 32109",
    location: "Manikonda, Hyderabad",
    status: "Active",
    orders: 27,
    totalSpent: 13950,
    lastOrder: "2026-10-08",
    joinedDate: "2026-02-28",
    favoriteCategory: "Organic",
    membership: "Premium",
  },

  {
    key: "CUS-008",
    id: "CUS-008",
    name: "Rohit Verma",
    email: "rohit.verma@example.com",
    phone: "+91 96543 21098",
    location: "Begumpet, Hyderabad",
    status: "Inactive",
    orders: 5,
    totalSpent: 2150,
    lastOrder: "2026-07-15",
    joinedDate: "2026-06-12",
    favoriteCategory: "Snacks",
    membership: "Standard",
  },

  {
    key: "CUS-009",
    id: "CUS-009",
    name: "Pooja Singh",
    email: "pooja.singh@example.com",
    phone: "+91 92345 67890",
    location: "Kukatpally, Hyderabad",
    status: "Active",
    orders: 36,
    totalSpent: 19840,
    lastOrder: "2026-10-05",
    joinedDate: "2026-01-05",
    favoriteCategory: "Fruits",
    membership: "Premium",
  },

  {
    key: "CUS-010",
    id: "CUS-010",
    name: "Varun Joshi",
    email: "varun.joshi@example.com",
    phone: "+91 93412 56780",
    location: "Ameerpet, Hyderabad",
    status: "Active",
    orders: 12,
    totalSpent: 5640,
    lastOrder: "2026-10-08",
    joinedDate: "2026-05-22",
    favoriteCategory: "Staples",
    membership: "Standard",
  },

  {
    key: "CUS-011",
    id: "CUS-011",
    name: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 94567 81234",
    location: "Secunderabad, Hyderabad",
    status: "Active",
    orders: 21,
    totalSpent: 11200,
    lastOrder: "2026-10-06",
    joinedDate: "2026-03-30",
    favoriteCategory: "Dairy",
    membership: "Standard",
  },

  {
    key: "CUS-012",
    id: "CUS-012",
    name: "Aditya Kumar",
    email: "aditya.kumar@example.com",
    phone: "+91 95678 12345",
    location: "Miyapur, Hyderabad",
    status: "Inactive",
    orders: 9,
    totalSpent: 4210,
    lastOrder: "2026-08-02",
    joinedDate: "2026-04-05",
    favoriteCategory: "Beverages",
    membership: "Standard",
  },
];

/* =========================================================
   CUSTOMER STATUS COLORS
========================================================= */

const customerStatusColors = {
  Active: "green",
  Inactive: "default",
};

/* =========================================================
   MEMBERSHIP COLORS
========================================================= */

const membershipColors = {
  Premium: "purple",
  Standard: "blue",
};

/* =========================================================
   CUSTOMERS COMPONENT
========================================================= */

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [savingCustomer, setSavingCustomer] = useState(false);
  const [customerForm] = Form.useForm();

  // Controls the Edit Customer modal.
const [editModalOpen, setEditModalOpen] = useState(false);

// Tracks the customer currently being edited.
const [editingCustomer, setEditingCustomer] = useState(null);

// Tracks the edit form's submission state.
const [updatingCustomer, setUpdatingCustomer] = useState(false);

// Separate form instance so editing does not affect Add Customer.
const [editCustomerForm] = Form.useForm();

  const handleAddCustomer = async (values) => {
  try {
    setSavingCustomer(true);

    const response = await fetch("http://localhost:5000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to add customer.");
    }

    message.success("Customer added successfully!");

    setAddModalOpen(false);
    customerForm.resetFields();

    // Reload customers so the new record appears in the table.
    const refreshResponse = await fetch("http://localhost:5000/api/customers");
    const refreshData = await refreshResponse.json();

    if (!refreshResponse.ok || !refreshData.success) {
      throw new Error("Customer was saved, but the table could not refresh.");
    }

    setCustomers(refreshData.customers);
  } catch (error) {
    message.error(error.message || "Unable to add customer.");
  } finally {
    setSavingCustomer(false);
  }
};

// Open the Edit Customer modal and fill it with existing details.
const handleOpenEditCustomer = (customer) => {
  setEditingCustomer(customer);

  editCustomerForm.setFieldsValue({
    name: customer.name ?? "",
    email: customer.email ?? "",
    phone: customer.phone ?? "",
    location: customer.location ?? "",
    membership: customer.membership ?? "Standard",
  });

  setEditModalOpen(true);
};

// Save the edited customer to PostgreSQL.
const handleUpdateCustomer = async (values) => {
  if (!editingCustomer?.dbId) {
    message.error("Customer ID is missing.");
    return;
  }

  try {
    setUpdatingCustomer(true);

    const response = await fetch(
      `http://localhost:5000/api/customers/${editingCustomer.dbId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to update customer."
      );
    }

    const refreshResponse = await fetch(
      "http://localhost:5000/api/customers"
    );

    const refreshData = await refreshResponse.json();

    if (!refreshResponse.ok || !refreshData.success) {
      throw new Error(
        "Customer updated, but the table could not refresh."
      );
    }

    setCustomers(refreshData.customers);
    setEditModalOpen(false);
    setEditingCustomer(null);
    editCustomerForm.resetFields();

    message.success("Customer updated successfully!");
  } catch (error) {
    message.error(
      error.message || "Unable to update customer."
    );
  } finally {
    setUpdatingCustomer(false);
  }
};


const handleUpdateCustomerStatus = async (customer, newStatus) => {
  // Use the real PostgreSQL ID, not the display ID such as CUS-001.
  if (!customer?.dbId) {
    message.error("Customer database ID is missing.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:5000/api/customers/${customer.dbId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to update status.");
    }

    // Reload customers so the table displays the saved status.
    const refreshResponse = await fetch(
      "http://localhost:5000/api/customers"
    );
    const refreshData = await refreshResponse.json();

    if (!refreshResponse.ok || !refreshData.success) {
      throw new Error("Status updated, but the table could not refresh.");
    }

    setCustomers(refreshData.customers);
    message.success("Customer status updated successfully!");
  } catch (error) {
    message.error(error.message || "Unable to update customer status.");
  }
};


const handleDeleteCustomer = (customer) => {
  Modal.confirm({
    title: "Delete Customer?",
    content: `Are you sure you want to delete ${customer.name}? This action cannot be undone.`,
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",

    onOk: async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/customers/${customer.dbId}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to delete customer."
          );
        }

        // Remove the deleted customer from the displayed table.
        setCustomers((previousCustomers) =>
          previousCustomers.filter(
            (item) => item.dbId !== customer.dbId
          )
        );

        // Close the details drawer if it shows the deleted customer.
        if (selectedCustomer?.dbId === customer.dbId) {
          setDrawerOpen(false);
          setSelectedCustomer(null);
        }

        message.success("Customer deleted successfully!");
      } catch (error) {
        message.error(
          error.message || "Unable to delete customer."
        );
      }
    },
  });
};
  

  useEffect(() => {
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setLoadError("");

      const response = await fetch(
        "http://localhost:5000/api/customers"
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load customers.");
      }

      setCustomers(data.customers);
    } catch (error) {
      setLoadError(error.message || "Unable to load customers.");
    } finally {
      setLoading(false);
    }
  };

  fetchCustomers();
}, []);
  // Search field.
  const [searchText, setSearchText] = useState("");

  // Customer status filter.
  const [statusFilter, setStatusFilter] = useState("all");

  // Membership filter.
  const [membershipFilter, setMembershipFilter] =
    useState("all");

  // Selected customer.
  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  // Drawer visibility.
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* =========================================================
     CUSTOMER STATISTICS
  ========================================================= */

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const premiumCustomers = customers.filter(
    (customer) => customer.membership === "Premium"
  ).length;

  // Calculate total amount spent by all customers.
  const totalCustomerSpend = customers.reduce(
    (total, customer) => total + customer.totalSpent,
    0
  );

  // Calculate total number of orders.
  const totalCustomerOrders = customers.reduce(
    (total, customer) => total + customer.orders,
    0
  );

  /* =========================================================
     FILTER CUSTOMERS
  ========================================================= */

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      // Search by name, email or customer ID.
      const matchesSearch =
        customer.name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        customer.id
          .toLowerCase()
          .includes(searchText.toLowerCase());

      // Status filter.
      const matchesStatus =
        statusFilter === "all" ||
        customer.status === statusFilter;

      // Membership filter.
      const matchesMembership =
        membershipFilter === "all" ||
        customer.membership === membershipFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMembership
      );
    });
  }, [
    customers,
    searchText,
    statusFilter,
    membershipFilter,
  ]);

  /* =========================================================
     OPEN CUSTOMER DETAILS
  ========================================================= */

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  
  // Export the filtered customer list to a CSV file.
  const handleExportCustomers = () => {
    if (filteredCustomers.length === 0) {
      message.warning("No customers available to export.");
      return;
    }

    const headers = [
      "Customer ID",
      "Name",
      "Email",
      "Phone",
      "Location",
      "Orders",
      "Total Spent",
      "Membership",
      "Status",
      "Joined Date",
      "Last Order",
    ];

    const escapeCSV = (value) => {
      const text = String(value ?? "");
      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = filteredCustomers.map((customer) => [
      customer.id,
      customer.name,
      customer.email,
      customer.phone,
      customer.location,
      customer.orders,
      customer.totalSpent,
      customer.membership,
      customer.status,
      customer.joinedDate,
      customer.lastOrder,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "quickkart-customers.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    message.success("Customers exported successfully.");
  };

  /* =========================================================
     TABLE COLUMNS
  ========================================================= */

  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",

      render: (name, record) => (
        <Space>
          {/* Customer avatar */}
          <Avatar
            size={40}
            style={{
              background: "#8b5cf6",
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            {name.charAt(0)}
          </Avatar>

          <div>
            <Text
              strong
              style={{
                color: "#f8fafc",
                fontSize: 14,
              }}
            >
              {name}
            </Text>

            <div>
              <Text
                style={{
                  color: "#64748b",
                  fontSize: 12,
                }}
              >
                {record.id}
              </Text>
            </div>
          </div>
        </Space>
      ),
    },

    {
      title: "Contact",
      key: "contact",

      render: (_, record) => (
        <div>
          <div>
            <MailOutlined
              style={{
                color: "#64748b",
                marginRight: 6,
              }}
            />

            <Text
              style={{
                color: "#94a3b8",
                fontSize: 12,
              }}
            >
              {record.email}
            </Text>
          </div>

          <div style={{ marginTop: 4 }}>
            <PhoneOutlined
              style={{
                color: "#64748b",
                marginRight: 6,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 12,
              }}
            >
              {record.phone}
            </Text>
          </div>
        </div>
      ),
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",

      render: (location) => (
        <Text
          style={{
            color: "#94a3b8",
          }}
        >
          {location}
        </Text>
      ),
    },

    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",

      render: (orders) => (
        <div>
          <Text
            strong
            style={{
              color: "#f8fafc",
              fontSize: 15,
            }}
          >
            {orders}
          </Text>

          <div>
            <Text
              style={{
                color: "#64748b",
                fontSize: 11,
              }}
            >
              orders
            </Text>
          </div>
        </div>
      ),
    },

    {
      title: "Total Spent",
      dataIndex: "totalSpent",
      key: "totalSpent",

      render: (amount) => (
        <Text
          strong
          style={{
            color: "#22c55e",
          }}
        >
          ₹{amount.toLocaleString("en-IN")}
        </Text>
      ),
    },

    {
      title: "Membership",
      dataIndex: "membership",
      key: "membership",

      render: (membership) => (
        <Tag
          color={membershipColors[membership]}
          icon={
            membership === "Premium" ? (
              <CrownOutlined />
            ) : null
          }
          style={{
            borderRadius: 20,
            padding: "3px 10px",
          }}
        >
          {membership}
        </Tag>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status) => (
        <Tag
          color={customerStatusColors[status]}
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
  title: "Actions",
  key: "actions",
  render: (_, record) => (
    <Space size={8}>
      {/* Existing View button */}
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => handleViewCustomer(record)}
        style={{
          color: "#a78bfa",
          fontWeight: 500,
        }}
      >
        View
      </Button>

      {/* New Edit button */}
      <Button
        type="text"
        onClick={() => handleOpenEditCustomer(record)}
        style={{
          color: "#38bdf8",
          fontWeight: 500,
        }}
      >
        Edit
      </Button>

      
      <Button
        type="text"
        danger
        onClick={() => handleDeleteCustomer(record)}
      >
        Delete
      </Button>

    </Space>
    ),
   },
  ];

  return (
    <div>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

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
            Customers
          </Title>

          <Text
            style={{
              color: "#94a3b8",
              fontSize: 14,
            }}
          >
            Manage and monitor QuickKart customers.
          </Text>
        </div>

        
        <Space size={12} wrap>
          <Button
            type="primary"
            onClick={() => setAddModalOpen(true)}
            style={{
              background: "#8b5cf6",
              borderColor: "#8b5cf6",
            }}
          >
            Add Customer
          </Button>

          <Badge
            count={`${totalCustomers} Customers`}
            style={{
              backgroundColor: "#8b5cf6",
              padding: "0 12px",
              boxShadow: "none",
            }}
          />
        </Space>

      </div>

      {/* =====================================================
          STATISTICS CARDS
      ===================================================== */}

      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 24,
        }}
      >
        {/* Total Customers */}
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
                <span style={{ color: "#94a3b8" }}>
                  Total Customers
                </span>
              }
              value={totalCustomers}
              prefix={
                <TeamOutlined
                  style={{
                    color: "#8b5cf6",
                  }}
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
              Registered customers
            </Text>
          </Card>
        </Col>

        {/* Active Customers */}
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
                <span style={{ color: "#94a3b8" }}>
                  Active Customers
                </span>
              }
              value={activeCustomers}
              prefix={
                <CheckCircleOutlined
                  style={{
                    color: "#22c55e",
                  }}
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
              Currently active
            </Text>
          </Card>
        </Col>

        {/* Premium Customers */}
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
                <span style={{ color: "#94a3b8" }}>
                  Premium Customers
                </span>
              }
              value={premiumCustomers}
              prefix={
                <CrownOutlined
                  style={{
                    color: "#a78bfa",
                  }}
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
              Premium members
            </Text>
          </Card>
        </Col>

        {/* Customer Revenue */}
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
                <span style={{ color: "#94a3b8" }}>
                  Customer Spend
                </span>
              }
              value={totalCustomerSpend}
              prefix="₹"
              valueStyle={{
                color: "#22c55e",
                fontWeight: 700,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 12,
              }}
            >
              Total customer spending
            </Text>
          </Card>
        </Col>
      </Row>

      {/* =====================================================
          CUSTOMER INSIGHTS
      ===================================================== */}

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
          {/* Average orders */}
          <Col xs={24} md={8}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "#242835",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ShoppingCartOutlined
                  style={{
                    color: "#8b5cf6",
                    fontSize: 21,
                  }}
                />
              </div>

              <div>
                <Text
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                  }}
                >
                  Average Orders / Customer
                </Text>

                <div>
                  <Text
                    strong
                    style={{
                      color: "#f8fafc",
                      fontSize: 20,
                    }}
                  >
                    {(
                      totalCustomerOrders /
                      totalCustomers
                    ).toFixed(1)}
                  </Text>
                </div>
              </div>
            </div>
          </Col>

          {/* Active percentage */}
          <Col xs={24} md={8}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  Active Customer Rate
                </Text>

                <Text
                  strong
                  style={{
                    color: "#f8fafc",
                  }}
                >
                  {Math.round(
                    (activeCustomers /
                      totalCustomers) *
                      100
                  )}
                  %
                </Text>
              </div>

              <Progress
                percent={Math.round(
                  (activeCustomers /
                    totalCustomers) *
                    100
                )}
                strokeColor="#22c55e"
                trailColor="#2a2e3a"
                showInfo={false}
              />
            </div>
          </Col>

          {/* Inactive */}
          <Col xs={24} md={8}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: "#242835",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <UserOutlined
                  style={{
                    color: "#f59e0b",
                    fontSize: 21,
                  }}
                />
              </div>

              <div>
                <Text
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                  }}
                >
                  Inactive Customers
                </Text>

                <div>
                  <Text
                    strong
                    style={{
                      color: "#f8fafc",
                      fontSize: 20,
                    }}
                  >
                    {inactiveCustomers}
                  </Text>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* =====================================================
          FILTERS
      ===================================================== */}

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
          <Col xs={24} md={10}>
            <Input
              size="large"
              allowClear
              prefix={
                <SearchOutlined
                  style={{
                    color: "#64748b",
                  }}
                />
              }
              placeholder="Search customer, email or ID..."
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
            />
          </Col>

          {/* Status */}
          <Col xs={24} sm={12} md={7}>
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "all",
                  label: "All Status",
                },
                {
                  value: "Active",
                  label: "Active",
                },
                {
                  value: "Inactive",
                  label: "Inactive",
                },
              ]}
            />
          </Col>

          {/* Membership */}
          <Col xs={24} sm={12} md={7}>
            <Select
              size="large"
              value={membershipFilter}
              onChange={setMembershipFilter}
              style={{
                width: "100%",
              }}
              options={[
                {
                  value: "all",
                  label: "All Memberships",
                },
                {
                  value: "Premium",
                  label: "Premium",
                },
                {
                  value: "Standard",
                  label: "Standard",
                },
              ]}
            />
          </Col>
        </Row>
      </Card>

      {/* =====================================================
          CUSTOMERS TABLE
      ===================================================== */}

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
        {/* Table heading */}
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
                Customer List
              </Title>

              <Text
                style={{
                  color: "#64748b",
                  fontSize: 13,
                }}
              >
                {filteredCustomers.length} customers found
              </Text>
            </div>

            <Button
              icon={<TeamOutlined />}
              onClick={handleExportCustomers}
              style={{
                background: "#242835",
                borderColor: "#343947",
                color: "#f8fafc",
              }}
            >
              Export Customers
            </Button>
          </div>
        </div>

        {/* Customer table */}
        <Table
          loading={loading}
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          locale={{
            emptyText: loadError || "No customers found",
          }}
          scroll={{
            x: 1200,
          }}
          pagination={{
            pageSize: 7,
            showSizeChanger: true,
            pageSizeOptions: [5, 7, 10, 20],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} customers`,
          }}
        />
      </Card>

      {/* =====================================================
          CUSTOMER DETAILS DRAWER
      ===================================================== */}

      <Drawer
        title={
          selectedCustomer ? (
            <div>
              <Text
                strong
                style={{
                  color: "#f8fafc",
                  fontSize: 18,
                }}
              >
                Customer Profile
              </Text>

              <div>
                <Text
                  style={{
                    color: "#64748b",
                    fontSize: 12,
                  }}
                >
                  {selectedCustomer.id}
                </Text>
              </div>
            </div>
          ) : (
            "Customer Profile"
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
        {selectedCustomer && (
          <div>
            {/* =================================================
                PROFILE HEADER
            ================================================= */}

            <div
              style={{
                background: "#1c1f29",
                border: "1px solid #2a2e3a",
                borderRadius: 16,
                padding: 20,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <Avatar
                  size={68}
                  style={{
                    background: "#8b5cf6",
                    fontSize: 25,
                    fontWeight: 600,
                  }}
                >
                  {selectedCustomer.name.charAt(0)}
                </Avatar>

                <div>
                  <Title
                    level={4}
                    style={{
                      color: "#f8fafc",
                      margin: 0,
                    }}
                  >
                    {selectedCustomer.name}
                  </Title>

                  <Text
                    style={{
                      color: "#64748b",
                    }}
                  >
                    {selectedCustomer.id}
                  </Text>

                  <div style={{ marginTop: 7 }}>
                    <Tag
                      color={
                        customerStatusColors[
                          selectedCustomer.status
                        ]
                      }
                    >
                      {selectedCustomer.status}
                    </Tag>

                    <Tag
                      color={
                        membershipColors[
                          selectedCustomer.membership
                        ]
                      }
                      icon={
                        selectedCustomer.membership ===
                        "Premium" ? (
                          <CrownOutlined />
                        ) : null
                      }
                    >
                      {selectedCustomer.membership}
                    </Tag>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                CUSTOMER STATS
            ================================================= */}

            <Row
              gutter={[12, 12]}
              style={{
                marginBottom: 20,
              }}
            >
              <Col span={12}>
                <Card
                  bordered={false}
                  style={{
                    background: "#1c1f29",
                    border: "1px solid #2a2e3a",
                    borderRadius: 14,
                  }}
                >
                  <Statistic
                    title={
                      <span
                        style={{
                          color: "#64748b",
                        }}
                      >
                        Total Orders
                      </span>
                    }
                    value={selectedCustomer.orders}
                    valueStyle={{
                      color: "#f8fafc",
                      fontWeight: 700,
                    }}
                  />
                </Card>
              </Col>

              <Col span={12}>
                <Card
                  bordered={false}
                  style={{
                    background: "#1c1f29",
                    border: "1px solid #2a2e3a",
                    borderRadius: 14,
                  }}
                >
                  <Statistic
                    title={
                      <span
                        style={{
                          color: "#64748b",
                        }}
                      >
                        Total Spent
                      </span>
                    }
                    value={selectedCustomer.totalSpent}
                    prefix="₹"
                    valueStyle={{
                      color: "#22c55e",
                      fontWeight: 700,
                    }}
                  />
                </Card>
              </Col>
            </Row>

            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <div
              style={{
                background: "#1c1f29",
                border: "1px solid #2a2e3a",
                borderRadius: 16,
                padding: 20,
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
                Contact Information
              </Title>

              <Descriptions
                column={1}
                size="small"
                items={[
                  {
                    key: "email",
                    label: "Email",
                    children: selectedCustomer.email,
                  },
                  {
                    key: "phone",
                    label: "Phone",
                    children: selectedCustomer.phone,
                  },
                  {
                    key: "location",
                    label: "Location",
                    children: selectedCustomer.location,
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

            {/* =================================================
                CUSTOMER ACTIVITY
            ================================================= */}

            <div
              style={{
                background: "#1c1f29",
                border: "1px solid #2a2e3a",
                borderRadius: 16,
                padding: 20,
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
                Customer Activity
              </Title>

              <Descriptions
                column={1}
                size="small"
                items={[
                  {
                    key: "joined",
                    label: "Joined QuickKart",
                    children:
                      selectedCustomer.joinedDate,
                  },
                  {
                    key: "lastOrder",
                    label: "Last Order",
                    children:
                      selectedCustomer.lastOrder,
                  },
                  {
                    key: "category",
                    label: "Favorite Category",
                    children: (
                      <Tag color="blue">
                        {
                          selectedCustomer.favoriteCategory
                        }
                      </Tag>
                    ),
                  },
                  {
                    key: "membership",
                    label: "Membership",
                    children: (
                      <Tag
                        color={
                          membershipColors[
                            selectedCustomer.membership
                          ]
                        }
                      >
                        {selectedCustomer.membership}
                      </Tag>
                    ),
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

            {/* =================================================
                CUSTOMER SPENDING PROGRESS
            ================================================= */}

            <div
              style={{
                background: "#1c1f29",
                border: "1px solid #2a2e3a",
                borderRadius: 16,
                padding: 20,
              }}
            >
              <Title
                level={5}
                style={{
                  color: "#f8fafc",
                  marginTop: 0,
                }}
              >
                Customer Value
              </Title>

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
                  }}
                >
                  Spending level
                </Text>

                <Text
                  strong
                  style={{
                    color: "#a78bfa",
                  }}
                >
                  ₹
                  {selectedCustomer.totalSpent.toLocaleString(
                    "en-IN"
                  )}
                </Text>
              </div>

              <Progress
                percent={Math.min(
                  Math.round(
                    (selectedCustomer.totalSpent /
                      25000) *
                      100
                  ),
                  100
                )}
                strokeColor="#8b5cf6"
                trailColor="#2a2e3a"
                showInfo={false}
              />

              <Text
                style={{
                  color: "#64748b",
                  fontSize: 12,
                }}
              >
                Customer spending compared with the
                premium customer target.
              </Text>
            </div>
          </div>
        )}
      </Drawer>

      
      <Modal
        title="Add New Customer"
        open={addModalOpen}
        onCancel={() => {
          setAddModalOpen(false);
          customerForm.resetFields();
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={customerForm}
          layout="vertical"
          onFinish={handleAddCustomer}
          initialValues={{ membership: "Standard" }}
        >
          <Form.Item
            label="Customer Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter the customer name.",
              },
            ]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter an email." },
              { type: "email", message: "Enter a valid email." },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item label="Location" name="location">
            <Input placeholder="Enter location" />
          </Form.Item>

          <Form.Item label="Membership" name="membership">
            <Select
              options={[
                { label: "Standard", value: "Standard" },
                { label: "Silver", value: "Silver" },
                { label: "Gold", value: "Gold" },
                { label: "Premium", value: "Premium" },
              ]}
            />
          </Form.Item>

          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={() => {
                setAddModalOpen(false);
                customerForm.resetFields();
              }}
            >
              Cancel
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={savingCustomer}
            >
              Save Customer
            </Button>
          </Space>
        </Form>
      </Modal>
    
      
{/* Edit Customer Modal */}
<Modal
  title="Edit Customer"
  open={editModalOpen}
  onCancel={() => {
    setEditModalOpen(false);
    setEditingCustomer(null);
    editCustomerForm.resetFields();
  }}
  footer={null}
  destroyOnClose
>
  <Form
    form={editCustomerForm}
    layout="vertical"
    onFinish={handleUpdateCustomer}
  >
    <Form.Item
      label="Customer Name"
      name="name"
      rules={[
        {
          required: true,
          message: "Please enter the customer name.",
        },
      ]}
    >
      <Input placeholder="Enter full name" />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: "Please enter an email address.",
        },
        {
          type: "email",
          message: "Enter a valid email address.",
        },
      ]}
    >
      <Input placeholder="Enter email address" />
    </Form.Item>

    <Form.Item label="Phone" name="phone">
      <Input placeholder="Enter phone number" />
    </Form.Item>

    <Form.Item label="Location" name="location">
      <Input placeholder="Enter location" />
    </Form.Item>

    <Form.Item label="Membership" name="membership">
      <Select
        options={[
          { label: "Standard", value: "Standard" },
          { label: "Silver", value: "Silver" },
          { label: "Gold", value: "Gold" },
          { label: "Premium", value: "Premium" },
        ]}
      />
    </Form.Item>

    <Space
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button
        onClick={() => {
          setEditModalOpen(false);
          setEditingCustomer(null);
          editCustomerForm.resetFields();
        }}
      >
        Cancel
      </Button>

      <Button
        type="primary"
        htmlType="submit"
        loading={updatingCustomer}
        style={{
          background: "#8b5cf6",
          borderColor: "#8b5cf6",
        }}
      >
        Update Customer
      </Button>
    </Space>
  </Form>
</Modal>

    </div>
  );
};

export default Customers;