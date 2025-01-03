import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { IPokeAPIResponse } from '@app/cards/interfaces/simple-card.interface'
import { map } from 'rxjs'
import { ICardInfo } from '../interfaces/card-info.interface'

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private http = inject(HttpClient)

  loadPage(page: number) {
    return this.http
      .get<IPokeAPIResponse>(
        `https://pokeapi.co/api/v2/card?limit=20&offset=${page * 20}`
      )
      .pipe(
        map((resp) => {
          return resp.results.map((card) => {
            const id = card.url.split('/').at(-2) ?? ''
            return { ...card, id }
          })
        })
        // tap(console.log)
      )
  }

  getCard(id: string) {
    const url = `https://pokeapi.co/api/v2/card/${id}/`
    return this.http.get<ICardInfo>(url)
  }
}
