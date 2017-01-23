// app
import {Component, Input, OnInit, OnDestroy} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'go-board',
  templateUrl: 'board.component.html',
  styleUrls: [
    'board.component.css',
  ],
})

export class BoardComponent implements OnInit, OnDestroy {
    
    dim: number = 19;                           // board dimension
    lines = this.getLines(19);                  // lines for board grids
    stars = this.getStars(19);                  // circles for board stars
    grid: number[][] = this.createGrid(19);
    constructor() {}
    
    ngOnInit():void {

    }
    
    ngOnDestroy() {

    }
    
    /**
     * Helper to get lines of the board grid for svg drawing.
     * @param dim: dimension
     */    
    getLines(dim: number): {a: number; b: number;}[] {
        let lines = [];
        let end = 500 * dim -240;
        for (let i = 0; i < dim; i++) {
            lines.push({a: 500 * i + 250, b: end});
        }
        return lines;
    }

        /**
     * Helper to generate a dim*dim 2D array.
     * @param dim: dimension
     */
    createGrid(dim: number): number[][] {
        let grid = [];
        for (let i = 0; i < dim; i++) {
            grid[i] = [];
            for (let j = 0; j < dim; j++) {
                grid[i][j] = 0;
            }
        }
        return grid;
    }
    
    /**
     * Helper to get circles of the board stars for svg drawing.
     * @param dim: dimension
     */        
    getStars(dim: number): {x: number; y: number;}[] {
        let stars = [];
        if (dim == 19) {
            stars.push(
                {x: 250 + 500 * 3, y: 250 + 500 * 3},
                {x: 250 + 500 * 9, y: 250 + 500 * 3},
                {x: 250 + 500 * 15, y: 250 + 500 * 3},
                {x: 250 + 500 * 3, y: 250 + 500 * 9},
                {x: 250 + 500 * 9, y: 250 + 500 * 9},
                {x: 250 + 500 * 15, y: 250 + 500 * 9},
                {x: 250 + 500 * 3, y: 250 + 500 * 15},
                {x: 250 + 500 * 9, y: 250 + 500 * 15},
                {x: 250 + 500 * 15, y: 250 + 500 * 15});
        } else if (dim == 13) {
            stars.push(
                {x: 250 + 500 * 3, y: 250 + 500 * 3},
                {x: 250 + 500 * 3, y: 250 + 500 * 9},
                {x: 250 + 500 * 9, y: 250 + 500 * 3},
                {x: 250 + 500 * 9, y: 250 + 500 * 9});
        } else if (dim == 9) {
            stars.push(
                {x: 250 + 500 * 4, y: 250 + 500 * 4});
        }
        return stars;
    } 
    /**
     * Helper to convert a number to a letter.
     * @param num: a number >= 1 && <= 26
     */    
    num2letter(num: number): string {
        if(num >= 1 && num <= 26) {
            return String.fromCharCode(64 + num);
        }
        return "";
    }
}
