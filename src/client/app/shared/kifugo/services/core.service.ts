import { Injectable } from '@angular/core';
import { parseFromSgf } from 'node-sgf-parser/node-sgf-parser';
import { KNode, Kifu, Stone } from '../models/index'

@Injectable()
export class CoreService{
    static parseKifuDetail(kifu:Kifu):Kifu{
        var temp = parseFromSgf(kifu.sgf);
        var retVal:Kifu =  Object.assign({},kifu);
        retVal.br = temp.info.black.rank;
        retVal.ha = temp.info.HA;
        retVal.km = temp.info.KM;
        retVal.pc = temp.info.PC;
        retVal.re = temp.info.RE;
        retVal.wr = temp.info.white.rank;
        retVal.root = temp.root;
        return retVal;
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
           coordinates.push(String.fromCharCode(64 + i));
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

    /**
     * Check if a position is on the board.
     * @param x: x coordinate
     * @param y: y coordinate
     */ 
    static isOnBoard(x: number, y: number): boolean {
        if (x >= 19 || y >= 19 || x < 0 || y < 0) return false;
        return true;
    }

     /**
     * Helper to get the first key of an object, return null if empty.
     * @param obj: object
     */    
    static getFirst(obj): string {
        for(let prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                return prop;
            }
        }
        return null;
    }

    /**
     * Helper to check if an object is empty.
     * @param obj: object
     */
    static isEmpty(obj): boolean {
        for(let prop in obj) {
            if(obj.hasOwnProperty(prop)) return false;
        }
        return true && JSON.stringify(obj) === JSON.stringify({});
    }

    /**
     * Helper to get the length of an object.
     * @param obj: object
     */
    static getLength(obj): number {
        let length = 0;
        for(let prop in obj) {
            if(obj.hasOwnProperty(prop)) length++;
        }
        return length;
    }

    /**
     * Helper to stringify an x, y position (<e.g.> x = 1, y = 2) to a string (<e.g.> "1,2").
     * @param x: x coordinate
     * @param y: y coordinate
     */
    static xy2str(x: number, y: number): string {
        return x + "," + y; 
    }

    /**
     * Helper to de-stringify a string (<e.g.> "1,2") to a poisition object (<e.g.> {x: 1, y: 2}).
     * @param str: string representation of a position object
     */
    static str2pos(str: string): {x: number; y: number;} {
        let res = str.split(",");
        return {x: parseInt(res[0]), y: parseInt(res[1])};
    }
    
    /**
     * Helper to stringify a poisition object (<e.g.> {x: 1, y: 2}) to a string (<e.g.> "1,2").
     * @param pos: a position object
     */
    static pos2str(pos): string {
        return pos.x + "," + pos.y; 
    }

    /**
     * Get the group where the input position resides.
     * @param x: x coordinate
     * @param y: y coordinate
     */     
    static getSelfGroup(stones: {[strName: string]: Stone}, x: number, y: number): {[strName: string]: Stone} {
        let pos = this.xy2str(x,y);
        let color = stones[pos].c;
        let explore = {};
        let visited: {[strName: string]: Stone} = {};
        explore[this.xy2str(x, y)] = true;
        while (!this.isEmpty(explore)) {
            let str = this.getFirst(explore);
            let pos = this.str2pos(str);
            let adjacent = [{x: pos.x - 1, y: pos.y}, {x: pos.x + 1, y: pos.y},
                {x: pos.x, y: pos.y + 1}, {x: pos.x, y: pos.y - 1}];
            visited[str] = stones[str];
            delete explore[str];
            for (let i = 0; i < 4; i++) {
                let currStr = this.pos2str(adjacent[i]);
                let currX = adjacent[i].x;
                let currY = adjacent[i].y;
                if (stones.hasOwnProperty(currStr) &&  stones[currStr].c == color
                    && !visited[currStr] && !explore[currStr]) {
                        explore[currStr] = true;
                    }
            }
        }
        return visited;
    }

