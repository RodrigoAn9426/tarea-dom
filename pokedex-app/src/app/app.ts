import { Component } from '@angular/core';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonListComponent],
  template: `<app-pokemon-list></app-pokemon-list>`
})
export class App {}