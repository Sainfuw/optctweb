import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'
import { RouterLink } from '@angular/router'
import { ISimplePokemon } from '@app/pokemons/interfaces/simple-pokemon.interface'

@Component({
  selector: 'pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  // pokemonsService = inject(PokemonsService)
  // pokemon = signal<IPokemonInfo | undefined>(undefined)
  simplePokemon = input.required<ISimplePokemon>()
  imageURL = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        this.simplePokemon().id
      }.png`
  )

  // logEffect = effect(() => {
  //   this.pokemonsService
  //     .getPokemon(this.simplePokemon())
  //     .subscribe(this.pokemon.set)
  // })
}
