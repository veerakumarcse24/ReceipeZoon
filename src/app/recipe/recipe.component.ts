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
  urls = new Array<string>();
    submitted = false;

    constructor(private formBuilder: FormBuilder, public recipeService: RecipeService, private http: HttpClient, private _flashMessagesService: FlashMessagesService) { }

    ngOnInit() {
        this._flashMessagesService.show('Success!', { cssClass: 'alert-success' } );
        this.registerForm = this.formBuilder.group({
            recipe_name: ['', Validators.required],
            recipe_images: [new Array<string>(), Validators.required],
            recipe_description: [''],
            recipe_due: ['']
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.recipeService.createRecipe(this.registerForm.value).then(
            (c: any) => {
                alert(0);
            }
        );

        alert('SUCCESS!! :-)')
        console.log(this.registerForm.value);
    }

    detectFiles(event) {
	    this.urls = [];
	    this.registerForm.value.recipe_images = [];
	    let files = event.target.files;
	    if (files) {
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
