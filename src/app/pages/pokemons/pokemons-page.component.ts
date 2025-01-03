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
import { PokemonListComponent } from '@app/pokemons/components/pokemon-list/pokemon-list.component'
import { ISimplePokemon } from '@app/pokemons/interfaces/simple-pokemon.interface'
import { PokemonsService } from '@app/pokemons/services/pokemons.service'
import { map, tap } from 'rxjs'
import { PokemonListSkeletonComponent } from '../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component'

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  private pokemonsService = inject(PokemonsService)
  public pokemons = signal<ISimplePokemon[]>([])

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

  loadPokemons(page = 0): void {
    const pageToLoad = this.currentPage()! + page
    this.pokemonsService
      .loadPage(pageToLoad)
      .pipe(
        tap(() =>
          this.router.navigate([], { queryParams: { page: pageToLoad } })
        ),
        tap(() => this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`))
      )
      .subscribe(this.pokemons.set)
  }

  ngOnInit(): void {
    this.loadPokemons()
    // setTimeout(() => {
    //   this.isLoading.set(false)
    // }, 5000)
  }

  // ngOnDestroy(): void {
  //   console.log('PokemonsPageComponent destroyed')
  //   this.$appStable.unsubscribe()
  // }
}
