# QuickKart Grocery Admin Portal

## Project Overview

This project is a full-stack grocery administration web application developed using React.js, Ant Design, Node.js, Express.js, and PostgreSQL. It allows administrators to manage grocery products, customer records, and orders through a web-based interface. The application uses REST APIs to connect the frontend with the backend and PostgreSQL database.

## Technologies Used

* **React.js**: Frontend user interface
* **JavaScript**: Application logic
* **Ant Design (AntD)**: UI components and tables
* **CSS**: Styling and layout
* **Node.js**: Backend JavaScript runtime
* **Express.js**: REST API development
* **PostgreSQL**: Relational database
* **pg**: PostgreSQL integration for Node.js
* **Vite**: Frontend development server, if configured
* **pgAdmin 4**: Database administration
* **Git**: Version control
* **GitHub**: Source-code hosting

## Features

* Dashboard with store statistics and order information
* Product listing from PostgreSQL
* Add new grocery products
* Delete existing products
* Customer listing and management
* Add and edit customer records
* Update customer status
* Delete customer records
* Retrieve orders and associated customer information
* Display purchased products, quantities, and order totals
* Update order statuses
* Persistent database operations
* REST API integration between frontend and backend
* Loading and error handling where implemented

## Project Structure

```text
quickkart-grocery-admin-portal/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Customers.jsx
│   │   │   └── Orders.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── global.css
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── routes/
│   │   │   ├── productRoutes.js
│   │   │   ├── customerRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── screenshots/
├── .gitignore
└── README.md
```

*Note: This is a representative structure. Keep your actual folder and file names if they differ from this example.*

## Setup Instructions

### 1. Clone or download the project

Clone the GitHub repository and open the project folder in Visual Studio Code.

```bash
git clone https://github.com/YOUR_USERNAME/quickkart-grocery-admin-portal.git
cd quickkart-grocery-admin-portal
```

Replace `YOUR_USERNAME` with your GitHub username and use your actual repository URL.

### 2. Install frontend dependencies

Open a terminal in the directory containing the frontend `package.json`.

```bash
cd frontend
npm install
```

If your frontend `package.json` is in the project root instead, run `npm install` from that directory.

### 3. Install backend dependencies

Open another terminal and navigate to the backend directory.

```bash
cd backend
npm install
```

### 4. Configure PostgreSQL

Ensure PostgreSQL is installed and running. Open pgAdmin 4 and create the project database if it does not already exist.

Example:

```sql
CREATE DATABASE quickkart_db;
```

The required tables include:

* `products`
* `categories`
* `customers`
* `orders`
* `order_items`

Create these tables using the project's database schema or SQL setup scripts. Creating the database alone does not create its tables or sample records.

### 5. Configure environment variables

Create a `.env` file inside the backend directory.

```dotenv
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=quickkart_db
DB_USER=postgres
DB_PASSWORD=YOUR_LOCAL_DATABASE_PASSWORD
```

Replace the example database credentials with your local PostgreSQL settings.

Ensure the backend loads these variables and that the database connection configuration uses the same variable names.

**Security:** Never commit your actual `.env` file or database password to GitHub. Use `.env.example` with placeholder values for documentation.

### 6. Start the backend

From the backend directory, run:

```bash
npm run dev
```

This command assumes your backend `package.json` defines a `dev` script. Otherwise, use the script configured in your project.

The backend is expected to run at:

```text
http://localhost:5000
```

### 7. Start the frontend

From the directory containing the frontend `package.json`, run:

```bash
npm run dev
```

Open the local URL displayed in the terminal. For a typical Vite setup, this is:

```text
http://localhost:5173
```

The port may differ depending on your configuration.

## Main API Endpoints

The following endpoints describe the implemented API operations. Verify their exact paths and HTTP methods in the backend route files.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Retrieve all products |
| POST | `/api/products` | Add a product |
| DELETE | `/api/products/:id` | Delete a product |
| GET | `/api/customers` | Retrieve customers |
| POST | `/api/customers` | Add a customer |
| PUT | `/api/customers/:id` | Update a customer, if configured |
| DELETE | `/api/customers/:id` | Delete a customer |
| GET | `/api/orders` | Retrieve order information |
| PUT | `/api/orders/:id/status` | Update an order status |
| GET | `/api/dashboard` | Retrieve dashboard information |

The backend may expose additional endpoints depending on the final implementation.

## Database

The application uses PostgreSQL as its relational database.

The main tables are:

* **products**: Stores product names, categories, prices, stock quantities, and status.
* **categories**: Stores grocery product categories.
* **customers**: Stores customer information and status.
* **orders**: Stores customer references, order totals, payment statuses, order statuses, and order dates.
* **order_items**: Stores products and quantities associated with each order.

The backend uses SQL queries and joins to retrieve related information. Product, customer, and order operations are persisted in PostgreSQL where implemented.

## Order Management

The Orders page retrieves order records from the database and displays their associated customer and product information.

Administrators can review order details and update order statuses through the available interface.

Sample orders can be inserted into PostgreSQL for demonstration and testing. A separate customer checkout or order-creation interface is not required for the current administration portal.

## Testing

The application can be tested manually using the browser, pgAdmin 4, and API requests.

Test the following operations:

* Retrieve products from PostgreSQL.
* Add a product and verify that it remains after refreshing the page.
* Delete a product and verify that it remains deleted after refreshing.
* Retrieve and manage customer records.
* Verify that order details display correctly.
* Update an order status and verify that the change persists.
* Check that dashboard data loads correctly.
* Test API behavior for invalid IDs and unavailable database connections.

## Security Notes

* Store database credentials in environment variables.
* Never commit the `.env` file to version control.
* Use parameterized SQL queries to reduce SQL injection risks.
* Validate incoming request data in the backend.
* Configure CORS for the intended frontend origin.
* Restrict database access to authorized users.
* Implement authentication and authorization before exposing administrative functionality publicly, if not already configured.
* Use an appropriate production server and secure deployment configuration for production use.
