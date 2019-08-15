import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { API, SALT_KEY } from 'src/app/_consts/consts'

@Injectable({
  providedIn: 'root',
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  resetPassword(categoria: string, token: string, senha: string) {
    const data = {
      categoria,
      senha,
      SALT_KEY,
    }

    console.log(JSON.stringify(data))

    return this.http.post(`${API}/candidatos/alterar_senha/${token}`, data, this.setHeaders())
  }

  private setHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    }
    return httpOptions
  }

}
