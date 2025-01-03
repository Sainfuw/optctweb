import { ChangeDetectionStrategy, Component, input } from '@angular/core'
import { ISimpleCard } from '@app/cards/interfaces/simple-card.interface'
import { CardCardComponent } from '../card/card.component'

@Component({
  selector: 'card-list',
  imports: [CardCardComponent],
  templateUrl: './card-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListComponent {
  cards = input.required<ISimpleCard[]>()
}
