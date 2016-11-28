import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CalendarComponent }  from './calendar.component';
import { CalendarMonthComponent} from './calendar-month.component';
import { CreateEventComponent } from './create-event.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [
      CalendarComponent,
      CalendarMonthComponent,
      CreateEventComponent,
  ],
  entryComponents: [ CalendarComponent, CreateEventComponent ],
  bootstrap:    [ CalendarComponent ]
})
export class AppModule { }
