import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { switchMap, finalize } from 'rxjs/operators'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { FormGroup, Validators, FormControl } from '@angular/forms'
import { PasswordService } from '../_services/password/password.service';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss'],
})
export class ResetFormComponent implements OnInit {
  userToken$: Observable<any>
  resetForm: FormGroup
  noMatch = false
  token: string
  category: string
  showLoader = false
  success: boolean

  constructor(private route: ActivatedRoute, private passwordService: PasswordService) { }

  ngOnInit() {
    this.userToken$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => params.getAll('id'))
    )
    this.userToken$.subscribe((param) => {
      const splittedParam = param.split('!')
      this.token = splittedParam[1]
      this.category = splittedParam[0]
    })
    this.resetForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    })
  }

  resetPassword() {
    if (this.passwordsDontMatch()) {
      return
    }

    this.showLoader = true

    this.passwordService.resetPassword(this.category.trim(), this.token.trim(), this.resetForm.get('password').value)
      .subscribe(
        (res) => {
          this.showLoader = false
          this.success = true
        },
        (error) => {
          console.log('falhou')
          this.showLoader = false
          this.success = false
        }
      )
  }

  passwordsDontMatch() {
    if (this.resetForm.get('password').value !== this.resetForm.get('confirmPassword').value) {
      this.noMatch = true
      return true
    } else {
      this.noMatch = false
      return false
    }
  }

}
