# 🚖 RideShareX - Frontend

A modern ride-sharing platform frontend built with React and TypeScript. Features role-based authentication, real-time dashboards, SSL Commerz payment integration, and analytics.

## 📋 Overview

RideShareX provides three distinct user roles:

-   🛡️ **Admin** - Platform management & analytics
-   🚗 **Driver** - Accept and manage rides
-   👤 **Rider** - Request and track rides

New users default to **Rider** role. Only **Admin** can change user roles. Modern, responsive UI optimized for all devices.

## 🔗 Live Links

🔗 **Frontend:** https://ride-share-x-client-site.vercel.app

🔗 **Backend API:** https://ridesharex-server-site.onrender.com

## 👥 Role-Based Access

-   **Rider**

    -   Riders can access the **Ride Request option**.
    -   This option is exclusively available to Riders and is **not accessible** by Drivers.
    -   Riders have their own **dedicated dashboard** for managing rides and viewing ride history.

-   **Driver**

    -   Drivers can only access **driver-related features**.
    -   No other user role can access driver operations.
    -   Drivers also have a **separate dashboard** tailored to their tasks.

-   **Admin**
    -   The Admin has **full control** over the platform.
    -   Admin features include:
        -   Viewing all users and managing their roles
        -   Updating or changing a user’s role
        -   Deleting users if necessary
        -   Monitoring overall progress of the website
        -   Viewing **analytics and statistics** to track platform growth
    -   The Admin dashboard is designed with **advanced functionalities** for management and monitoring.

---

## 🔒 Authentication & Security

-   Authentication is handled using **JWT (JSON Web Tokens)**.
-   Without proper authentication, no user can access protected features.
-   If an unauthorized user tries to perform restricted actions, the system will return an **Unauthorized Access** response.

---

## 🎯 Key Highlights

-   Clean and simple **role-based authentication system**
-   Separate dashboards for **Rider** and **Driver** roles
-   **Admin dashboard** with advanced user and system management features
-   Secure **JWT authentication** with proper access control
-   User-friendly and responsive UI built with React

---

## ⚙️ Tech Stack

| **Category**                      | **Technology**                            |
| --------------------------------- | ----------------------------------------- |
| **Frontend Framework**            | React (with React Router)                 |
| **State Management**              | Redux Toolkit, RTK Query (Axios optional) |
| **Language**                      | TypeScript                                |
| **Styling**                       | Tailwind CSS                              |
| **Backend API**                   | Node.js, Express, MongoDB                 |
| **Authentication**                | JWT + bcrypt                              |
| **Data Visualization (Optional)** | Recharts                                  |
| **Notifications (Optional)**      | React Hot Toast                           |

---

## 🚀 Features

## 🎯 Core Features

### 👤 Rider Dashboard

-   📝 Create ride requests
-   📊 Track ride status (pending, accepted, completed, cancelled)
-   💳 Payment processing with SSL Commerz
-   📈 Ride analytics and expense tracking
-   ⏱️ Real-time ride updates

### 🚗 Driver Dashboard

-   🗺️ Browse available rides
-   ✅ Accept/reject rides
-   📍 Track ride locations
-   💵 Earnings overview
-   📊 Daily/Weekly/Monthly analytics

### 🛡️ Admin Dashboard

-   👥 User management (view, edit, delete)
-   🔄 Change user roles
-   📈 Platform-wide analytics
-   💰 Revenue tracking
-   📊 System statistics & reports

## 💳 Payment System - SSL Commerz

SSL Commerz is Bangladesh's leading payment gateway integrated for secure ride payments:

### Payment Flow

1. 🚕 **Ride Created** - Rider creates ride with amount
2. 💳 **Payment Initiated** - Click pay button
3. 🔗 **Gateway Redirect** - SSL Commerz checkout page
4. ✅ **Payment Complete** - User confirms payment
5. 🎉 **Auto Confirmation** - Ride status updates instantly

### Supported Payment Methods

-   🏦 Debit/Credit Cards
-   💰 Mobile Banking (bKash, Nagad, Rocket)
-   🏧 Bank Transfer
-   🎁 Digital Wallets

### Security Features

-   🔐 End-to-end encryption
-   ✔️ Transaction verification
-   📄 Invoice generation
-   🔄 Automatic reconciliation

## 🔒 Authentication & Security

-   🔑 JWT token-based authentication
-   🔐 Role-based access control (RBAC)
-   🛡️ Protected routes and API endpoints
-   🔄 Token refresh mechanism
-   📝 Password encryption with bcrypt

## ⚙️ Tech Stack

| Component           | Technology                |
| ------------------- | ------------------------- |
| 🎨 Framework        | React + TypeScript        |
| 📦 State Management | Redux Toolkit + RTK Query |
| 🛣️ Routing          | React Router              |
| 🎨 Styling          | Tailwind CSS              |
| 🔗 HTTP Client      | Axios                     |
| 💳 Payment          | SSL Commerz API           |
| 📊 Charts           | Recharts                  |
| 🔔 Notifications    | React Hot Toast           |
| 🔐 Authentication   | JWT + bcrypt              |

## ✨ Key Highlights

-   ⚡ **Real-Time Updates** - Live ride status & notifications
-   📊 **Advanced Analytics** - Charts & statistics for all roles
-   📱 **Responsive Design** - Mobile, tablet, desktop optimized
-   🔒 **Security First** - JWT auth + RBAC
-   💳 **SSL Commerz Integration** - Secure payment processing
-   🎨 **Modern UI/UX** - Professional & intuitive interface

## 📂 Project Structure

```
src/
├── assets/                 # Images, fonts, SVGs
├── components/             # Reusable UI components
├── Config/                 # Configuration files
├── Constants/              # Routes, API endpoints
├── hooks/                  # Custom React hooks
├── Layout/                 # Layout components
├── lib/                    # Utility functions
├── Modules/                # Feature modules
│   ├── Admin/              # Admin dashboard
│   ├── Authentication/     # Auth pages
│   ├── Driver/             # Driver features
│   ├── Ride/               # Ride management
│   └── Home/               # Landing page
├── Page/                   # Page-level components
├── Provider/               # Context providers
├── Redux/                  # Redux store & APIs
├── Routes/                 # Route configuration
├── Types/                  # TypeScript types
└── Utils/                  # Helper functions
```
