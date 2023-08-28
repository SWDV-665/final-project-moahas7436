import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private baseUrl = 'http://localhost:3000';  // The base URL for your Node.js server

  constructor(private http: HttpClient) { }

  // ... other methods ...

  updateMeal(id: string, mealData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/meals/${id}`, mealData);
  }

  // ... any other methods related to meals ...
}
