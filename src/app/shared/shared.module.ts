import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from '../search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [ SearchPipe ],
  exports:[SearchPipe,NgxPaginationModule],
  imports: [
    CommonModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
