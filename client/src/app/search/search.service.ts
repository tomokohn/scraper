import { Injectable } from '@angular/core';

import {Response} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {HttpClient} from "../httpClient";
import {Observable} from "rxjs/Observable";

@Injectable()
export class SearchService {

  constructor(private http:HttpClient) { }

  severUrl:string ='http://localhost:8081'

  scrapeWalmart(url):Observable<any>{
    let payload = {
      url: url
    }
    console.log(payload)
    return this.http.post(this.severUrl +'/walmart/',payload)
      .map((res:Response)=>{
        console.log("res walmart: ",res.json());
        return res.json()

    })
      .catch((e:Response | any)=> { return this.http.handleError(e)});
  }

  scrapeToys(url):Observable<any>{
    let payload = {
      url: url
    }
    console.log(payload)
    return this.http.post(this.severUrl +'/toysrus/',payload)
      .map((res:Response)=>{
        console.log("res toys r us: ",res.json());
        return res.json()

      })
      .catch((e:Response | any)=> { return this.http.handleError(e)});
  }

  srearchAmzonAsin(data){
    let titles = [];
    for (let i=0; i<data.length; i++){
      titles.push(data[i].title);
    }
    return this.http.post(this.severUrl +'/amazon/',titles)
      .map((res:Response)=>{
        console.log("res amazon: ",res.json());
        return res.json()

      })
      .catch((e:Response | any)=> { return this.http.handleError(e)});
  }

  srearchAmzonProducts(data){
    return this.http.post(this.severUrl +'/products/',data)
      .map((res:Response)=>{
        console.log("res amazon: ",res.json());
        return res.json()

      })
      .catch((e:Response | any)=> { return this.http.handleError(e)});
  }
}




