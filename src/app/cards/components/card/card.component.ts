import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'
import { ISimpleCard } from '@app/cards/interfaces/simple-card.interface'

@Component({
  selector: 'card-card',
  imports: [],
  templateUrl: './card-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCardComponent {
  // cardsService = inject(CardsService)
  // card = signal<ICardInfo | undefined>(undefined)
  simpleCard = input.required<ISimpleCard>()
  imageURL = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/card/other/official-artwork/${
        this.simpleCard().id
      }.png`
  )

  // logEffect = effect(() => {
  //   this.cardsService
  //     .getCard(this.simpleCard())
  //     .subscribe(this.card.set)
  // })
}
