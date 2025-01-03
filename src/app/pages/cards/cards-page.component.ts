import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { Title } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { CardListComponent } from '@app/cards/components/card-list/card-list.component'
import { ISimpleCard } from '@app/cards/interfaces/simple-card.interface'
import { CardsService } from '@app/cards/services/cards.service'
import { map, tap } from 'rxjs'
import { CardListSkeletonComponent } from '../../cards/components/card-list-skeleton/card-list-skeleton.component'

@Component({
  selector: 'cards-page',
  imports: [CardListComponent, CardListSkeletonComponent],
  templateUrl: './cards-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CardsPageComponent implements OnInit {
  private cardsService = inject(CardsService)
  public cards = signal<ISimpleCard[]>([])

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private title = inject(Title)

  public currentPage = toSignal<number>(
    this.route.queryParams.pipe(
      map((params) => params['page'] ?? 1),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  )

  // public isLoading = signal(true)
  // private appRef = inject(ApplicationRef)
  // private $appStable = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable })
  // })

  loadCards(page = 0): void {
    const pageToLoad = this.currentPage()! + page
    this.cardsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() => this.title.setTitle(`Cards SSR - Page ${pageToLoad}`))
      )
      .subscribe(this.cards.set)
  }

  ngOnInit(): void {
    this.loadCards()
    // setTimeout(() => {
    //   this.isLoading.set(false)
    // }, 5000)
  }

  // ngOnDestroy(): void {
  //   console.log('CardsPageComponent destroyed')
  //   this.$appStable.unsubscribe()
  // }
}
