import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReceptiService } from '../../../services/recepti.service';
import { Router, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { Recept } from '../../../models/recept';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
  public recepti: any = [];

  constructor(private _receptiService: ReceptiService, private _router: Router) {  }

  ngOnInit(): void {
    this._receptiService.getRecepti().subscribe(recepti => {
      console.log(recepti);
      this.recepti = recepti;
    })
  }

  openRecept(recept: Recept) {
    this._router.navigateByUrl("/recept/" + recept.ID, {state: recept});
  }
}
