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
import { ICardInfo } from '@app/cards/interfaces/card-info.interface'
import { ISimpleCard } from '@app/cards/interfaces/simple-card.interface'
import { CardsService } from '@app/cards/services/cards.service'
import { tap } from 'rxjs'

@Component({
  selector: 'deck-builder-page',
  imports: [],
  templateUrl: './deck-builder-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DeckBuilderPageComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private cardsService = inject(CardsService)

  private title = inject(Title)
  private meta = inject(Meta)

  simpleCard = input.required<ISimpleCard>()
  card = signal<ICardInfo | null>(null)

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (!id) return

    this.cardsService
      .getCard(id)
      .pipe(
        tap(({ id, name }) => {
          const pageTitle = `${id}. ${name}`
          const pageDescription = `deck-builder ${name} details`

          this.title.setTitle(pageTitle)
          this.meta.updateTag({
            name: 'description',
            content: pageDescription,
          })
          this.meta.updateTag({ name: 'og:title', content: pageTitle })
          this.meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          })
          this.meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/deck-builder/other/official-artwork/${id}.png`,
          })
        })
      )
      .subscribe(this.card.set)
  }
}
