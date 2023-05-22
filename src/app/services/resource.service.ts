import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResource, IBookingRequest } from '../interfaces/resource';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  resourceUrl: string = "https://localhost:7282/api/resources";
  bookingUrl: string = "https://localhost:7282/api/booking";

  constructor(private _http: HttpClient) { }

  getResources(): Observable<IResource[]>{
    return this._http.get<IResource[]>(this.resourceUrl);
  }

  bookResource(request: IBookingRequest): Observable<any>{
    return this._http.post<IBookingRequest>(this.bookingUrl, request);
  }

}
