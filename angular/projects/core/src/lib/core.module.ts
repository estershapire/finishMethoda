import { NgModule } from '@angular/core';
import { CoreComponent } from './core.component';
import { TolistPipe } from './pipes/tolist.pipe';



@NgModule({
  declarations: [
    CoreComponent,
    TolistPipe
  ],
  imports: [
  ],
  exports: [
    CoreComponent
  ]
})
export class CoreModule { }
