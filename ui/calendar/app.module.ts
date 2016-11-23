import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarComponent }  from './calendar.component';
import { CalendarMonthComponent} from './calendar-month.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [
      CalendarComponent,
      CalendarMonthComponent,
  ],
  bootstrap:    [ CalendarComponent ]
})
export class AppModule { }
