/*
  ============================================================
  QUICKKART - PRODUCTS PAGE
  ============================================================

  This page manages grocery products.

  Features:
  1. Product statistics
  2. Search products
  3. Category filter
  4. Stock filter
  5. Add product modal
  6. Product table
  7. Edit action
  8. Delete action
  9. Pagination

  This version uses local mock data.
  Later we can connect the page to the Express backend.
*/

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProducts } from "../api/productApi.js";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  message,
} from "antd";

import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
  ShoppingOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const { Option } = Select;

/*
  ============================================================
  MOCK PRODUCT DATA
  ============================================================
*/

const initialProducts = [
  {
    key: "1",
    name: "Fresh Milk",
    category: "Dairy",
    price: 60,
    stock: 82,
    sold: 428,
    status: "In Stock",
    sku: "DAI-001",
    unit: "1 L",
  },

  {
    key: "2",
    name: "Brown Bread",
    category: "Bakery",
    price: 45,
    stock: 34,
    sold: 294,
    status: "In Stock",
    sku: "BAK-002",
    unit: "400 g",
  },

  {
    key: "3",
    name: "Banana",
    category: "Fruits",
    price: 50,
    stock: 18,
    sold: 361,
    status: "Low Stock",
    sku: "FRT-003",
    unit: "1 dozen",
  },

  {
    key: "4",
    name: "Potato",
    category: "Vegetables",
    price: 40,
    stock: 65,
    sold: 247,
    status: "In Stock",
    sku: "VEG-004",
    unit: "1 kg",
  },

  {
    key: "5",
    name: "Tomato",
    category: "Vegetables",
    price: 38,
    stock: 12,
    sold: 226,
    status: "Low Stock",
    sku: "VEG-005",
    unit: "1 kg",
  },

  {
    key: "6",
    name: "Orange Juice",
    category: "Beverages",
    price: 110,
    stock: 0,
    sold: 182,
    status: "Out of Stock",
    sku: "BEV-006",
    unit: "1 L",
  },

  {
    key: "7",
    name: "Potato Chips",
    category: "Snacks",
    price: 30,
    stock: 92,
    sold: 315,
    status: "In Stock",
    sku: "SNK-007",
    unit: "100 g",
  },

  {
    key: "8",
    name: "Greek Yogurt",
    category: "Dairy",
    price: 85,
    stock: 27,
    sold: 164,
    status: "In Stock",
    sku: "DAI-008",
    unit: "400 g",
  },

  {
    key: "9",
    name: "Apples",
    category: "Fruits",
    price: 140,
    stock: 8,
    sold: 198,
    status: "Low Stock",
    sku: "FRT-009",
    unit: "1 kg",
  },

  {
    key: "10",
    name: "Mineral Water",
    category: "Beverages",
    price: 20,
    stock: 120,
    sold: 512,
    status: "In Stock",
    sku: "BEV-010",
    unit: "1 L",
  },
];

/*
  ============================================================
  CATEGORY COLORS
  ============================================================
*/

const categoryColors = {
  Dairy: "purple",
  Bakery: "orange",
  Fruits: "green",
  Vegetables: "lime",
  Beverages: "blue",
  Snacks: "magenta",
};

/*
  ============================================================
  PRODUCT ICON COLORS
  ============================================================
*/

const productIconColors = {
  Dairy: "#8b5cf6",
  Bakery: "#f59e0b",
  Fruits: "#22c55e",
  Vegetables: "#84cc16",
  Beverages: "#3b82f6",
  Snacks: "#ec4899",
};

/*
  ============================================================
  PRODUCT PAGE
  ============================================================
*/

