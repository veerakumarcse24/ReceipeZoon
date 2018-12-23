import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  createRecipe(dataObj, imgUrls) {
  	const formData: FormData = new FormData();
	var i = 1;
  	for (const file of imgUrls) {
      formData.append('image_'+i, file, file.name);
      i++;
  	}
  	formData.append('data', JSON.stringify(dataObj))
    return this.http.post(environment.backendURL + `creatRecipe/`, formData).toPromise();
  }

  getRecipes() {
    return this.http.get(environment.backendURL + `getRecipes/`).toPromise();
  }

  deleteRecipe(dataObj) {
    return this.http.post(environment.backendURL + `deleteRecipe/`, dataObj).toPromise();
  }

}
