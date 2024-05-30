import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { SearchService } from '../../../services/search.service';
import { faArrowDownAZ, faArrowRotateRight, faArrowUpAZ, faSearch } from '@fortawesome/free-solid-svg-icons';
import { state, style, trigger } from '@angular/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSliderModule } from '@angular/material/slider';
import { ReceptiService } from '../../../services/recepti.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, FontAwesomeModule, MatSliderModule],
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
          display: 'block'
      }))
    ])
  ]
})
export class SearchBarComponent {
  @Output() recipeList = new EventEmitter();

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
      zaOsobaOd: new FormControl('1'),
      zaOsobaDo: new FormControl('5')
    });
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
    console.log(this.searchForm.get('zaOsobaOd')?.value);
    console.log(this.searchForm.get('zaOsobaDo')?.value);
  }
}
