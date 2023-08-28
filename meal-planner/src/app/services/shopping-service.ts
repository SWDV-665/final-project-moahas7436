import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ShoppingItem {
  _id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error.
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something went wrong; please try again later.');
  }

  getShoppingItems(): Observable<ShoppingItem[]> {
    return this.http.get<ShoppingItem[]>(`${this.baseUrl}/shopping-items`).pipe(
      catchError(this.handleError)
    );
}

  addShoppingItem(itemData: ShoppingItem): Observable<ShoppingItem> {
    return this.http.post<ShoppingItem>(`${this.baseUrl}/shopping-items`, itemData).pipe(
      catchError(this.handleError)
    );
  }

  updateItem(id: string, itemData: ShoppingItem): Observable<ShoppingItem> {
    return this.http.put<ShoppingItem>(`${this.baseUrl}/shopping-items/${id}`, itemData).pipe(
      catchError(this.handleError)
    );
  }

  deleteItem(id: string): Observable<{}> {
    return this.http.delete(`${this.baseUrl}/shopping-items/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
