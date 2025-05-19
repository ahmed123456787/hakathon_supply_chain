# 🚛 AI-Powered Supply Chain Management System

## 📋 Overview

A comprehensive supply chain management system powered by AI, designed to streamline operations between suppliers, drivers, and customers. The system features intelligent inventory management, route optimization, and real-time delivery tracking.

## 🌟 Key Features

### For Suppliers

- 📦 Inventory Management
- 📊 Sales Analytics Dashboard
- 🤖 AI-powered Product Recommendations
- 📋 Order Processing

### For Drivers

- 🗺️ Route Optimization
- 📍 Real-time Delivery Tracking
- 📱 Mobile-friendly Interface
- 📦 Order Management

### For Customers

- 🛒 Easy Shopping Experience
- 📦 Order Tracking
- ⭐ Product Reviews
- 🔔 Real-time Notifications

## 📸 Screenshots

### Dashboard View

![Dashboard Screenshot](docs/Screenshot%20from%202025-05-19%2010-25-40.png)

### Order Management

![Order Management](docs/Screenshot%20from%202025-05-19%2010-36-08.png)

## 🛠️ Technology Stack

### Frontend

- ⚛️ React.js with Vite
- 🎨 TailwindCSS
- 📱 Responsive Design
- 🔍 Material UI Components

### Backend

- 🐍 Python
- 🤖 LangChain for AI Integration
- 🗄️ ChromaDB
- 🌐 FastAPI

### AI Features

- 📊 Predictive Analytics
- 🛣️ Route Optimization
- 📦 Inventory Management
- 🤖 Customer Service Automation

## 🚀 Getting Started

### Prerequisites

```bash
# Frontend Dependencies
npm install

# Backend Dependencies
pip install -r requirements.txt
```

### Running the Application

```bash
# Start Frontend (Supplier Portal)
cd frontend_Supplier
npm run dev

# Start Frontend (Driver Portal)
cd frontend_Driver
npm run dev

# Start Frontend (Customer Portal)
cd Frontend_Customer
npm run dev

# Start Backend
cd agent
uvicorn app:app --reload
```

## 🌐 System Architecture

```
Supply Chain Management System
├── Frontend
│   ├── Customer Portal
│   ├── Driver Portal
│   └── Supplier Portal
├── Backend
│   ├── AI Engine
│   ├── API Layer
│   └── Database
└── Integration Layer
    ├── Real-time Updates
    └── External Services
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- Ahmed - Full Stack Developer
- SALAM HACK Team

## 📞 Contact

For any queries regarding the project, please reach out to us at team@salamhack.com
