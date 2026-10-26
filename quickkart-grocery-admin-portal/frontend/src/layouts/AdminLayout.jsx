///jsx
// ============================================================
// QuickKart - Admin Layout
// ============================================================
// This file creates the common layout used by all admin pages.
//
// The layout contains:
// 1. Left sidebar
// 2. QuickKart branding
// 3. Navigation menu
// 4. Top navigation bar
// 5. Search box
// 6. Notification button
// 7. Admin profile area
// 8. Main page content
//
// All individual pages such as Dashboard, Products and Orders
// are displayed inside the <Outlet /> component.
// ============================================================
import React from "react";
import  { useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Input,
  Layout,
  Menu,
  Space,
  Tooltip,
  Typography,
} from "antd";

import {
  AppstoreOutlined,
  BellOutlined,
  BoxPlotOutlined,
  DashboardOutlined,
  GiftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UserOutlined,
  BarChartOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

// Import the application's global CSS.
// This CSS file contains the complete visual design.
import "../styles/global.css";


// ============================================================
// Get Ant Design layout components
// ============================================================

const { Header, Sider, Content } = Layout;


// ============================================================
// AdminLayout Component
// ============================================================

const AdminLayout = () => {

  // ----------------------------------------------------------
  // State used to collapse/expand the sidebar
  // ----------------------------------------------------------

  const [collapsed, setCollapsed] = useState(false);


  // ----------------------------------------------------------
  // React Router hooks
  //
  // useLocation:
  // Tells us which page the user is currently visiting.
  //
  // useNavigate:
  // Allows us to move the user to another page.
  // ----------------------------------------------------------

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  // ----------------------------------------------------------
  // Navigation menu items
  //
  // Every item contains:
  // key   -> route/page identifier
  // icon  -> Ant Design icon
  // label -> text shown to the user
  // ----------------------------------------------------------

  const mainMenuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: "Overview",
    },

    {
      key: "/products",
      icon: <AppstoreOutlined />,
      label: "Products",
    },

    {
      key: "/orders",
      icon: <ShoppingCartOutlined />,
      label: "Orders",
    },

    {
      key: "/customers",
      icon: <TeamOutlined />,
      label: "Customers",
    },
  ];


  // ----------------------------------------------------------
  // Business menu items
  // ----------------------------------------------------------

  const businessMenuItems = [
    {
      key: "/offers",
      icon: <GiftOutlined />,
      label: "Offers",
    },

    {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: "Reports",
    },
  ];


  // ----------------------------------------------------------
  // System menu items
  // ----------------------------------------------------------

  const systemMenuItems = [
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];


  // ----------------------------------------------------------
  // Combine all menu items
  //
  // We keep them together so Ant Design can easily determine
  // which menu item should be highlighted.
  // ----------------------------------------------------------

  const allMenuItems = [
    ...mainMenuItems,
    ...businessMenuItems,
    ...systemMenuItems,
  ];


  // ----------------------------------------------------------
  // Profile dropdown menu
  // ----------------------------------------------------------

  const profileMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "My Profile",
    },

    {
      type: "divider",
    },

    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Sign Out",
      danger: true,
    },
  ];


  // ----------------------------------------------------------
  // Handle profile dropdown actions
  // ----------------------------------------------------------

  const handleProfileAction = ({ key }) => {
    if (key === "profile") {
      navigate("/profile");
    }

    if (key === "logout") {
      logout();

      navigate("/login", {
        replace: true,
      });
    }
  };


  // ----------------------------------------------------------
  // Find the currently selected menu item
  //
  // Example:
  // If the current URL is /products,
  // the Products menu item becomes highlighted.
  // ----------------------------------------------------------

  const getSelectedMenuKey = () => {

    const currentPath = location.pathname;

    const matchingItem = allMenuItems.find(
      (item) => currentPath === item.key
    );

    return matchingItem ? matchingItem.key : "/dashboard";
  };


  // ----------------------------------------------------------
  // Create breadcrumb text based on current URL
  // ----------------------------------------------------------

  const getCurrentPageName = () => {

    const currentPath = location.pathname;

    const currentItem = allMenuItems.find(
      (item) => item.key === currentPath
    );

    if (currentItem) {
      return currentItem.label;
    }

    if (currentPath === "/profile") {
      return "My Profile";
    }

    return "Overview";
  };


  // ----------------------------------------------------------
  // Handle navigation from the sidebar
  // ----------------------------------------------------------

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };


  // ----------------------------------------------------------
  // Handle Home / logo click
  // ----------------------------------------------------------

  const handleLogoClick = () => {
    navigate("/dashboard");
  };


  // ==========================================================
  // JSX
  // ==========================================================

  return (

    <Layout className="quickkart-layout">

      {/* ======================================================
          LEFT SIDEBAR
          ====================================================== */}

      <Sider
        width={258}
        collapsedWidth={82}
        collapsible
        collapsed={collapsed}
        trigger={null}
        className="quickkart-sidebar"
      >

        {/* ----------------------------------------------------
            BRAND AREA
            ---------------------------------------------------- */}

        <div
          className="quickkart-brand"
          onClick={handleLogoClick}
        >

          <div className="quickkart-brand-icon">
            <ShoppingCartOutlined />
          </div>

          {!collapsed && (
            <div className="quickkart-brand-text">

              <Typography.Text className="quickkart-brand-name">
                QuickKart
              </Typography.Text>

              <Typography.Text className="quickkart-brand-subtitle">
                Grocery Operations
              </Typography.Text>

            </div>
          )}

        </div>


        {/* ----------------------------------------------------
            MAIN NAVIGATION
            ---------------------------------------------------- */}

        <div className="quickkart-menu-section">

          {!collapsed && (
            <div className="quickkart-menu-title">
              MAIN MENU
            </div>
          )}

          <Menu
            mode="inline"
            selectedKeys={[getSelectedMenuKey()]}
            items={mainMenuItems}
            onClick={handleMenuClick}
            className="quickkart-menu"
          />

        </div>


        {/* ----------------------------------------------------
            BUSINESS NAVIGATION
            ---------------------------------------------------- */}

        <div className="quickkart-menu-section">

          {!collapsed && (
            <div className="quickkart-menu-title">
              BUSINESS
            </div>
          )}

          <Menu
            mode="inline"
            selectedKeys={[getSelectedMenuKey()]}
            items={businessMenuItems}
            onClick={handleMenuClick}
            className="quickkart-menu"
          />

        </div>


        {/* ----------------------------------------------------
            SYSTEM NAVIGATION
            ---------------------------------------------------- */}

        <div className="quickkart-menu-section">

          {!collapsed && (
            <div className="quickkart-menu-title">
              SYSTEM
            </div>
          )}

          <Menu
            mode="inline"
            selectedKeys={[getSelectedMenuKey()]}
            items={systemMenuItems}
            onClick={handleMenuClick}
            className="quickkart-menu"
          />

        </div>


        {/* ----------------------------------------------------
            SIDEBAR BOTTOM CARD
            ---------------------------------------------------- */}

        {!collapsed && (
          <div className="quickkart-sidebar-card">

            <div className="sidebar-card-icon">
              <BoxPlotOutlined />
            </div>

            <div className="sidebar-card-content">

              <div className="sidebar-card-title">
                Store Status
              </div>

              <div className="sidebar-card-status">
                <span className="status-dot"></span>
                All systems operational
              </div>

            </div>

          </div>
        )}


        {/* ----------------------------------------------------
            SIDEBAR COLLAPSE BUTTON
            ---------------------------------------------------- */}

        <button
          type="button"
          className="sidebar-collapse-button"
          onClick={() => setCollapsed(!collapsed)}
        >

          {collapsed ? (
            <MenuUnfoldOutlined />
          ) : (
            <MenuFoldOutlined />
          )}

        </button>

      </Sider>


      {/* ======================================================
          RIGHT SIDE OF APPLICATION
          ====================================================== */}

      <Layout className="quickkart-main-layout">


        {/* ====================================================
            TOP HEADER
            ==================================================== */}

        <Header className="quickkart-header">

          {/* --------------------------------------------------
              HEADER LEFT SIDE
              -------------------------------------------------- */}

          <div className="quickkart-header-left">

            <div className="header-breadcrumb-area">

              <Breadcrumb
                items={[
                  {
                    title: "QuickKart",
                  },
                  {
                    title: getCurrentPageName(),
                  },
                ]}
              />

              <h1 className="quickkart-page-title">
                {getCurrentPageName()}
              </h1>

            </div>

          </div>


          {/* --------------------------------------------------
              HEADER RIGHT SIDE
              -------------------------------------------------- */}

          <div className="quickkart-header-right">

            {/* Search box */}

            <div className="quickkart-search">

              <Input
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search anything..."
                bordered={false}
              />

            </div>


            {/* Notification button */}

            <Tooltip title="Notifications">

              <Badge
                count={4}
                size="small"
                offset={[-3, 4]}
              >

                <Button
                  type="text"
                  shape="circle"
                  icon={<BellOutlined />}
                  className="header-icon-button"
                />

              </Badge>

            </Tooltip>


            {/* Vertical divider */}

            <div className="header-divider"></div>


            {/* Admin profile */}

            <Dropdown
              menu={{
                items: profileMenuItems,
                onClick: handleProfileAction,
              }}
              placement="bottomRight"
              trigger={["click"]}
            >

              <button
                type="button"
                className="quickkart-profile-button"
              >

                <Avatar
                  size={42}
                  icon={<UserOutlined />}
                  className="quickkart-avatar"
                />

                <div className="quickkart-profile-info">

                  <span className="quickkart-profile-name">
                    {user?.name || "Admin User"}
                  </span>

                  <span className="quickkart-profile-role">
                    Store Administrator
                  </span>

                </div>

                <DownOutlined className="profile-arrow" />

              </button>

            </Dropdown>

          </div>

        </Header>


        {/* ====================================================
            MAIN PAGE CONTENT
            ==================================================== */}

        <Content className="quickkart-content">

          <div className="quickkart-content-inner">

            {/* ------------------------------------------------
                Outlet renders the currently selected page.

                Example:

                /dashboard -> Dashboard.jsx

                /products -> Products.jsx

                /orders -> Orders.jsx

                /customers -> Customers.jsx
                ------------------------------------------------ */}

            <Outlet />

          </div>

        </Content>


        {/* ====================================================
            FOOTER
            ==================================================== */}

        <footer className="quickkart-footer">

          <span>
            © 2026 QuickKart
          </span>

          <span>
            Grocery Operations Platform
          </span>

        </footer>

      </Layout>

    </Layout>
  );
};


// ============================================================
// Export component
// ============================================================

export default AdminLayout;
