import { Component } from '@angular/core';
import { ReceptiService } from '../../../services/recepti.service';
import { Recept } from '../../../models/recept';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-create-recept',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './create-recept.component.html',
  styleUrl: './create-recept.component.scss'
})
export class CreateReceptComponent {

  public recept: Recept = new Recept();

  constructor(private _receptiService: ReceptiService, private _router: Router) {
    
  }

  saveRecept() {
    this._receptiService.saveRecept(this.recept).subscribe(recept => {
      if (recept) {
        this._router.navigateByUrl('/recepti');
      }
    })
  }
}
