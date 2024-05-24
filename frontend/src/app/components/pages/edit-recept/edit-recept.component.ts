import { Component } from '@angular/core';
import { ReceptiService } from '../../../services/recepti.service';
import { Recept } from '../../../models/recept';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-recept',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ButtonComponent, CommonModule],
  templateUrl: './edit-recept.component.html',
  styleUrl: './edit-recept.component.scss'
})
export class EditReceptComponent {
  recipeForm: FormGroup;
  image: File;
  kategorijeSastojaka: { [key: string]: boolean } = {};
  public recept: Recept = new Recept();

  constructor(private _formBuilder: FormBuilder, private _receptiService: ReceptiService, private _router: Router, private _location: Location) {
    this.recept = this._router.getCurrentNavigation()?.extras.state as Recept;
    this.recipeForm = this._formBuilder.group({
      Naziv: [this.recept.Naziv, Validators.required],
      Vrsta: [this.recept.Vrsta, Validators.required],
      ZaOsoba: [this.recept.ZaOsoba, [Validators.required, Validators.min(1), Validators.max(10)]],
      Vrijeme: [this.recept.Vrijeme, [Validators.required, Validators.min(5), Validators.max(300)]],
      Ocjena: [this.recept.Ocjena, [Validators.required, Validators.min(1), Validators.max(5)]],
      Sastojci: [this.recept.Sastojci, Validators.required],
      Upute: [this.recept.Upute, Validators.required],
      Savjet: [this.recept.Savjet],
      Slika: [this.recept.Slika]
    });
  }

  ngOnInit(): void {
    this._receptiService.getKategorije().subscribe(kategorijeSastojakaResponse => {
      kategorijeSastojakaResponse.forEach(kategorija => {
        this.kategorijeSastojaka[kategorija] = this.recept.SastojciKategorije.includes(kategorija);
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
    console.log(this.recept);
    console.log(this.recipeForm);
    if (!this.recipeForm.valid) {
      alert("Nepotpuna forma!");
    } else if (!this.image) {
      const recipeData = {
        _id: this.recept._id,
        ...this.recipeForm.value,
        Sastojci: Array.isArray(this.recipeForm.value.Sastojci) ? this.recept.Sastojci : (this.recipeForm.value.Sastojci as string).split(',').map(item => item.trim()),
        SastojciKategorije: Object.keys(this.kategorijeSastojaka).filter(key => this.kategorijeSastojaka[key] === true),
        Slika: this.recept.Slika
      };
      this._receptiService.updateRecept(recipeData).subscribe(() => {
        alert("Recept uspješno ažuriran!");
        this._router.navigateByUrl('/recepti');
      });
    } else {
      this._receptiService.deleteReceptImage(this.recept).subscribe(recept => {
        this._receptiService.saveReceptImage(this.image).subscribe(imageResponse => {
          const recipeData = {
            _id: this.recept._id,
            ...this.recipeForm.value,
            Sastojci: Array.isArray(this.recipeForm.value.Sastojci) ? this.recept.Sastojci : (this.recipeForm.value.Sastojci as string).split(',').map(item => item.trim()),
            SastojciKategorije: Object.keys(this.kategorijeSastojaka).filter(key => this.kategorijeSastojaka[key] === true),
            Slika: imageResponse.filename
          };
          console.log(recipeData);
          this._receptiService.updateRecept(recipeData).subscribe(() => {
            alert("Recept uspješno ažuriran!");
            this._router.navigateByUrl('/recepti');
          });
        });
      })
      
    }
  }

  navigateBack() {
    this._location.back();
  }
}
