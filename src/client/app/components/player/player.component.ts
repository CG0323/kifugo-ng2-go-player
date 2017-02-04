import { Injector, Component } from '@angular/core';
import { Config } from '../../shared/core/index';
import {Router, ActivatedRoute} from '@angular/router';
import { IAppState, getBoardKifu, getComment} from '../../shared/ngrx/index';
import { Store } from '@ngrx/store';
import * as boardAction from '../../shared/kifugo/actions/board.action'

@Component({
  moduleId: module.id,
  selector: 'go-player',
  templateUrl: 'player.component.html',
  styleUrls: [
    'player.component.css',
  ],
})
export class PlayerComponent {

  constructor(private store: Store<IAppState>, private router: Router, private route: ActivatedRoute) {
      let id = this.route.snapshot.params['id'];
      this.store.dispatch(new boardAction.InitAction(id));
  }
}
