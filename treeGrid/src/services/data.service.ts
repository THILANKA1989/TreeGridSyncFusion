import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseItemArray } from "../app/models/data.model";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllData(requestForm: any): Observable<any> {
    //created for body and pagination requests not implementing that for now
    return this.http.get<any>(this.baseUrl + 'paginatedAll/'+requestForm.pageSize+'/'+requestForm.pageNumber);
  }

  getSingleData(id: string): Observable<any> {
    //created for body and pagination requests not implementing that for now
    return this.http.get<any>(this.baseUrl + 'data/' + id);
  }

  updateJson(updateObj: BaseItemArray): Observable<any> {
    //created for body and pagination requests not implementing that for now
    return this.http.post<any>(this.baseUrl + '/updateJson', updateObj);
  }

}
