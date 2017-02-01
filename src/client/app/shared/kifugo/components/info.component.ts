import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { LazyLoadEvent} from 'primeng/primeng';
import { IAppState, getBoardKifu} from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import { Kifu } from '../models/index'

@Component({
  moduleId: module.id,
  selector: 'info',
  templateUrl: 'info.component.html',
  styleUrls: [
    'info.component.css',
  ],
  changeDetection: ChangeDetectionStrategy.Default
})

export class InfoComponent implements OnInit, OnDestroy {
    private kifu: Kifu;
    private dt: string;
    private pb: string;
    private pw: string;
    private pc: string;
    private re: string;
    private km: string;
    private name: string;
    private br: string;
    private wr: string;
    private subscription;
    constructor(private store: Store<IAppState>) {
        this.subscription = store.let(getBoardKifu).subscribe(k=>{
            if(!k)
                return;
            var kifu:Kifu = <Kifu>k;
            
            this.dt = this.getDate(kifu.dt);
            this.pb = kifu.pb;
            this.pw = kifu.pw;
            this.pc = kifu.pc;
            this.re = kifu.re;
            this.km = kifu.km;
            this.name = kifu.name;
            this.br = kifu.br;
            this.wr = kifu.wr;
        })
    }

    ngOnInit():void {
       
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getDate(dt:any){
        var matchDate = new Date(dt);
        return matchDate.toLocaleDateString();
    }
}


