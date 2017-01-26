// angular
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { Config } from '../../core/index';
import { Analytics, AnalyticsService } from '../../analytics/index';
import { DIRECTORY } from '../common/category.common';

// module
import { IDirectoryState } from '../states/index';
import * as actions from '../actions/directory.action';

import {ProblemRaw} from '../models/index';
import {AppConfig} from './app-config';

@Injectable()
export class DirectoryService extends Analytics {

  constructor(
    public analytics: AnalyticsService,
    private store: Store<IDirectoryState>,
    private http: Http
  ) {
    super(analytics);
    this.category = DIRECTORY;
  }

  getMenuItems(): Observable<any[]> {
    return this.http.get(AppConfig.API_BASE + 'directories/tree')
      .map(res => res.json());
  }

  getProblemsRaws(directoryId:string): Observable<ProblemRaw[]>{
    return this.http.get(AppConfig.API_BASE + 'problems/directories/' + directoryId)
      .map(res => res.json());
  }
}
