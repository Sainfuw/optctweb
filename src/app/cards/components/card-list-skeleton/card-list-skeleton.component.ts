import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'card-list-skeleton',
  imports: [],
  templateUrl: './card-list-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardListSkeletonComponent {}
