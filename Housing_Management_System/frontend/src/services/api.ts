import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { io, Socket } from 'socket.io-client';
import {
  User,
  Society,
  Building,
  Flat,
  FlatMember,
  Complaint,
  MaintenanceBill,
  Notice,
  VisitorLog,
  FlatAllocationRequest,
  AuthResponse,
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  CreateSocietyRequest,
  CreateBuildingRequest,
  CreateFlatRequest,
  CreateFlatMemberRequest,
  CreateComplaintRequest,
  CreateNoticeRequest,
  CreateVisitorLogRequest,
  FlatAllocationFormData
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const WS_URL = process.env.REACT_APP_WS_URL || 'http://localhost:8080';

class ApiService {
  private api: AxiosInstance;
  private socket: Socket | null = null;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle token expiration
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login', data);
    return response.data;
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/register', data);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Societies
  async getSocieties(): Promise<Society[]> {
    const response: AxiosResponse<ApiResponse<Society[]>> = await this.api.get('/societies');
    return response.data.data || [];
  }

  async createSociety(data: CreateSocietyRequest): Promise<Society> {
    const response: AxiosResponse<ApiResponse<Society>> = await this.api.post('/societies', data);
    return response.data.data!;
  }

  // Buildings
  async getBuildings(societyId: string): Promise<Building[]> {
    const response: AxiosResponse<ApiResponse<Building[]>> = await this.api.get(`/societies/${societyId}/buildings`);
    return response.data.data || [];
  }

  async createBuilding(data: CreateBuildingRequest): Promise<Building> {
    const response: AxiosResponse<ApiResponse<Building>> = await this.api.post('/buildings', data);
    return response.data.data!;
  }

  async updateBuilding(id: string, data: Partial<CreateBuildingRequest>): Promise<Building> {
    const response: AxiosResponse<ApiResponse<Building>> = await this.api.put(`/buildings/${id}`, data);
    return response.data.data!;
  }

  async deleteBuilding(id: string): Promise<void> {
    await this.api.delete(`/buildings/${id}`);
  }

  // Flats
  async getFlats(buildingId: string): Promise<Flat[]> {
    const response: AxiosResponse<ApiResponse<Flat[]>> = await this.api.get(`/buildings/${buildingId}/flats`);
    return response.data.data || [];
  }

  async createFlat(data: CreateFlatRequest): Promise<Flat> {
    const response: AxiosResponse<ApiResponse<Flat>> = await this.api.post('/flats', data);
    return response.data.data!;
  }

  async updateFlat(id: string, data: Partial<CreateFlatRequest>): Promise<Flat> {
    const response: AxiosResponse<ApiResponse<Flat>> = await this.api.put(`/flats/${id}`, data);
    return response.data.data!;
  }

  async deleteFlat(id: string): Promise<void> {
    await this.api.delete(`/flats/${id}`);
  }

  // Flat Members
  async getFlatMembers(flatId: string): Promise<FlatMember[]> {
    const response: AxiosResponse<ApiResponse<FlatMember[]>> = await this.api.get(`/flats/${flatId}/members`);
    return response.data.data || [];
  }

  async createFlatMember(data: CreateFlatMemberRequest): Promise<FlatMember> {
    const response: AxiosResponse<ApiResponse<FlatMember>> = await this.api.post('/flat-members', data);
    return response.data.data!;
  }

  async updateFlatMember(id: string, data: Partial<CreateFlatMemberRequest>): Promise<FlatMember> {
    const response: AxiosResponse<ApiResponse<FlatMember>> = await this.api.put(`/flat-members/${id}`, data);
    return response.data.data!;
  }

  async deleteFlatMember(id: string): Promise<void> {
    await this.api.delete(`/flat-members/${id}`);
  }

  // Flat Allocation Requests
  async getFlatAllocationRequests(): Promise<FlatAllocationRequest[]> {
    const response: AxiosResponse<ApiResponse<FlatAllocationRequest[]>> = await this.api.get('/flat-allocation-requests');
    return response.data.data || [];
  }

  async createFlatAllocationRequest(data: FlatAllocationFormData): Promise<FlatAllocationRequest> {
    const response: AxiosResponse<ApiResponse<FlatAllocationRequest>> = await this.api.post('/flat-allocation-requests', data);
    return response.data.data!;
  }

  async approveFlatAllocationRequest(id: string): Promise<FlatAllocationRequest> {
    const response: AxiosResponse<ApiResponse<FlatAllocationRequest>> = await this.api.put(`/flat-allocation-requests/${id}/approve`);
    return response.data.data!;
  }

  async rejectFlatAllocationRequest(id: string): Promise<FlatAllocationRequest> {
    const response: AxiosResponse<ApiResponse<FlatAllocationRequest>> = await this.api.put(`/flat-allocation-requests/${id}/reject`);
    return response.data.data!;
  }

  // Complaints
  async getComplaints(): Promise<Complaint[]> {
    const response: AxiosResponse<ApiResponse<Complaint[]>> = await this.api.get('/complaints');
    return response.data.data || [];
  }

  async createComplaint(data: CreateComplaintRequest): Promise<Complaint> {
    const response: AxiosResponse<ApiResponse<Complaint>> = await this.api.post('/complaints', data);
    return response.data.data!;
  }

  async updateComplaint(id: string, data: Partial<CreateComplaintRequest>): Promise<Complaint> {
    const response: AxiosResponse<ApiResponse<Complaint>> = await this.api.put(`/complaints/${id}`, data);
    return response.data.data!;
  }

  async deleteComplaint(id: string): Promise<void> {
    await this.api.delete(`/complaints/${id}`);
  }

  // Maintenance Bills
  async getMaintenanceBills(): Promise<MaintenanceBill[]> {
    const response: AxiosResponse<ApiResponse<MaintenanceBill[]>> = await this.api.get('/maintenance-bills');
    return response.data.data || [];
  }

  async payMaintenanceBill(id: string): Promise<MaintenanceBill> {
    const response: AxiosResponse<ApiResponse<MaintenanceBill>> = await this.api.put(`/maintenance-bills/${id}/pay`);
    return response.data.data!;
  }

  // Notices
  async getNotices(): Promise<Notice[]> {
    const response: AxiosResponse<ApiResponse<Notice[]>> = await this.api.get('/notices');
    return response.data.data || [];
  }

  async createNotice(data: CreateNoticeRequest): Promise<Notice> {
    const response: AxiosResponse<ApiResponse<Notice>> = await this.api.post('/notices', data);
    return response.data.data!;
  }

  async updateNotice(id: string, data: Partial<CreateNoticeRequest>): Promise<Notice> {
    const response: AxiosResponse<ApiResponse<Notice>> = await this.api.put(`/notices/${id}`, data);
    return response.data.data!;
  }

  async deleteNotice(id: string): Promise<void> {
    await this.api.delete(`/notices/${id}`);
  }

  // Visitor Logs
  async getVisitorLogs(): Promise<VisitorLog[]> {
    const response: AxiosResponse<ApiResponse<VisitorLog[]>> = await this.api.get('/visitor-logs');
    return response.data.data || [];
  }

  async createVisitorLog(data: CreateVisitorLogRequest): Promise<VisitorLog> {
    const response: AxiosResponse<ApiResponse<VisitorLog>> = await this.api.post('/visitor-logs', data);
    return response.data.data!;
  }

  async approveVisitorLog(id: string): Promise<VisitorLog> {
    const response: AxiosResponse<ApiResponse<VisitorLog>> = await this.api.put(`/visitor-logs/${id}/approve`);
    return response.data.data!;
  }

  async rejectVisitorLog(id: string): Promise<VisitorLog> {
    const response: AxiosResponse<ApiResponse<VisitorLog>> = await this.api.put(`/visitor-logs/${id}/reject`);
    return response.data.data!;
  }

  async recordVisitorExit(id: string): Promise<VisitorLog> {
    const response: AxiosResponse<ApiResponse<VisitorLog>> = await this.api.put(`/visitor-logs/${id}/exit`);
    return response.data.data!;
  }

  // WebSocket
  connectWebSocket(token: string): Socket {
    this.socket = io(WS_URL, {
      auth: {
        token
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });

    return this.socket;
  }

  disconnectWebSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export const apiService = new ApiService();