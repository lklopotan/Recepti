import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { SearchService } from '../../../services/search.service';
import { faArrowDownAZ, faArrowRotateRight, faArrowUpAZ, faSearch } from '@fortawesome/free-solid-svg-icons';
import { state, style, trigger } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSliderModule } from '@angular/material/slider';
import { ReceptiService } from '../../../services/recepti.service';
import { CommonModule } from '@angular/common';
import { SearchBody } from '../../../models/search';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, FontAwesomeModule, MatSliderModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  animations: [
    trigger('animationStateArrowUp', [
      state('hideAdvancedSearch', style({
          display: 'none'
      })),
      state('showAdvancedSearch', style({
          display: 'block'
      }))
    ]),
    trigger('animationStateArrowDown', [
      state('hideAdvancedSearch', style({
          display: 'none'
      })),
      state('showAdvancedSearch', style({
          display: 'block'
      }))
    ]),
    trigger('animationStateSearchOptions', [
      state('hideAdvancedSearchOptions', style({
          display: 'none'
      })),
      state('showAdvancedSearchOptions', style({
          display: 'flex'
      }))
    ])
  ]
})
export class SearchBarComponent {
  @Output() recipeList = new EventEmitter();
  kategorijeSastojaka: { [key: string]: boolean } = {};

  searchForm: FormGroup;
  faArrowRotateRight = faArrowRotateRight;
  faSearch = faSearch;

  faArrowUpAZ = faArrowUpAZ;
  faArrowDownAZ = faArrowDownAZ;
  downArrowState = 'hideAdvancedSearch';
  upArrowState = 'showAdvancedSearch';
  searchOptionsState = 'hideAdvancedSearchOptions';

  constructor(private _searchService: SearchService, private _receptiService: ReceptiService) {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''),
      zaOsobaOd: new FormControl(1),
      zaOsobaDo: new FormControl(10),
      vrijemeOd: new FormControl(1),
      vrijemeDo: new FormControl(100),
      ocjenaOd: new FormControl(1),
      ocjenaDo: new FormControl(5),
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

  pretraga() { 
    this._searchService.textSearch(this.searchForm.get('searchQuery')?.value).subscribe(result => {
      this.recipeList.emit(result);
    });
  }

  osvjeziListu() {
    this._receptiService.getRecepti().subscribe(recepti => {
      this.recipeList.emit(recepti);
    })
  }

  prikaziNaprednuPretragu() { 
    this.upArrowState = this.upArrowState === 'showAdvancedSearch' ? 'hideAdvancedSearch' : 'showAdvancedSearch';
    this.downArrowState = this.downArrowState === 'showAdvancedSearch' ? 'hideAdvancedSearch' : 'showAdvancedSearch';
    this.searchOptionsState = this.searchOptionsState === 'showAdvancedSearchOptions' ? 'hideAdvancedSearchOptions' : 'showAdvancedSearchOptions';
  }

  naprednaPretraga() {
    const requestBody: SearchBody = {
      ZaOsobaOd: this.searchForm.get('zaOsobaOd')?.value as number,
      ZaOsobaDo: this.searchForm.get('zaOsobaDo')?.value as number,
      vrijemeOd: this.searchForm.get('vrijemeOd')?.value as number,
      vrijemeDo: this.searchForm.get('vrijemeDo')?.value as number,
      ocjenaOd: this.searchForm.get('ocjenaOd')?.value as number,
      ocjenaDo: this.searchForm.get('ocjenaDo')?.value as number,
      SastojciKategorije: Object.keys(this.kategorijeSastojaka).filter(key => this.kategorijeSastojaka[key] === true)
    };
    this._searchService.naprednaPretraga(requestBody).subscribe(response => {
      this.recipeList.emit(response);
    })
  }
}
