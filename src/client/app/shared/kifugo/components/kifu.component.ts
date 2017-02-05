import { Component, Input, Output, OnInit,EventEmitter, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { LazyLoadEvent, DataTable} from 'primeng/primeng';
import { Kifu } from '../models/index'


@Component({
  moduleId: module.id,
  selector: 'kifu',
  templateUrl: 'kifu.component.html',
  styleUrls: [
    'kifu.component.css',
  ]
})

export class KifuComponent implements OnInit {
    @ViewChild('dt') dataTable: DataTable;
    @Input() kifus : Kifu[];
    @Input() totalCount : number;
    @Output() loadKifus = new EventEmitter<any>();
    @Output() deleteKifu = new EventEmitter<any>();
    @Output() selectKifu = new EventEmitter<any>();
    private globalFilter: string;

    constructor(private router: Router, private route: ActivatedRoute) {
    }
    ngOnInit():void {
       let first = +this.route.snapshot.queryParams['first'];
       if(first){
        this.setCurrentPage(first);
       }
       this.globalFilter = this.route.snapshot.queryParams['search'];
    }
    

    getDate(dt:string){
        var matchDate = new Date(dt);
        return matchDate.toLocaleDateString();
    }

    onLoadKifusLazy(event: LazyLoadEvent) {
        this.loadKifus.emit({first:event.first, rows: event.rows, player: this.globalFilter})
    }

    onDeleteKifu(k: Kifu){
        this.deleteKifu.emit(k._id);
    }

    onSelectKifu(k: Kifu){
        this.selectKifu.emit(k._id);
    }

    /**
     * Set datatable page from outside, workaround to 'remember the page number in url'
     * @param n
     */
    setCurrentPage(first: number) {

        let paging = {
            first: first,
            rows: 20
        };
        this.dataTable.paginate(paging);
    }

     /**
     * A tricky workaround to force requesting data from backend when globalFilter changes
     */
    filterChange(newValue){
        this.globalFilter = newValue;
        let paging = {
            first: this.dataTable.first,
            rows: 20
        };
        this.dataTable.paginate(paging);
    }

}


