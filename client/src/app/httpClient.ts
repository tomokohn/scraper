/**
 * Created by Rotem on 29/01/2017.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {Router} from "@angular/router";

@Injectable()
export class HttpClient {

  constructor(private http:Http) {

  }



  get(url:string):Observable<Response> {
    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });
    return this.http.get(url, options);
  }

  post(url:string, data:any):Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, data, options);
  }

  put(url:string, data:any):Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, data, options);
  }

  delete(url:string):Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(url,options);
  }

  handleError(error:Response | any):Observable<string> {
    return Observable.throw(error);
  }
}
