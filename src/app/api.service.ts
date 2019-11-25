import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Data } from "./models/data.model";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postData(endPoint: String, data: Array<Object>) {
    return this.http.post<any>(`http://localhost:3000/${endPoint}`, data);
  }
}
