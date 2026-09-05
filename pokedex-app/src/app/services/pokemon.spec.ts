import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  // Trae la lista + detalle completo de cada Pokémon en una sola llamada "combinada"
  getPokemonList(limit: number = 20, offset: number = 0): Observable<Pokemon[]> {
    return this.http.get<PokemonListResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap(response => {
          const detailRequests = response.results.map(item =>
            this.http.get<Pokemon>(item.url)
          );
          return forkJoin(detailRequests); // Espera a que TODAS las peticiones terminen
        })
      );
  }

  // Búsqueda individual por nombre (usada en el reto opcional)
  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${name.toLowerCase()}`);
  }
}
