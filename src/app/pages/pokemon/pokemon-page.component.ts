import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import { IPokemonInfo } from '@app/pokemons/interfaces/pokemon-info.interface'
import { ISimplePokemon } from '@app/pokemons/interfaces/simple-pokemon.interface'
import { PokemonsService } from '@app/pokemons/services/pokemons.service'
import { tap } from 'rxjs'

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private pokemonService = inject(PokemonsService)

  private title = inject(Title)
  private meta = inject(Meta)

  simplePokemon = input.required<ISimplePokemon>()
  pokemon = signal<IPokemonInfo | null>(null)

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (!id) return

    this.pokemonService
      .getPokemon(id)
      .pipe(
        tap(({ id, name }) => {
          const pageTitle = `${id}. ${name}`
          const pageDescription = `Pokemon ${name} details`

          this.title.setTitle(pageTitle)
          this.meta.updateTag({ name: 'description', content: pageDescription })
          this.meta.updateTag({ name: 'og:title', content: pageTitle })
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          })
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          })
        })
      )
      .subscribe(this.pokemon.set)
  }
}
