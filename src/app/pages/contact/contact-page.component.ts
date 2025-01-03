import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit() {
    this.title.setTitle('Contact Page')
    this.meta.updateTag({
      name: 'description',
      content: 'This is the Contact page',
    })
    this.meta.updateTag({
      name: 'og:title',
      content: 'Contact Page',
    })
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola,Mundo,Angular,Universal,Contact',
    })
  }
}
{
}
