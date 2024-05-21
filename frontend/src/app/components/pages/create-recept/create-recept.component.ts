import { Component } from '@angular/core';
import { ReceptiService } from '../../../services/recepti.service';
import { Recept } from '../../../models/recept';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';


@Component({
  selector: 'app-create-recept',
  standalone: true,
  imports: [RouterModule, FormsModule, ButtonComponent],
  templateUrl: './create-recept.component.html',
  styleUrl: './create-recept.component.scss'
})
export class CreateReceptComponent {
  image: File;
  public recept: Recept = new Recept();

  constructor(private _receptiService: ReceptiService, private _router: Router) {
    
  }

  onChangeImage(event : any) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    if (!allowedTypes.includes(event.target.files[0].type)) {
      alert('Invalid file type. Only PNG, JPEG and GIF images are allowed.');
      return;
    }
    this.image = <File>event.target.files[0];
  }

  saveRecept(recept: any) {
    console.log(recept);
    /*
    this._receptiService.saveRecept(this.recept).subscribe(response => {
      if (response) {
        console.log("Recept saved! Saving image...");
        //this._receptiService.saveReceptImage(response._id, this.image);
        this._router.navigateByUrl('/recepti');
      }
    })
    */
  }

  navigateBack() {
    this._router.navigateByUrl('/recepti');
  }
}