const Products = () => {
  /*
    Product list state.
  */

// Products retrieved from the Express API.
const [products, setProducts] = useState([]);

// Track the loading and error states.
const [loading, setLoading] = useState(true);
const [loadError, setLoadError] = useState("");
// Load products from PostgreSQL through the backend.
useEffect(() => {
  const loadProducts = async () => {
    try {
      setLoading(true);
      setLoadError("");

      const databaseProducts = await getProducts();

      // Convert PostgreSQL column names into the
      // property names used by the existing UI.
      const formattedProducts = databaseProducts.map(
        (product) => ({
          key: String(product.id),
          id: product.id,
          name: product.name,
          category: product.category ?? "Uncategorized",
          price: Number(product.price),
          stock: Number(product.stock),
          sold: Number(product.sold ?? 0),
          status:
            product.stock === 0
              ? "Out of Stock"
              : product.stock <= 20
                ? "Low Stock"
                : "In Stock",
          sku: `QK-${product.id}`,
          unit: "unit",
        })
      );

      setProducts(formattedProducts);
    } catch (error) {
      console.error("Failed to load products:", error);
      setLoadError(
        "Unable to load products. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  };

  loadProducts();
}, []);
  /*
    Search text.
  */

  const [searchText, setSearchText] =
    useState("");

  /*
    Selected category.
  */

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  /*
    Selected stock status.
  */

  const [selectedStock, setSelectedStock] =
    useState("all");

  /*
    Controls Add Product modal.
  */

  const [isModalOpen, setIsModalOpen] =
    useState(false);

    // Store the product currently being edited.
// null means the form is in Add Product mode.
const [editingProduct, setEditingProduct] =
  useState(null);
  /*
    Form instance.
  */

  const [form] = Form.useForm();

  /*
    Ant Design message.
  */

  const [messageApi, contextHolder] =
    message.useMessage();

  /*
    ==========================================================
    FILTER PRODUCTS
    ==========================================================
  */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        product.sku
          .toLowerCase()
          .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      const matchesStock =
        selectedStock === "all" ||
        product.status === selectedStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });
  }, [
    products,
    searchText,
    selectedCategory,
    selectedStock,
  ]);

  /*
    ==========================================================
    PRODUCT STATISTICS
    ==========================================================
  */

  const totalProducts = products.length;

  const inStockProducts = products.filter(
    (product) =>
      product.status === "In Stock"
  ).length;

  const lowStockProducts = products.filter(
    (product) =>
      product.status === "Low Stock"
  ).length;

  const outOfStockProducts = products.filter(
    (product) =>
      product.status === "Out of Stock"
  ).length;

  /*
    ==========================================================
    DELETE PRODUCT
    ==========================================================
  */

  
/*
 * Delete a product from PostgreSQL.
 * The product is removed from the table only after
 * the backend confirms that the deletion succeeded.
 */
const handleDelete = async (productId) => {
  try {
    // Send a DELETE request to the Express backend.
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    // Read the backend response.
    const result = await response.json();

    // Handle errors returned by the backend.
    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Failed to delete product."
      );
    }

    // Remove the deleted product from the current React table.
    setProducts((currentProducts) =>
      currentProducts.filter(
        (product) => String(product.id) !== String(productId)
      )
    );

    // Show a success notification.
    messageApi.success("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);

    messageApi.error(
      error.message || "Unable to delete product."
    );
  }
};

  /*
    ==========================================================
    ADD PRODUCT
    ==========================================================
  */

  // Add a new product and save it in PostgreSQL.

/*
 * Save a product in either Add or Edit mode.
 * New products use POST; existing products use PUT.
 */
