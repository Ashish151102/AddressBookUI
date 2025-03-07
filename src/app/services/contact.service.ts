import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiBaseUrl + '/addressbook';

  constructor(private http: HttpClient) {}

  // Fetch all contacts
  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Add a new contact
  addContact(contact: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, contact);
  }

  // Update an existing contact
  updateContact(id: String, contact: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, contact);
  }

  // Delete a contact
  deleteContact(id: String): Observable<any> {
    return this.http.delete(`http://localhost:8080/addressbook/delete/${id}`)
    .pipe(
      catchError(error => {
        console.error('Delete failed:', error);
        return throwError(() => new Error('Failed to delete contact'));
      })
    );
  }

  getContactById(id: String): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}