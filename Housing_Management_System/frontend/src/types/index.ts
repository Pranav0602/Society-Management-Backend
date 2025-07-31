export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'RESIDENT' | 'GUARD';
  societyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Society {
  id: string;
  name: string;
  address: string;
  numberOfBuildings: number;
  createdAt: string;
  updatedAt: string;
}

export interface Building {
  id: string;
  name: string;
  societyId: string;
  numberOfFloors: number;
  createdAt: string;
  updatedAt: string;
}

export interface Flat {
  id: string;
  flatNumber: string;
  buildingId: string;
  floorNumber: number;
  isOccupied: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FlatMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
  flatId: string;
  isOwner: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FlatAllocationRequest {
  id: string;
  residentId: string;
  flatId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  requestDate: string;
  approvedDate?: string;
  approvedBy?: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: 'MAINTENANCE' | 'SECURITY' | 'CLEANING' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  residentId: string;
  flatId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceBill {
  id: string;
  flatId: string;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE';
  description: string;
  month: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  societyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface VisitorLog {
  id: string;
  visitorName: string;
  visitorPhone: string;
  purpose: string;
  flatNumber: string;
  flatId: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  entryTime?: string;
  exitTime?: string;
  guardId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'ADMIN' | 'RESIDENT' | 'GUARD';
  societyId?: string;
}

export interface CreateSocietyRequest {
  name: string;
  address: string;
  numberOfBuildings: number;
}

export interface CreateBuildingRequest {
  name: string;
  societyId: string;
  numberOfFloors: number;
}

export interface CreateFlatRequest {
  flatNumber: string;
  buildingId: string;
  floorNumber: number;
}

export interface CreateFlatMemberRequest {
  name: string;
  email: string;
  phone: string;
  relationship: string;
  flatId: string;
  isOwner: boolean;
}

export interface CreateComplaintRequest {
  title: string;
  description: string;
  category: 'MAINTENANCE' | 'SECURITY' | 'CLEANING' | 'OTHER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  flatId: string;
}

export interface CreateNoticeRequest {
  title: string;
  content: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  societyId: string;
}

export interface CreateVisitorLogRequest {
  visitorName: string;
  visitorPhone: string;
  purpose: string;
  flatNumber: string;
  flatId: string;
}

export interface FlatAllocationFormData {
  name: string;
  flatNumber: string;
  buildingName: string;
  floorNumber: number;
  familyMembers: number;
  moveInDate: string;
  reason: string;
}