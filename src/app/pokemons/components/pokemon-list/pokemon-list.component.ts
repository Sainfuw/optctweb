import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { ISimplePokemon } from '@app/pokemons/interfaces/simple-pokemon.interface'
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component'

@Component({
  selector: 'pokemon-list',
  imports: [PokemonCardComponent],
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent {
  pokemons = input.required<ISimplePokemon[]>()
}
