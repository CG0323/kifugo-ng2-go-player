import { Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { MenuItem, SlideMenuModule } from 'primeng/primeng';
import { IAppState} from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';



@Component({
  moduleId: module.id,
  selector: 'go-control',
  templateUrl: 'control.component.html',
  styleUrls: [
    'control.component.css',
  ],
})

export class ControlComponent implements OnInit, OnDestroy {
      constructor(private store: Store<IAppState>) {
        
    }
    
    ngOnInit():void {
       
    }
    
    ngOnDestroy() {
    }

}


