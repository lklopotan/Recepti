import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReceptiService } from '../../services/recepti.service';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent {
  public recepti: any = [];

  constructor(private _receptiService: ReceptiService) {  }

  ngOnInit(): void {
    this._receptiService.getRecepti().subscribe(recepti => {
      console.log(recepti);
      this.recepti = recepti;
    })
  }
}