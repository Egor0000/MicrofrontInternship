import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {MainPageDTO} from "../dtos/MainPageDTO";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {
  private port = "8443"
      private url = `http://localhost:${this.port}/api/service/person-profile`;

  constructor(
    private http: HttpClient
  ) { }

  save(mainPage: MainPageDTO): Observable<MainPageDTO> {
    return this.http.post<MainPageDTO>(`${this.url}/`, mainPage);
  }

  getById(id: number): Observable<MainPageDTO> {
    return this.http.get<MainPageDTO>(`${this.url}/${id}`)
  }
}
