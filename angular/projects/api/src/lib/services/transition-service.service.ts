import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { transition } from 'types';

@Injectable({
  providedIn: 'root'
})
export class TransitionServiceService {

  url="http://localhost:3000"
  options={headers:new HttpHeaders({'content-Type':'application/json'})}

  constructor(private http:HttpClient) { }


  getAllTransition():Observable<any>{
    return this.http.get<any>(`${this.url}/transition/alltransition`)
  }

  addTransition(t:transition):Observable<transition[]>{
    return this.http.post<transition[]>(`${this.url}/transition/addTransition`,t,this.options)
  }



  deleteTransition(name:any):Observable<any>{
   // console.log("name",name);
    //console.log(`${this.url}/status/deleteStatus`,name);
    return this.http.post<any>(`${this.url}/transition/deleteTransition`,{name},this.options)
  }
}
