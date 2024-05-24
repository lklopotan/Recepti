import { Component } from '@angular/core';
import { ReceptiService } from '../../../services/recepti.service';
import { Recept } from '../../../models/recept';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-create-recept',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ButtonComponent, CommonModule],
  templateUrl: './create-recept.component.html',
  styleUrl: './create-recept.component.scss'
})
export class CreateReceptComponent {
  recipeForm: FormGroup;
  image: File;
  kategorijeSastojaka: { [key: string]: boolean } = {};
  public recept: Recept = new Recept();

  constructor(private _formBuilder: FormBuilder, private _receptiService: ReceptiService, private _router: Router) {
    this.recipeForm = this._formBuilder.group({
      Naziv: ['', Validators.required],
      Vrsta: ['', Validators.required],
      ZaOsoba: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      Vrijeme: ['', [Validators.required, Validators.min(5), Validators.max(300)]],
      Ocjena: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      Sastojci: ['', Validators.required],
      Upute: ['', Validators.required],
      Savjet: [''],
      Slika: ['']
    });
  }

  ngOnInit(): void {
    this._receptiService.getKategorije().subscribe(kategorijeSastojakaResponse => {
      kategorijeSastojakaResponse.forEach(kategorija => {
        this.kategorijeSastojaka[kategorija] = false;
      });
    });
  }
  
  toggleCategory(kategorija: string): void {
    this.kategorijeSastojaka[kategorija] = !this.kategorijeSastojaka[kategorija];
  }

  onChangeImage(event : any) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    if (!allowedTypes.includes(event.target.files[0].type)) {
      alert('Invalid file type. Only PNG, JPEG and GIF images are allowed.');
      return;
    }
    this.image = <File>event.target.files[0];
  }

  saveRecept(): void {
    if (!this.image) {
      alert("Slika nedostaje!");
    } else if (!this.recipeForm.valid) {
      alert("Nepotpuna forma!");
    } else {
      this._receptiService.saveReceptImage(this.image).subscribe(imageResponse => {
        const recipeData = {
          ...this.recipeForm.value,
          Sastojci: Array.isArray(this.recipeForm.value.Sastojci) ? this.recept.Sastojci : (this.recipeForm.value.Sastojci as string).split(',').map(item => item.trim()),
          SastojciKategorije: Object.keys(this.kategorijeSastojaka).filter(key => this.kategorijeSastojaka[key] === true),
          Slika: imageResponse.filename
        };
        this._receptiService.saveRecept(recipeData).subscribe(() => {
          alert("Novi recept uspješno spremljen!");
          this._router.navigateByUrl('/recepti');
        });
      });
    }
  }

  navigateBack() {
    history.back();
  }
}
