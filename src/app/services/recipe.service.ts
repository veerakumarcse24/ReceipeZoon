import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  createRecipe(dataObj) {
	  alert();
	  console.log(dataObj);
    return this.http.get(environment.hrBackend + `chat?inputmsg=`+dataObj).toPromise();
  }
}
