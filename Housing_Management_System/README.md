# 🏢 Society Management System

A comprehensive full-stack application for managing housing societies, built with **React** frontend and **Spring Boot** backend.

## 🌟 Features

### 🔐 **Authentication & Authorization**
- Secure JWT-based authentication with 30-minute token expiration
- Role-based access control (Admin, Resident, Guard)
- Protected routes and API endpoints
- Automatic token refresh and session management

### 🏠 **Society Management**
- Complete society creation and management
- Building and flat management system
- Resident allocation and approval workflow
- Flat member management with owner privileges

### 👥 **User Management**
- Multi-role user registration (Admin, Resident, Guard)
- Society-based user organization
- Profile management and settings
- Role-specific dashboards and functionalities

### 📝 **Complaint System**
- Multi-category complaint registration (Maintenance, Security, Cleaning, Other)
- Priority-based complaint tracking (Low, Medium, High, Urgent)
- Status updates and resolution tracking
- Admin complaint management and assignment

### 💰 **Maintenance Billing**
- Automated bill generation and tracking
- Payment status management (Pending, Paid, Overdue)
- Due date notifications and reminders
- Payment history and reporting

### 🚪 **Visitor Management**
- Comprehensive visitor logging system
- Real-time approval workflow via WebSocket
- Entry and exit time tracking
- Visitor history and security reports
- Guard-specific visitor management interface

### 📢 **Notice System**
- Priority-based notice creation and circulation
- Real-time notice delivery via WebSocket
- Notice history and management
- Society-wide communication

### 🎛️ **Role-Based Dashboards**

#### **Admin Dashboard**
- Overview statistics and analytics
- Quick action buttons for common tasks
- Recent complaints and notices
- System alerts and notifications
- Building and flat management tools
- Resident allocation approval system

#### **Resident Dashboard**
- Personal flat information and status
- Complaint registration and tracking
- Maintenance bill payment system
- Notice viewing and alerts
- Visitor approval requests
- Family member management

#### **Guard Dashboard**
- Visitor logging and management
- Real-time visitor status tracking
- Security reports and alerts
- Exit time recording
- Pending approval management

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **React Hook Form** with Yup validation
- **Axios** for API communication
- **Socket.io** for real-time features

### Backend
- **Spring Boot 3.x** with Java 17
- **Spring Security** with JWT
- **Spring Data JPA** with Hibernate
- **PostgreSQL** database
- **WebSocket** for real-time communication
- **Maven** for build management

## 🚀 Quick Start

### Prerequisites
- **Java 17** or higher
- **Node.js 16** or higher
- **PostgreSQL** database
- **Maven** 3.6+
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd Housing_Management_System
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Database Setup**
   - Create a PostgreSQL database
   - Update `application.properties` with your database credentials

4. **Environment Configuration**
   
   Create `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   REACT_APP_WS_URL=http://localhost:8080
   ```

5. **Start the application**
   ```bash
   npm start
   ```

   This will start both backend (port 8080) and frontend (port 3000) concurrently.

### Alternative: Start Components Separately

**Backend only:**
```bash
npm run start:backend
```

**Frontend only:**
```bash
npm run start:frontend
```

**Development mode:**
```bash
npm run dev
```

## 📁 Project Structure

```
Housing_Management_System/
├── src/                          # Spring Boot backend
│   ├── main/
│   │   ├── java/
│   │   │   └── com/society/
│   │   │       ├── controllers/
│   │   │       ├── services/
│   │   │       ├── repositories/
│   │   │       ├── models/
│   │   │       ├── security/
│   │   │       └── config/
│   │   └── resources/
│   │       └── application.properties
│   └── test/
├── frontend/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── dashboard/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── types/
│   │   └── App.tsx
│   ├── public/
│   └── package.json
├── pom.xml                      # Maven configuration
├── package.json                  # Root package.json
└── README.md
```

## 🔧 Configuration

### Backend Configuration

Update `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/society_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
jwt.secret=your_jwt_secret_key
jwt.expiration=1800000

# Server Configuration
server.port=8080
```

### Frontend Configuration

Create `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_WS_URL=http://localhost:8080
```

## 🧪 Testing

### Backend Tests
```bash
npm run test:backend
```

### Frontend Tests
```bash
npm run test:frontend
```

### All Tests
```bash
npm test
```

## 🏗️ Building

### Backend Build
```bash
npm run build:backend
```

### Frontend Build
```bash
npm run build:frontend
```

### Complete Build
```bash
npm run build
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Society Management
- `GET /api/societies` - Get all societies
- `POST /api/societies` - Create new society
- `PUT /api/societies/{id}` - Update society
- `DELETE /api/societies/{id}` - Delete society

### Building Management
- `GET /api/societies/{id}/buildings` - Get buildings by society
- `POST /api/buildings` - Create building
- `PUT /api/buildings/{id}` - Update building
- `DELETE /api/buildings/{id}` - Delete building

### Flat Management
- `GET /api/buildings/{id}/flats` - Get flats by building
- `POST /api/flats` - Create flat
- `PUT /api/flats/{id}` - Update flat
- `DELETE /api/flats/{id}` - Delete flat

### Complaint System
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/{id}` - Update complaint
- `DELETE /api/complaints/{id}` - Delete complaint

### Visitor Management
- `GET /api/visitor-logs` - Get all visitor logs
- `POST /api/visitor-logs` - Create visitor log
- `PUT /api/visitor-logs/{id}/approve` - Approve visitor
- `PUT /api/visitor-logs/{id}/reject` - Reject visitor
- `PUT /api/visitor-logs/{id}/exit` - Record exit

### WebSocket Events
- `visitor_approval` - Real-time visitor approval notifications
- `complaint_update` - Live complaint status updates
- `notice_circulation` - Instant notice delivery

## 🔒 Security Features

- **JWT Authentication** with configurable expiration
- **Role-based Access Control** (RBAC)
- **CORS Configuration** for cross-origin requests
- **Input Validation** and sanitization
- **SQL Injection Prevention** via JPA
- **XSS Protection** with proper encoding

## 📱 Responsive Design

- **Mobile-first** approach
- **Progressive Web App** features
- **Touch-friendly** interfaces
- **Cross-browser** compatibility
- **Accessibility** compliance

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file: `mvn clean package`
2. Deploy to your preferred cloud platform
3. Configure environment variables
4. Set up database connection

### Frontend Deployment
1. Build the production files: `npm run build:frontend`
2. Deploy the `build/` folder to your web server
3. Configure API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- Complete society management system
- Role-based dashboards
- Real-time features with WebSocket
- Comprehensive API documentation

---

**Built with ❤️ using React, Spring Boot, and Material-UI**