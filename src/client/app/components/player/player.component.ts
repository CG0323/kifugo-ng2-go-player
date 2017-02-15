import { Injector, Component } from '@angular/core';
import { Location} from '@angular/common';
import { Config } from '../../shared/core/index';
import {Router, ActivatedRoute} from '@angular/router';
import { IAppState, getStones, getSequence, getBoardKifu, getComment, getIsNotInKifu,getIsFirst, getIsLast} from '../../shared/ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import * as playerAction from '../../shared/kifugo/actions/player.action'
import { Kifu, Stone } from '../../shared/kifugo/models/index'
@Component({
  moduleId: module.id,
  selector: 'go-player',
  templateUrl: 'player.component.html',
  styleUrls: [
    'player.component.css',
  ],
})
export class PlayerComponent {
    private disabled$ : Observable<boolean>;
    private isFirst$ : Observable<boolean>;
    private isLast$ : Observable<boolean>;
    private comment$: Observable<string>;
    private kifu$: Observable<Kifu>;
    private stones$: Observable<{[strName:string]:Stone}>;
    private currentSequence$: Observable<number>;
  constructor(private store: Store<IAppState>, private router: Router, private route: ActivatedRoute, private location:Location) {
      let id = this.route.snapshot.params['id'];
      this.store.dispatch(new playerAction.InitAction(id));

      this.disabled$ = store.let(getIsNotInKifu);
      this.isFirst$ = store.let(getIsFirst);
      this.isLast$ = store.let(getIsLast);
      this.comment$ = store.let(getComment);
      this.kifu$ = store.let(getBoardKifu);
      this.stones$ = store.let(getStones);
      this.currentSequence$ = store.let(getSequence);
  }

  onStart(){
      this.store.dispatch(new playerAction.StartAction());
    }

  onNext(){
      this.store.dispatch(new playerAction.NextAction());
    }

  onPrev(){
      this.store.dispatch(new playerAction.PrevAction());
    }
  goBack(){
      this.location.back();
  }
}
