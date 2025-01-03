import { isPlatformBrowser } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title)
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID)

  ngOnInit() {
    console.log({ client: isPlatformBrowser(this.platform) })

    this.title.setTitle('Pricing | Angular Universal Example')
    this.meta.updateTag({
      name: 'description',
      content: 'Pricing page of Angular Universal Example',
    })
  }
}
