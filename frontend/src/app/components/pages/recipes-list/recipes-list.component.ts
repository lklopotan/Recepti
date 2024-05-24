import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReceptiService } from '../../../services/recepti.service';
import { Router, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { Recept } from '../../../models/recept';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent, FontAwesomeModule],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
  public recepti: any = [];
  Math: any;
  faTrash = faTrash;
  faEdit = faEdit;

  constructor(private _receptiService: ReceptiService, private _router: Router) {
    this.Math = Math; 
    }

  ngOnInit(): void {
    this._receptiService.getRecepti().subscribe(recepti => {
      this.recepti = recepti;
    })
  }

  openRecept(recept: Recept) {
    this._router.navigateByUrl("/recept/" + recept._id, {state: recept});
  }

  deleteRecept(recept: Recept) {
    this._receptiService.deleteRecept(recept._id).subscribe(() => {
      this.recepti = this.recepti.filter((item: Recept) => item._id !== recept._id);
      console.log(this.recepti);
    })
  }

  editRecept(recept: Recept) {
    console.log(recept);
  }
}
