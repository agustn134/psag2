import { Component, HostBinding, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  games: any = []; // Array to store games

  constructor(private gameService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames().subscribe(
      res => {
        this.games = res; // Assign the response to the games property
        console.log(this.games); // Log the array of games to the console
      },
      err => console.log(err)
    );
  }

  deleteGame(id: string): void {
    this.gameService.deleteGame(id).subscribe(
      res => {
        console.log(res);
        this.getGames(); // Update the game list after deletion
      },
      err => console.log(err)
    );
  }

  editGame(id: string): void {
    console.log(id);
  }
}
