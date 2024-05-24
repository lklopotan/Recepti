import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Recept } from '../../../models/recept';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/button/button.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  recept: Recept;

  constructor(private _router: Router, private _location: Location) {
    this.recept = this._router.getCurrentNavigation()?.extras.state as Recept;
  }

  navigateBack() {
    this._location.back();
  }

  editRecept(recept: Recept) {
    this._router.navigateByUrl("/recept/edit/" + recept._id, {state: recept});
  }
}
