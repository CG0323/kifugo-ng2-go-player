import { Injectable } from '@angular/core';
import { parseFromSgf } from 'node-sgf-parser/node-sgf-parser';
import { KNode } from '../models/index'

@Injectable()
export class CoreService{
    parseSgf(sgf:string):KNode{
        return <KNode>(parseFromSgf(sgf).root);
    }

    static createGrid = ()=>{
                    var grid:number[][]  = [];
                    for (var i = 0; i < 19; i++) {
                        grid[i] = [];
                        for (var j = 0; j < 19; j++) {
                            grid[i][j] = 0;
                        }
                    }
                    return grid;
                };

   static createMarkup = ()=>{
                    var grid:string[][]  = [];
                    for (var i = 0; i < 19; i++) {
                        grid[i] = [];
                        for (var j = 0; j < 19; j++) {
                            grid[i][j] = null;
                        }
                    }
                    return grid;
                };
   static getCoordinates = ()=>{
       var coordinates:string[] = [];
       for(var i = 1; i <=19; i++){
           coordinates.push(String.fromCharCode(64 + i) + i);
       }
       
       return coordinates;
    }
    /**
     * Helper to get lines of the board grid for svg drawing.
     * @param dim: dimension
     */    
    static getLines = (dim: number)=> {
        let lines = [];
        let end = 500 * dim -240;
        for (let i = 0; i < dim; i++) {
            lines.push({a: 500 * i + 250, b: end});
        }
        return lines;
    }

    
    /**
     * Helper to get circles of the board stars for svg drawing.
     * @param dim: dimension
     */        
    static getStars = (dim: number)=>{
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
}