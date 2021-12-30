import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { status } from 'types';

@Injectable({
  providedIn: 'root'
})
export class StatusServiceService {
  url="http://localhost:3000"
  options={headers:new HttpHeaders({'content-Type':'application/json'})
}

  constructor(private http:HttpClient) { }

  getAllStatus():Observable<any>{
    return this.http.get<any>(`${this.url}/status/allStatus`)
  }

  addStatus(s:status):Observable<status[]>{
    return this.http.post<status[]>(`${this.url}/status/addStatus`,s,this.options)
  }

  deleteStatus(name:any):Observable<any>{
    //console.log("name",name);
   // console.log(`${this.url}/status/deleteStatus`,name);
    return this.http.post<any>(`${this.url}/status/deleteStatus`,{name},this.options)
  }
  reset():Observable<any>{
    return this.http.get<any>(`${this.url}/status/reset`)
  }

  updateStatus(s:status):Observable<status[]>{
    return this.http.post<status[]>(`${this.url}/status/updateStatus`,s,this.options)
  }

}
