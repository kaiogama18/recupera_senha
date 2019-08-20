import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ResetFormComponent } from './reset-form/reset-form.component'

const routes: Routes = [
  {
    path: 'password',
    component: ResetFormComponent,
    children: [
      {
        path: ':id',
        component: ResetFormComponent,
      }
    ]
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