const handleSaveProduct = async () => {
  try {
    // Validate the existing Ant Design form.
    const values = await form.validateFields();

    // Decide whether we are adding or editing.
    const isEditing = editingProduct !== null;

    const url = isEditing
      ? `http://localhost:5000/api/products/${editingProduct.id}`
      : "http://localhost:5000/api/products";

    const response = await fetch(url, {
      method: isEditing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        category: values.category,
        price: values.price,
        stock: values.stock,
        sold: isEditing ? editingProduct.sold : 0,
      }),
    });

    const result = await response.json();

    // Show an error if the backend rejects the request.
    if (!response.ok || !result.success) {
      throw new Error(
        result.message || "Unable to save product."
      );
    }

    // Reload the latest records from PostgreSQL.
    const databaseProducts = await getProducts();

    // Convert database records into the existing table format.
    const formattedProducts = databaseProducts.map(
      (product) => ({
        key: String(product.id),
        id: product.id,
        name: product.name,
        category: product.category ?? "Uncategorized",
        price: Number(product.price),
        stock: Number(product.stock),
        sold: Number(product.sold ?? 0),
        status:
          Number(product.stock) === 0
            ? "Out of Stock"
            : Number(product.stock) <= 20
              ? "Low Stock"
              : "In Stock",
        sku: `QK-${product.id}`,
        unit: "unit",
      })
    );

    // Refresh the table using the database records.
    setProducts(formattedProducts);

    messageApi.success(
      isEditing
        ? "Product updated successfully!"
        : "Product added successfully!"
    );

    // Clear the form and close the modal.
    form.resetFields();
    setEditingProduct(null);
    setIsModalOpen(false);
  } catch (error) {
    // Ant Design handles field-validation errors.
    if (error?.errorFields) {
      return;
    }

    console.error("Error saving product:", error);

    messageApi.error(
      error.message || "Unable to save product."
    );
  }
};


  /*
    ==========================================================
    STATUS TAG
    ==========================================================
  */

  const renderStatus = (status) => {
    if (status === "In Stock") {
      return (
        <Tag color="success">
          ● In Stock
        </Tag>
      );
    }

    if (status === "Low Stock") {
      return (
        <Tag color="warning">
          ● Low Stock
        </Tag>
      );
    }

    return (
      <Tag color="error">
        ● Out of Stock
      </Tag>
    );
  };

  /*
    ==========================================================
    TABLE COLUMNS
    ==========================================================
  */

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "name",
      key: "name",

      render: (name, product) => (
        <Space>
          <Avatar
            shape="square"
            size={42}
            icon={<ShoppingOutlined />}
            style={{
              background:
                productIconColors[
                  product.category
                ] || "#8b5cf6",

              borderRadius: 10,
            }}
          />

          <div>
            <Text
              strong
              style={{
                color: "#f8fafc",
                display: "block",
              }}
            >
              {name}
            </Text>

            <Text
              style={{
                color: "#64748b",
                fontSize: 10,
              }}
            >
              SKU: {product.sku}
            </Text>
          </div>
        </Space>
      ),
    },

    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",

      render: (category) => (
        <Tag
          color={
            categoryColors[category] ||
            "default"
          }
        >
          {category}
        </Tag>
      ),
    },

    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",

      render: (price, product) => (
        <div>
          <Text
            strong
            style={{
              color: "#f8fafc",
            }}
          >
            ₹{price}
          </Text>

          <Text
            style={{
              display: "block",
              color: "#64748b",
              fontSize: 10,
            }}
          >
            per {product.unit}
          </Text>
        </div>
      ),
    },

    {
      title: "STOCK",
      dataIndex: "stock",
      key: "stock",

      sorter: (a, b) =>
        a.stock - b.stock,

      render: (stock, product) => (
        <div>
          <Text
            strong
            style={{
              color:
                product.status ===
                "Out of Stock"
                  ? "#ef4444"
                  : product.status ===
                    "Low Stock"
                    ? "#f59e0b"
                    : "#f8fafc",
            }}
          >
            {stock}
          </Text>

          <Text
            style={{
              color: "#64748b",
              fontSize: 10,
              marginLeft: 5,
            }}
          >
            units
          </Text>
        </div>
      ),
    },

    {
      title: "SOLD",
      dataIndex: "sold",
      key: "sold",

      sorter: (a, b) =>
        a.sold - b.sold,

      render: (sold) => (
        <Text
          style={{
            color: "#94a3b8",
          }}
        >
          {sold} units
        </Text>
      ),
    },

    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",

      render: renderStatus,
    },

    {
      title: "ACTION",
      key: "action",

      render: (_, product) => (
        <Space size="small">

          <Button
            type="text"
            icon={<EditOutlined />}
            style={{
              color: "#a78bfa",
            }}
            
            onClick={() => {
              // Remember which product the user selected.
              setEditingProduct(product);

              // Fill the form with the selected product's values.
              form.setFieldsValue({
                name: product.name,
                category: product.category,
                price: product.price,
                stock: product.stock,
                unit: product.unit,
              });

              // Open the existing modal.
              setIsModalOpen(true);
            }}
          />

          <Popconfirm
            title="Delete this product?"
            description={`Are you sure you want to delete ${product.name}?`}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{
              danger: true,
            }}
            onConfirm={() =>
              handleDelete(product.id)
            }
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>

        </Space>
      ),
    },
  ];

  /*
    ==========================================================
    RETURN PAGE
    ==========================================================
  */

  return (
    <div className="quickkart-products-page">

      {contextHolder}

      {/* ====================================================
          PAGE HEADER
          ==================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "flex-start",
          gap: 20,
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <div>
          <Text
            style={{
              color: "#8b5cf6",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            INVENTORY MANAGEMENT
          </Text>

          <Title
            level={2}
            style={{
              color: "#f8fafc",
              marginTop: 5,
              marginBottom: 5,
              fontSize: 28,
            }}
          >
            Products
          </Title>

          <Text
            style={{
              color: "#64748b",
              fontSize: 13,
            }}
          >
            Manage your grocery catalog,
            inventory and stock levels.
          </Text>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() =>
            setIsModalOpen(true)
          }
        >
          Add Product
        </Button>
      </div>

      {/* ====================================================
          STATISTICS
          ==================================================== */}

      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: 20,
        }}
      >

        {/* TOTAL */}

        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Total Products"
              value={totalProducts}
              prefix={
                <AppstoreOutlined />
              }
              valueStyle={{
                color: "#f8fafc",
                fontSize: 25,
                fontWeight: 700,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 11,
              }}
            >
              Across all categories
            </Text>
          </Card>
        </Col>

        {/* IN STOCK */}

        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="In Stock"
              value={inStockProducts}
              prefix={
                <ShoppingOutlined />
              }
              valueStyle={{
                color: "#22c55e",
                fontSize: 25,
                fontWeight: 700,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 11,
              }}
            >
              Products available
            </Text>
          </Card>
        </Col>

        {/* LOW STOCK */}

        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Low Stock"
              value={lowStockProducts}
              prefix={
                <WarningOutlined />
              }
              valueStyle={{
                color: "#f59e0b",
                fontSize: 25,
                fontWeight: 700,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 11,
              }}
            >
              Need restocking
            </Text>
          </Card>
        </Col>

        {/* OUT OF STOCK */}

        <Col
          xs={24}
          sm={12}
          lg={6}
        >
          <Card>
            <Statistic
              title="Out of Stock"
              value={outOfStockProducts}
              prefix={
                <WarningOutlined />
              }
              valueStyle={{
                color: "#ef4444",
                fontSize: 25,
                fontWeight: 700,
              }}
            />

            <Text
              style={{
                color: "#64748b",
                fontSize: 11,
              }}
            >
              Immediate action
            </Text>
          </Card>
        </Col>
      </Row>

      {/* ====================================================
          FILTER / SEARCH BAR
          ==================================================== */}

      <Card
        style={{
          marginBottom: 16,
        }}
      >
        <Row
          gutter={[12, 12]}
          align="middle"
        >

          {/* SEARCH */}

          <Col
            xs={24}
            md={10}
            lg={9}
          >
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
              placeholder="Search product or SKU..."
              value={searchText}
              onChange={(event) =>
                setSearchText(
                  event.target.value
                )
              }
            />
          </Col>

          {/* CATEGORY */}

          <Col
            xs={24}
            sm={12}
            md={6}
          >
            <Select
              size="large"
              value={selectedCategory}
              onChange={(value) =>
                setSelectedCategory(value)
              }
              style={{
                width: "100%",
              }}
              suffixIcon={
                <FilterOutlined />
              }
            >
              <Option value="all">
                All Categories
              </Option>

              <Option value="Dairy">
                Dairy
              </Option>

              <Option value="Bakery">
                Bakery
              </Option>

              <Option value="Fruits">
                Fruits
              </Option>

              <Option value="Vegetables">
                Vegetables
              </Option>

              <Option value="Beverages">
                Beverages
              </Option>

              <Option value="Snacks">
                Snacks
              </Option>
            </Select>
          </Col>

          {/* STOCK */}

          <Col
            xs={24}
            sm={12}
            md={6}
          >
            <Select
              size="large"
              value={selectedStock}
              onChange={(value) =>
                setSelectedStock(value)
              }
              style={{
                width: "100%",
              }}
            >
              <Option value="all">
                All Stock
              </Option>

              <Option value="In Stock">
                In Stock
              </Option>

              <Option value="Low Stock">
                Low Stock
              </Option>

              <Option value="Out of Stock">
                Out of Stock
              </Option>
            </Select>
          </Col>

          {/* RESULT COUNT */}

          <Col
            xs={24}
            md={2}
            style={{
              textAlign: "right",
            }}
          >
            <Text
              style={{
                color: "#64748b",
                fontSize: 11,
              }}
            >
              {filteredProducts.length}{" "}
              results
            </Text>
          </Col>

        </Row>
      </Card>

      {/* ====================================================
          PRODUCT TABLE
          ==================================================== */}

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
              Product Inventory
            </Text>

            <div>
              <Text
                style={{
                  color: "#64748b",
                  fontSize: 11,
                }}
              >
                Complete product catalog
              </Text>
            </div>
          </div>
        }
      >
        {loadError && (
          <Text
            type="danger"
            style={{ display: "block", marginBottom: 12 }}
          >
            {loadError}
          </Text>
        )}
        <Table
          loading={loading}
          columns={columns}
          dataSource={filteredProducts}
          rowKey="key"
          pagination={{
            pageSize: 6,
            showSizeChanger: true,
            pageSizeOptions: [
              "6",
              "10",
              "20",
            ],
            showTotal: (total) =>
              `Total ${total} products`,
          }}
          scroll={{
            x: 1000,
          }}
        />
      </Card>

      {/* ====================================================
          ADD PRODUCT MODAL
          ==================================================== */}

      <Modal
        open={isModalOpen}
        title={
          <div>
            <Text
              style={{
                color: "#f8fafc",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Add New Product
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
                Add a product to your
                QuickKart catalog.
              </Text>
            </div>
          </div>
        }
        onCancel={() => {
        // Clear all form fields.
        form.resetFields();

        // Exit edit mode.
        setEditingProduct(null);

        // Close the modal.
        setIsModalOpen(false);
      }}
        onOk={handleSaveProduct}
        okText={editingProduct ? "Save Changes" : "Add Product"}
        width={560}
      >
        <Form
          form={form}
          layout="vertical"
          style={{
            marginTop: 24,
          }}
        >

          {/* PRODUCT NAME */}

          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              {
                required: true,
                message:
                  "Please enter product name",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Example: Fresh Paneer"
            />
          </Form.Item>

          {/* CATEGORY */}

          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message:
                  "Please select a category",
              },
            ]}
          >
            <Select
              size="large"
              placeholder="Select category"
            >
              <Option value="Dairy">
                Dairy
              </Option>

              <Option value="Bakery">
                Bakery
              </Option>

              <Option value="Fruits">
                Fruits
              </Option>

              <Option value="Vegetables">
                Vegetables
              </Option>

              <Option value="Beverages">
                Beverages
              </Option>

              <Option value="Snacks">
                Snacks
              </Option>
            </Select>
          </Form.Item>

          {/* PRICE + STOCK */}

          <Row gutter={12}>

            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message:
                      "Enter product price",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  min={1}
                  prefix="₹"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Price"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Stock"
                name="stock"
                rules={[
                  {
                    required: true,
                    message:
                      "Enter stock quantity",
                  },
                ]}
              >
                <InputNumber
                  size="large"
                  min={0}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Quantity"
                />
              </Form.Item>
            </Col>

          </Row>

          {/* UNIT */}

          <Form.Item
            label="Unit"
            name="unit"
            rules={[
              {
                required: true,
                message:
                  "Please enter product unit",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Example: 1 kg / 500 g / 1 L"
            />
          </Form.Item>

        </Form>
      </Modal>

    </div>
  );
};

export default Products;