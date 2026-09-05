import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.html',
  styleUrls: ['./pokemon-list.css']
})
export class PokemonListComponent implements OnInit {
  private readonly pokemonService = inject(PokemonService);

  pokemons: Pokemon[] = [];
  loading = true;
  errorMessage: string | null = null;
  blockedIds = new Set<number>();

  ngOnInit(): void {
    this.fetchPokemons();
  }

  fetchPokemons(): void {
    this.loading = true;
    this.errorMessage = null;

    this.pokemonService.getPokemonList(20, 0).subscribe({
      next: (data: Pokemon[]) => {
        this.pokemons = data;
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error('Error al obtener Pokémon:', err);
        this.errorMessage = 'Hubo un error al cargar los Pokémon. Intenta de nuevo.';
        this.loading = false;
      }
    });
  }

  toggleBlock(id: number): void {
    if (this.blockedIds.has(id)) {
      this.blockedIds.delete(id);
    } else {
      this.blockedIds.add(id);
    }
  }

  isBlocked(id: number): boolean {
    return this.blockedIds.has(id);
  }
}