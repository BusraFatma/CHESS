import { Piece } from "./piece";

export class Location{
    public piece: Piece;
    public highlight: boolean = false


    constructor(piece: Piece | null){
        this.piece = piece
    }

}