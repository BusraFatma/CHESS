import { Component, Input, OnInit } from '@angular/core';
import { Piece, King, Pawn, Castle, Knight, Bishop, Check, Move, Pawn2 } from '../piece';
import { Location } from '../location'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input() name: string;

  alphabet: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  numbers: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8]

  location: Location[][];

  selectedLocation: Location;

  constructor() { }

  ngOnInit(): void {

    this.location = new Array<Array<Location>>()

    for (let i = 0; i < 8; i++) {
      this.location.push(new Array<Location>())
      for (let j = 0; j < 8; j++) {

        if ((i == 0 && j == 0) || (i == 0 && j == 7)) {
          this.location[i].push(new Location(new Castle('assets/images/castle.png')))
        }
        else if (i == 0 && (j == 1 || j == 6)) {
          this.location[i].push(new Location(new Knight("assets/images/knight.png")));
        }
        else if (i == 0 && (j == 2 || j == 5)) {
          this.location[i].push(new Location(new Bishop("assets/images/bishop.png")));
        }
        else if (i == 0 && j == 3) {
          this.location[i].push(new Location(new King("assets/images/check.png")));
        }
        else if (i == 0 && j == 4) {
          this.location[i].push(new Location(new Check("assets/images/king.png")));
        }
        else if (i == 1) {
          this.location[i].push(new Location(new Pawn("assets/images/pawn.png")));
        }
        else if (i == 7 && (j == 0 || j == 7)) {
          this.location[i].push(new Location(new Castle("assets/images/castle-w.png")));
        }
        else if (i == 7 && (j == 1 || j == 6)) {
          this.location[i].push(new Location(new Knight("assets/images/knight-w.png")));
        }
        else if (i == 7 && (j == 2 || j == 5)) {
          this.location[i].push(new Location(new Bishop("assets/images/bishop-w.png")));
        }
        else if (i == 7 && j == 3) {
          this.location[i].push(new Location(new Check("assets/images/check-w.png")));
        }
        else if (i == 7 && j == 4) {
          this.location[i].push(new Location(new King("assets/images/king-w.png")));
        }
        else if (i == 6) {
          this.location[i].push(new Location(new Pawn2("assets/images/pawn-w.png")));
        }
        else { this.location[i].push(new Location(new Piece(""))); }
      }

    }
    console.log(this.location);

  }

  select(i, j) {
    this.moveClear()
    const pieces = this.location[i][j].piece
    if (pieces) {
      for (let x = 0; x < pieces.moves.length; x++) {
        if ((i + pieces.moves[x].x) < 0 || (i + pieces.moves[x].x) > 7 || (j + pieces.moves[x].y) < 0 || (j + pieces.moves[x].y) > 7) {
          continue
        }
        else {
          this.selectedLocation = this.location[i + pieces.moves[x].x][j + pieces.moves[x].y]
          this.selectedLocation.highlight = true
        }        
        if (this.selectedLocation.piece.image.length > 0) {
          this.selectedLocation.highlight = false
        }
        
      }
    }
  }

  moveClear() {
    for (let i = 0; i < this.location.length; i++) {
      for (let j = 0; j < this.location.length; j++) {
        this.location[i][j].highlight = false
      }
    }
  }

  drop(i) {
    i.preventDefault();
    var data1 = i.dataTransfer.getData("img");
    i.target.appendChild(document.getElementById(data1));
    console.log(data1);
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(i) {
    i.dataTransfer.setData("img", i.target.id);
  }

}
