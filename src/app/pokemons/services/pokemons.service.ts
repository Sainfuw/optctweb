import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { IPokeAPIResponse } from '@app/pokemons/interfaces/simple-pokemon.interface'
import { map } from 'rxjs'
import { IPokemonInfo } from '../interfaces/pokemon-info.interface'

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private http = inject(HttpClient)

  loadPage(page: number) {
    return this.http
      .get<IPokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`
      )
      .pipe(
        map((resp) => {
          return resp.results.map((pokemon) => {
            const id = pokemon.url.split('/').at(-2) ?? ''
            return { ...pokemon, id }
          })
        })
        // tap(console.log)
      )
  }

  getPokemon(id: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    return this.http.get<IPokemonInfo>(url)
  }
}
