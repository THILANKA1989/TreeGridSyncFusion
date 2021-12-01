import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestModel } from "../apiutils/request-model";
import { ResponseModel } from "../apiutils/response-model";

@Injectable({
  providedIn: 'root'
})

export class DataService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getAllData(requestForm: RequestModel): Observable<ResponseModel> {
    //created for body and pagination requests not implementing that for now
    return this.http.get<ResponseModel>(this.baseUrl + 'data');
  }


  gatSingleData(id:string): Observable<ResponseModel> {
    //created for body and pagination requests not implementing that for now
    return this.http.get<ResponseModel>(this.baseUrl + 'data/' + id);
  }

}
