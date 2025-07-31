# Society Management System - Frontend

A comprehensive React-based frontend for the Society Management System, built with TypeScript, Material-UI, and modern React practices.

## Features

### 🏠 **Landing Page**
- Beautiful, responsive landing page with feature highlights
- Clear call-to-action buttons for login and registration
- Modern UI with gradient backgrounds and animations

### 🔐 **Authentication System**
- Secure login and registration with form validation
- JWT token-based authentication with 30-minute expiration
- Role-based access control (Admin, Resident, Guard)
- Automatic token refresh and session management

### 👥 **User Registration**
- Comprehensive registration form with all required fields
- Role-based form fields (Admin, Resident, Guard)
- Society selection for Residents and Guards
- New society creation option for Admins
- Form validation with Yup schema

### 🎛️ **Role-Based Dashboards**

#### **Admin Dashboard**
- Overview statistics (societies, buildings, flats, residents)
- Quick action buttons for common tasks
- Recent complaints and notices
- System alerts and notifications
- Building and flat management
- Resident allocation approval system
- Notice creation and circulation

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

### 🏢 **Society Management**
- Complete society creation and management
- Building and flat management
- Resident allocation system
- Flat member management

### 📝 **Complaint System**
- Multi-category complaint registration
- Priority-based complaint tracking
- Status updates and resolution tracking
- Admin complaint management

### 💰 **Maintenance Billing**
- Automated bill generation
- Payment tracking and status updates
- Due date notifications
- Payment history

### 🚪 **Visitor Management**
- Comprehensive visitor logging
- Real-time approval system via WebSocket
- Entry and exit time tracking
- Visitor history and reports

### 📢 **Notice System**
- Priority-based notice creation
- Real-time notice circulation
- Notice history and management

## Technology Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **React Hook Form** with Yup validation
- **Axios** for API communication
- **Socket.io** for real-time features
- **JWT** for authentication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. **Clone the repository**
   ```bash
   cd Housing_Management_System/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:8080/api
   REACT_APP_WS_URL=http://localhost:8080
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── dashboard/
│       ├── AdminDashboard.tsx
│       ├── ResidentDashboard.tsx
│       └── GuardDashboard.tsx
├── context/
│   └── AuthContext.tsx
├── pages/
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── Dashboard.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── hooks/
├── utils/
└── App.tsx
```

## API Integration

The frontend communicates with the backend through the `apiService` which includes:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Societies
- `GET /api/societies` - Get all societies
- `POST /api/societies` - Create new society

### Buildings
- `GET /api/societies/{id}/buildings` - Get buildings by society
- `POST /api/buildings` - Create building
- `PUT /api/buildings/{id}` - Update building
- `DELETE /api/buildings/{id}` - Delete building

### Flats
- `GET /api/buildings/{id}/flats` - Get flats by building
- `POST /api/flats` - Create flat
- `PUT /api/flats/{id}` - Update flat
- `DELETE /api/flats/{id}` - Delete flat

### Complaints
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create complaint
- `PUT /api/complaints/{id}` - Update complaint
- `DELETE /api/complaints/{id}` - Delete complaint

### Visitor Logs
- `GET /api/visitor-logs` - Get all visitor logs
- `POST /api/visitor-logs` - Create visitor log
- `PUT /api/visitor-logs/{id}/approve` - Approve visitor
- `PUT /api/visitor-logs/{id}/reject` - Reject visitor
- `PUT /api/visitor-logs/{id}/exit` - Record exit

### WebSocket Events
- Real-time notifications for visitor approvals
- Live updates for complaint status changes
- Instant notice circulation

## Key Features

### 🔒 **Security**
- JWT token authentication
- Role-based access control
- Secure API communication
- Form validation and sanitization

### 📱 **Responsive Design**
- Mobile-first approach
- Responsive navigation
- Touch-friendly interfaces
- Cross-browser compatibility

### ⚡ **Performance**
- Lazy loading of components
- Optimized bundle size
- Efficient state management
- Caching strategies

### 🎨 **User Experience**
- Intuitive navigation
- Loading states and feedback
- Error handling and recovery
- Accessibility features

## Development

### Code Style
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Consistent component structure
- Proper error handling

### State Management
- React Context for global state
- Local state for component-specific data
- Efficient re-rendering strategies

### Testing
```bash
npm test
```

### Building
```bash
npm run build
```

## Deployment

### Environment Variables
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_WS_URL` - WebSocket server URL

### Build Output
The build process creates optimized static files in the `build/` directory.

## Contributing

1. Follow the existing code style
2. Add proper TypeScript types
3. Include error handling
4. Test thoroughly before submitting

## License

This project is part of the Society Management System.
