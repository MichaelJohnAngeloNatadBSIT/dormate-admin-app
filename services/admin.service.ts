import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'interface/user';
import { Dorm } from 'interface/dorm.model';
import { environment } from '../src/environments/environment';
import { Schedule } from 'interface/schedule';
import { Payment } from 'interface/payment';


// const API_URL = 'http://localhost:8080/api/admin/';
// const API_URL = 'http://192.168.1.178:8080/api/admin/';
const API_URL = environment.baseURL+'admin/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllUser(): Observable<User[]>{
    return this.http.get<User[]>(API_URL + 'all_user');
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${API_URL}find_one_user/${id}`);
  }

  getCountUser(): Observable<User[]>{
    return this.http.get<User[]>(API_URL + 'count_user');
  }

  getAllDorm(): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(API_URL + 'all_dorm');
  }

  getCountDorm(): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(API_URL + 'count_dorm');
  }

  getCountDormApproved(): Observable<Dorm[]>{
    return this.http.get<Dorm[]>(API_URL + 'count_dorm_approved');
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}update_user/${id}`, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${API_URL}delete_user/${id}`);
  }

  getDormById(id: any): Observable<Dorm> {
    return this.http.get<Dorm>(`${API_URL}find_one_dorm/${id}`);
  }

  updateDormInfo(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}update_dorm/${id}`, data);
  }

  deleteDorm(id: any): Observable<any> {
    return this.http.delete(`${API_URL}delete_dorm/${id}`);
  }

  getAllSchedule(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(API_URL + 'all_schedule');
  }

  getCountSchedule(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(API_URL + 'count_schedule');
  }

  getAllPayment(): Observable<Payment[]>{
    return this.http.get<Payment[]>(API_URL + 'all_payment');
  }

  getCountPayment(): Observable<Payment[]>{
    return this.http.get<Payment[]>(API_URL + 'count_payment');
  }

  getTotalPayment(): Observable<Payment[]>{
    return this.http.get<Payment[]>(API_URL + 'total_payment');
  }
}
