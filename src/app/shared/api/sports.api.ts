import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NULL_SPORT, Sport } from '@domain/sport.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SportsApi{
  #apiUrl = 'http://localhost:3000/deportes';
  #http = inject(HttpClient);

  // * Public methods division

  /**
   * Get all sports from the API
   * @returns An observable with the sports
   */
  getActivities$(): Observable<Sport[]> {
    return this.#http.get<Sport[]>(this.#apiUrl);
  }

  /**
   * Get an sport by its id from the API
   * @param id The id of the sport to get
   * @returns An observable with the sport or NULL_SPORT if not found
   */
  getCategoryBy$(id: number | undefined): Observable<Sport>  {
    if (!id) return of(NULL_SPORT);
    const url = `${this.#apiUrl}?id=${id}`;
    return this.#http.get<Sport[]>(url).pipe(
      map((sports) => sports[0] || NULL_SPORT),
      catchError((error) => {
        console.error('Error getting sport', error);
        return of(NULL_SPORT);
      }),
    );
  }
}