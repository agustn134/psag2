import { Component, HostBinding, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GamesService } from '../../services/games.service';


@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: ''
  };

  errorMessage: string = ''; // To store error messages
  successMessage: string = ''; // To store success messages
  edit: boolean = false; // To track if in edit mode

  constructor(
    private gameService: GamesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
      const params = this.activatedRoute.snapshot.params;
      if (params['id']) {
        this.gameService.getGame(params['id'])
          .subscribe(
            res => {
              console.log(res);
              this.game = res;
              this.edit = true; // Set edit mode to true
            },
            err => console.log(err)
          );
      }
    }

  saveNewGame() {
    delete this.game.id;
    this.gameService.saveGame(this.game)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/games']);
        },
        err => {
          this.errorMessage = 'Error saving game.';
          console.error(err);
        }
      )
  }

  updateGame() {
    if (this.game.id) {
      this.gameService.updateGame(this.game.id, this.game)
        .subscribe(
          res => {
            console.log('Game updated successfully:', res);
            this.router.navigate(['/games']);
          },
          err => {
            this.errorMessage = 'Error updating game.';
            console.error(err);
          }
        );
    } else {
      console.error('Game ID is undefined. Cannot update.');
    }
  }

}