    /**
     * Get an array of groups which are input position's group's neighbors.
     * @param x: x coordinate
     * @param y: y coordinate
     */     
    static getNeighbors(stones: {[strName: string]: Stone}, x: number, y: number): {[strName: string]: Stone}[] {
        let pos = this.xy2str(x,y);
        let color = stones[pos].c;      
        let group = this.getSelfGroup(stones,x, y);
        let neighborStones = {};
        let neighborGroups = [];
        while (!this.isEmpty(group)) {
            let str = this.getFirst(group);
            let pos = this.str2pos(str);
            let adjacent = [{x: pos.x - 1, y: pos.y}, {x: pos.x + 1, y: pos.y},
                {x: pos.x, y: pos.y + 1}, {x: pos.x, y: pos.y - 1}];
            delete group[str];
            for (let i = 0; i < 4; i++) {
                let currStr = this.pos2str(adjacent[i]);
                if (stones.hasOwnProperty(currStr) && stones[currStr].c == -color
                    && !neighborStones[currStr]) {
                        neighborStones[currStr] = stones[currStr];
                    }
            }
        }
        while (!this.isEmpty(neighborStones)) {
            let str = this.getFirst(neighborStones);
            let pos = this.str2pos(str);
            let neighborGroup = this.getSelfGroup(stones, pos.x, pos.y);
            for(let prop in neighborGroup) {
                if(neighborGroup.hasOwnProperty(prop)) {
                    delete neighborStones[prop];
                }
            }      
            neighborGroups.push(neighborGroup);      
        }    
        return neighborGroups;
    }

     /**
     * Remove all stones in the input group.
     * @param group: a group of stones
     */   
    static removeGroup(stones:{[strName: string]: Stone}, group:{[strName: string]: Stone}): void {
        for(let prop in group) {
            if(group.hasOwnProperty(prop)) {
                delete stones[prop];
            }
        }         
    }

    /**
     * Count the liberties of a group.
     * @param group: a group of stones
     */      
    static countGroupLiberties(stones:{[strName: string]: Stone}, group:{[strName: string]: Stone}): number {
        let explore = {};
        for(let prop in group) {
            if(group.hasOwnProperty(prop)) {
                explore[prop] = true;
            }
        }
        let liberties = {};
        while (!this.isEmpty(explore)) {
            let str = this.getFirst(explore);
            let pos = this.str2pos(str);
            let adjacent = [{x: pos.x - 1, y: pos.y}, {x: pos.x + 1, y: pos.y},
                {x: pos.x, y: pos.y + 1}, {x: pos.x, y: pos.y - 1}];
            delete explore[str];
            for (let i = 0; i < 4; i++) {
                let currStr = this.pos2str(adjacent[i]);
                let currX = adjacent[i].x;
                let currY = adjacent[i].y;
                if (this.isOnBoard(currX, currY) && !stones.hasOwnProperty(currStr)
                    && !liberties[currStr]) {
                        liberties[currStr] = true;
                    }
            }
        }
        return this.getLength(liberties);
    }

    /**
     * Count the liberties of a group where the input position resides.
     * @param x: x coordinate
     * @param y: y coordinate
     */      
    static countLiberties(stones:{[strName: string]: Stone}, x: number, y: number): number {
        let group = this.getSelfGroup(stones,x, y);
        return this.countGroupLiberties(stones, group);
    }

    /**
     * Compute the stones to be removed after the last move
     * @param lastX: x coordinate of last move
     * @param lastY: y coordinate of last move
     */      
    static computeRemoveStones(stones:{[strName: string]: Stone}, lastX: number, lastY: number): {[strName: string]: Stone} {
        let removeStones = {};
        let neighborGroups = this.getNeighbors(stones, lastX, lastY);
            for (let i = 0; i < neighborGroups.length; i++) {
                if (this.countGroupLiberties(stones,neighborGroups[i]) == 0) {
                    for(let prop in neighborGroups[i]) {
                        if(neighborGroups[i].hasOwnProperty(prop)) {
                            removeStones[prop] = neighborGroups[i][prop]
                        }
                    } 
                }
            }
        return removeStones;
    }
}