import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  searchForm: FormGroup;

  constructor(private _searchService: SearchService) {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl('')
    });
  }

  pretraga() { 
    console.log("pretraga");
    this._searchService.textSearch(this.searchForm.get('searchQuery')?.value).subscribe(result => {
      console.log(result);
    });
  }
}
