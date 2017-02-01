// angular
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Config } from '../../core/index';
import { Analytics, AnalyticsService } from '../../analytics/index';
import { KIFU } from '../common/category.common';

import {Kifu} from '../models/index';
import {AppConfig} from './app-config';

@Injectable()
export class KifuService extends Analytics {

  constructor(
    public analytics: AnalyticsService,
    private http: Http
  ) {
    super(analytics);
    this.category = KIFU;
  }

  getKifuAbstracts(): Observable<Kifu[]>{
    return this.http.get(AppConfig.API_BASE + 'kifus/abstract')
      .map(res => res.json());
  }

  searchKifus(first:number, rows:number, player:string):Observable<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    var params = {first:first, rows:rows, player:player};
    return this.http.post(AppConfig.API_BASE + 'kifus/search', params, options)
      .map(res => {
        return {res:res.json(), params:params};
      });
  }

  deleteKifu(id:string):Observable<any>{
    return this.http.delete(AppConfig.API_BASE + 'kifus/' + id)
      .map(res => {
        return {res:res.json()};
      });
  }

}
