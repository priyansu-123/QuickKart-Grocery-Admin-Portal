
import axios from "axios";

// Address of our Express backend API.
const API_URL = "http://localhost:5000/api/products";

// Fetch products from the PostgreSQL database.
export async function getProducts() {
  const response = await axios.get(API_URL);

  // Return only the products array.
  return response.data.products;
}
