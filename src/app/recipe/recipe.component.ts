import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  registerForm: FormGroup;
  urls;
  image_urls;
    submitted = false;

    constructor(private formBuilder: FormBuilder, public recipeService: RecipeService, private http: HttpClient, private _flashMessagesService: FlashMessagesService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            recipe_name: ['', Validators.required],
            recipe_images: [new Array<string>(), Validators.required],
            recipe_description: [''],
            recipe_due: ['']
        });
        this.urls = new Array<string>();
        this.image_urls = new Array<string>();
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.recipeService.createRecipe(this.registerForm.value, this.image_urls).then(
            (c: any) => {
                if(c.Status === 'success')
                {
                    window.location.href = '';
                    this._flashMessagesService.show(c.message, { cssClass: 'alert-success' });
                }
                else{
                    this._flashMessagesService.show(c.message, { cssClass: 'alert-danger' });
                }
            }
        );
    }

    detectFiles(event) { 
	    this.urls = [];
	    let files = event.target.files;
	    if (files) {
         this.image_urls = event.target.files;
	      for (let file of files) {
	        let reader = new FileReader();
	        reader.onload = (e: any) => {
	          this.urls.push(e.target.result);
	        }
	        reader.readAsDataURL(file);
	      }
	    }
	}

}
