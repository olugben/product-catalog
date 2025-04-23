

Product Catalog API
A product catalog API designed for managing products in an e-commerce platform. This project includes functionalities such as product creation, updating, deletion, searching, and retrieving products from a PostgreSQL database. The application is Dockerized and includes CI/CD integration for seamless deployment.

Features
Create Product: Allows adding new products to the catalog.

Update Product: Modify the details of an existing product.

Delete Product: Remove a product from the catalog.

Search Products: Find products by their name.

Get All Products: Retrieve a list of all products in the catalog.

Tech Stack
Backend: Node.js (Express.js)

Database: PostgreSQL

Containerization: Docker

CI/CD: GitHub Actions for automated testing, build, and deployment

Getting Started
Prerequisites
Docker

Node.js (for local development)

PostgreSQL (either locally or in a Docker container)

Installation
Clone the repository:



git clone https://github.com/olugben/product-catalog.git
cd product-catalog
Install dependencies:

npm install
Set up environment variables: Create a .env file in the root directory and configure your PostgreSQL credentials:


DB_HOST=localhost
DB_USER=yourdbuser
DB_PASS=yourdbpassword
DB_NAME=product_catalog
DB_PORT=5432

Database Setup
This application uses a PostgreSQL database to store product information. You need to create the products table in your PostgreSQL database before running the application.

1. Create the PostgreSQL Database
You can create the productdb database manually by running the following SQL command in your PostgreSQL client:


CREATE DATABASE product_catalog;
Create the Products Table
Once the database is created, run the following SQL command to create the products table:


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);


Run the application locally:


npm start
The API will be available at http://localhost:3000.

Docker Setup
Build  and run the Docker image:


docker compose up --build 



This will run the application inside a container and make it available at http://localhost:3000.

CI/CD
The project is integrated with GitHub Actions for continuous integration and continuous deployment (CI/CD). The pipeline includes:

Automated testing on every commit.

Docker image build and push to server.

Deployment to production (or staging) environment.

Database
The application uses PostgreSQL for storing product data. You can configure it in the .env file, and the database will be automatically initialized when the application starts.

API Endpoints
POST /api/products/create
Description: Create a new product.

Request Body:


{
  "name": "ProductName",
  "price": 100.00,
  "stock": 50
}
Response:


{
  "status": "success",
  "data": {
    "product": {
      "id": 1,
      "name": "ProductName",
      "price": "100.00",
      "stock": 50,
      "created_at": "2025-04-23T10:33:46.170Z",
      "updated_at": "2025-04-23T10:33:46.170Z",
      "deleted_at": null
    }
  }
}
PUT /api/products/{id}
Description: Update a product by ID.

Request Body:


{
  "name": "UpdatedProduct",
  "price": 150.00,
  "stock": 40
}
DELETE /api/products/{id}
Description: Delete a product by ID.

Response:


{
  "status": "success",
  "message": "Product deleted successfully"
}
GET /api/products/
Description: Get all products.

Response:


{
  "status": "success",
  "data": {
    "products": [
      {
        "id": 1,
        "name": "Product1",
        "price": "100.00",
        "stock": 50,
        "created_at": "2025-04-23T10:33:46.170Z",
        "updated_at": "2025-04-23T10:33:46.170Z",
        "deleted_at": null
      }
    ]
  }
}
POST /api/products/search/
Description: Search products by name.

Request Body:

{
  "name": "ProductMe"
}
Response:

{
  "status": "success",
  "data": {
    "products": [
      {
        "id": 9,
        "name": "ProductMe",
        "price": "4000.00",
        "stock": 8999,
        "created_at": "2025-04-23T10:52:53.320Z",
        "updated_at": "2025-04-23T10:52:53.320Z",
        "deleted_at": null
      }
    ]
  }
}
