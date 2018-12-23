import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
  recipesList;
  imageUrlArray;
  autoPlayInterval: number = 5;
  constructor(public recipeService: RecipeService, private http: HttpClient, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.recipesList = [];
  	this.getRecipes();
  	this.imageUrlArray = ['http://localhost:9123/static/17/VEG%20Salat_1.jpg','http://localhost:9123/static/18/Ice%20creams_1.jpg'];
  }

    getRecipes() {
	    this.recipeService.getRecipes()
	    .then((c: any) => {
	      	if(c.Status === 'success')
            {
                this._flashMessagesService.show(c.message, { cssClass: 'alert-success' });
	      		this.recipesList = c.data;
            }
            else{
                this._flashMessagesService.show(c.message, { cssClass: 'alert-danger' });
            }
	    });
	}

	deleteRecipe(id) {
		var confirm_flag = confirm("Are you sure delete this recipe.")
		if(confirm_flag)
		{
			var dataObj = {recipe_id : id};
			this.recipeService.deleteRecipe(dataObj)
		    .then((c: any) => {
		      	if(c.Status === 'success')
	            {
	                this._flashMessagesService.show(c.message, { cssClass: 'alert-success' });
	                this.getRecipes();
	            }
	            else{
	                this._flashMessagesService.show(c.message, { cssClass: 'alert-danger' });
	            }
		    });
		}
	}

	convertInt(arg) {
		return (parseInt(arg))
	}

}
