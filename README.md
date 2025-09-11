# B5-Assignment-5


# 🚖 Ride Management System – Frontend


## 📌 Project Description  

This is a **simple yet functional Ride Sharing Platform** built with **React**.  
The application includes **role-based authentication** and provides three distinct user roles:  

- **Admin**  
- **Driver**  
- **Rider**  

By default, whenever a new user signs up or logs in, they are assigned the **Rider** role.  
Only the **Admin** has the authority to change user roles.  




The UI/UX is designed to be modern, responsive, and intuitive across all devices. 

---

## 👥 Role-Based Access  

- **Rider**  
  - Riders can access the **Ride Request option**.  
  - This option is exclusively available to Riders and is **not accessible** by Drivers.  
  - Riders have their own **dedicated dashboard** for managing rides and viewing ride history.  

- **Driver**  
  - Drivers can only access **driver-related features**.  
  - No other user role can access driver operations.  
  - Drivers also have a **separate dashboard** tailored to their tasks.  

- **Admin**  
  - The Admin has **full control** over the platform.  
  - Admin features include:  
    - Viewing all users and managing their roles  
    - Updating or changing a user’s role  
    - Deleting users if necessary  
    - Monitoring overall progress of the website  
    - Viewing **analytics and statistics** to track platform growth  
  - The Admin dashboard is designed with **advanced functionalities** for management and monitoring.  

---

## 🔒 Authentication & Security  

- Authentication is handled using **JWT (JSON Web Tokens)**.  
- Without proper authentication, no user can access protected features.  
- If an unauthorized user tries to perform restricted actions, the system will return an **Unauthorized Access** response.  

---

## 🎯 Key Highlights  

- Clean and simple **role-based authentication system**  
- Separate dashboards for **Rider** and **Driver** roles  
- **Admin dashboard** with advanced user and system management features  
- Secure **JWT authentication** with proper access control  
- User-friendly and responsive UI built with React  

---



## ⚙️ Tech Stack  

| **Category**        | **Technology** |
|----------------------|----------------|
| **Frontend Framework** | React (with React Router) |
| **State Management** | Redux Toolkit, RTK Query (Axios optional) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Backend API** | Node.js, Express, MongoDB |
| **Authentication** | JWT + bcrypt |
| **Data Visualization (Optional)** | Recharts |
| **Notifications (Optional)** | React Hot Toast |

---

## 🚀 Features  

- **Public Landing Page** introducing the ride booking system  
- **Role-Based Dashboards** for Riders, Drivers, and Admins  
- **Real-Time State Management** with Redux Toolkit & RTK Query  
- **Secure Authentication** with JWT  
- **Responsive UI** built with Tailwind CSS  
- **Optional Enhancements**: charts, analytics, and live notifications  

---

## 📂 Project Structure (Planned)




```
.
├── src
│   ├── assets/
│   │   └── # (Images, fonts, svgs, etc.)
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── app-sidebar.tsx
│   │   │   ├── carousel-01.tsx
│   │   │   ├── loading.tsx
│   │   │   └── logo.tsx
│   │   └── # (Other shared, non-UI components)
│   │
│   ├── Config/
│   │   └── # (Configuration files, e.g., firebase.ts)
│   │
│   ├── Constants/
│   │   └── # (Constant values, e.g., routes.ts, api-endpoints.ts)
│   │
│   ├── hooks/
│   │   └── # (Custom React hooks, e.g., useAuth.ts)
│   │
│   ├── Layout/
│   │   └── # (Main layout components, e.g., MainLayout.tsx)
│   │
│   ├── lib/
│   │   └── # (Utility functions and libraries, e.g., utils.ts)
│   │
│   ├── Modules/
│   │   ├── About/
│   │   ├── Admin/
│   │   ├── Authentication/
│   │   ├── Drive/
│   │   ├── Features/
│   │   ├── Home/
│   │   ├── Ride/
│   │   └── FAQ.tsx
│   │
│   ├── Page/
│   │   └── # (Page-level components that assemble modules)
│   │
│   ├── Provider/
│   │   └── # (React Context providers, e.g., ThemeProvider.tsx)
│   │
│   ├── Redux/
│   │   ├── Features/
│   │   │   ├── Auth/
│   │   │   │   └── auth.api.ts
│   │   │   ├── Driver/
│   │   │   │   └── driver.api.ts
│   │   │   └── Ride/
│   │   │       └── ride.api.ts
│   │   ├── axiosBaseQuery.ts
│   │   ├── baseApi.ts
│   │   ├── hooks.ts
│   │   └── store.ts
│   │
│   ├── Routes/
│   │   └── # (Routing configuration, e.g., AppRoutes.tsx)
│   │
│   ├── Types/
│   │   └── # (TypeScript type definitions and interfaces)
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── # (Other root files like main.tsx or vite-env.d.ts)
│
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json

```



## 🚖 Rider Features

### 🎯 Ride Management
- Create new rides.
- View all rides created by the user.
- Check the status of each ride:
  - ✅ Completed  
  - ❌ Canceled  
  - ⏳ Pending / Ongoing  
- Update rides when necessary.

### 📊 Rider Dashboard
- View the total number of rides created.
- Track the number of Completed / Canceled / Pending rides.
- Manage rides directly from the dashboard.

### 📈 Rider Analytics
- Visual representation of ride data (charts / graphs).
- Track earnings from rides.
- Track total expenses.

---

## 🚕 Driver Features

### 🎯 Ride Management
- View all available rides.
- Pick a ride to work on.
- Cancel or complete picked rides.
- Track the status of all rides assigned.

### 📊 Driver Dashboard
- Manage rides directly from the dashboard.
- View counts of Completed / Canceled / Picked rides.
- Track ride statuses in real-time.

### 📈 Driver Analytics
- Visualize earnings on a daily, weekly, and monthly basis.
- Track income for a single day, seven days, and one month.
- View counts of Completed / Canceled / Picked rides graphically.

---


## 🛡️ Admin Features

### 🎯 Full System Management
- Perform all actions of a **Rider** and **Driver**.
- Update user roles (Rider, Driver, Admin).
- View all users, including Riders and Drivers.
- Track total system-wide earnings.
- Delete any user if required.

### 📊 Admin Dashboard & Analytics
- Visualize overall system data effectively.
- View analytics from Driver information.
- View analytics from Rider information.
- Generate comprehensive reports for earnings and ride statuses.

---


