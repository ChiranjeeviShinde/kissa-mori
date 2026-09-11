# Kissa Mori

A modern QR-based café ordering system that gives every table its own digital ordering session.

Instead of sharing a single menu and cart across the café, each table has a unique QR code. When a customer scans the QR code, the application identifies the table and creates an isolated ordering experience for that table.

## Overview

**Kissa Mori** is designed to simplify the café ordering process.

Each table in the café is assigned a unique QR code. Customers scan the QR code to open the menu on their phone, browse items, add them to their cart, sign in when required, and place their order.

The important part is that **each table has its own cart/session**.

For example:

```text
Table 1 QR → /menu?table=UUID A → Table 1 session + cart

Table 2 QR → /menu?table=UUID B → Table 2 session + cart

Table 3 QR → /menu?table=UUID C → Table 3 session + cart
```

This allows multiple tables to use the same application simultaneously without mixing their carts or orders.

## Core Idea

The system is built around three things:

### 1. Table-specific QR Codes

Every café table gets its own QR code.

When scanned, the QR code opens the application with the corresponding table identifier.

```text
Table 12
    ↓
Scan QR
    ↓
Kissa Mori
    ↓
Table 12 session
    ↓
Menu + Cart
    ↓
Place Order
```

### 2. Independent Carts

Each table gets an independent cart.

Customers sitting at different tables can use the website at the same time without affecting each other's carts.

For example:

```text
Table 5
├── Cappuccino × 2
├── Sandwich × 1
└── Brownie × 1

Table 8
├── Latte × 1
└── Pasta × 2
```

The carts remain completely separate.

### 3. User Authentication

Customers can browse the menu as guests, while authentication is required when necessary, such as before placing an order.

The application supports OTP-based authentication so customers can sign in using their phone number.

After signing out, the application returns to the guest state and can require authentication again when the customer attempts an action that needs an account.

## Features

* QR-based table identification
* Table-specific ordering sessions
* Independent cart for every table
* Café menu browsing
* Search and filtering
* Add/remove items from cart
* Quantity management
* OTP-based phone authentication
* Login modal
* Guest browsing
* Protected checkout/order flow
* Order confirmation popup
* Responsive design for mobile and desktop
* Persistent authentication/session handling
* AWS S3-based image storage
* Dynamic/randomized menu imagery
* Clean café-style UI

## User Flow

```text
                ┌───────────────┐
                │   Café Table  │
                └───────┬───────┘
                        │
                    Scan QR
                        │
                        ▼
                ┌───────────────┐
                │   Kissa Mori  │
                └───────┬───────┘
                        │
                Identify Table
                        │
                        ▼
                ┌───────────────┐
                │     Menu      │
                └───────┬───────┘
                        │
                  Add items
                        │
                        ▼
                ┌───────────────┐
                │     Cart      │
                └───────┬───────┘
                        │
                  Checkout
                        │
                        ▼
                ┌───────────────┐
                │ Authentication│
                └───────┬───────┘
                        │
                  Verify OTP
                        │
                        ▼
                ┌───────────────┐
                │ Place Order   │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Order Placed  │
                └───────────────┘
```

## Handling Multiple Customers

The application is designed for a real café environment where many customers may be using the website simultaneously.

For example:

```text
                KISSA MORI

     Table 1 QR        Table 2 QR        Table 3 QR
         │                 │                 │
         ▼                 ▼                 ▼
     Session A         Session B         Session C
         │                 │                 │
       Cart A            Cart B            Cart C
         │                 │                 │
      Order A           Order B           Order C
```

Each table maintains its own context instead of using one global cart for the entire café.

This makes the system suitable for multiple tables and multiple simultaneous users.

## Tech Stack

### Frontend

* React
* TypeScript
* React Router
* Tailwind CSS
* Lucide React
* Fuse.js

### Authentication

* Better Auth
* OTP-based phone authentication
* Twilio

### Storage

* AWS S3
* AWS SDK

### Development

* Vite
* TypeScript
* ESLint

## Project Structure

```text
kissa-mori/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── context/
│   │   ├── lib/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── LoginModal/
│   │   ├── ItemCard/
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── CoffeeShop/
│   │   ├── Checkout/
│   │   ├── About/
│   │   └── ...
│   │
│   └── ...
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Environment Variables

Create a `.env` file and configure the required environment variables for authentication, AWS, and other services.

Example:

```env
VITE_...
AWS_...
TWILIO_...
```

Do not commit your actual credentials or secrets to GitHub.

## Running Locally

Clone the repository:

```bash
git clone https://github.com/ChiranjeeviShinde/kissa-mori.git
```

Navigate into the project:

```bash
cd kissa-mori
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available through the local development URL shown by Vite.

## Future Improvements

The project can be extended into a complete café management platform with:

* Admin dashboard
* Table management
* QR code generation for tables
* Kitchen order dashboard
* Real-time order status
* Waiter notifications
* Order history
* Table availability/status
* Multiple café branches
* Customer order tracking
* Analytics and sales reports
* Menu management

## Project Vision

Kissa Mori is more than a digital menu.

The goal is to create a complete **table-based café ordering experience** where a customer can:

```text
Scan → Browse → Add to Cart → Sign In → Order
```

without waiting for a physical menu or manually calling a waiter.

The QR code connects the customer's digital session directly to their physical table, making the ordering process faster, simpler, and easier to manage.

## Author

**Chiranjeevi Shinde**

GitHub: [ChiranjeeviShinde](https://github.com/ChiranjeeviShinde)

---


https://github.com/user-attachments/assets/36e32498-b4b8-426b-b7bc-bd1b1b682bc2


<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/107abcd3-3fc6-4622-8405-e4856cbe5882" />
<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/60e93e3e-9e5d-4319-98d7-c71accca6781" />
<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/2f65940b-d015-427b-aea1-e161ca1038f5" />
<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/3a477182-6ad2-4c86-91cb-31dcfdc46b6c" />
<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/b4a05e92-b838-4cd2-9350-2713e96a87cc" />
<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/529d406c-735e-4990-88af-377684c7b1e3" />
<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/4d4ea475-8e3e-4488-93bd-1a2dcfc412f1" />
<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/4ac95b49-5f28-434d-9d5c-2fcffbe57e7c" />
