import {Move,Markup} from './index'

export interface KNode{
    parent?: KNode;
    setup?: Move[];
    markup?: Markup[];
    comment?: string;
    children?: KNode[];
    move?: Move;
}