import { Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filtrado',
  templateUrl: './filtrado.component.html'
})
export class FiltradoComponent implements OnInit {
  optionsForm: FormGroup;
  options = ['Estado', 'Agencia', 'Tipo'];
  counter = {length: 0, message: 'Resultados encontrados'};
  public statuses: any[];
  public agencies: any[];
  public  missionTypes: any[];
  public filterSelected: any[];

  constructor(private service: ApiService, private fb: FormBuilder) {
/*    this.statuses = this.service.statuses;
    this.agencies = this.service.agencies;
    this.missionTypes = this.service.missionTypes;*/
  }

  ngOnInit() {
    this.optionsForm = this.fb.group({
      optionsControl: [this.options[1]]
    });
  }

  onSearch(searchText: string) {
    const search = searchText.toLowerCase();
    if (!search) {
      this.counter = {...this.counter, length: 0};
    } else {
      switch (this.optionsForm.get('optionsControl').value) {
        case 'Estado':
          const statuses = this.service.statuses.filter(
            l =>
              l.name.toLowerCase().includes(search));
          this.filterSelected = statuses;
          this.counter = {...this.counter, length: this.filterSelected.length};
          break;
        case 'Agencia':
          const agencies = this.service.agencies.filter(
            l =>
              l.name.toLowerCase().includes(search));
          // this.filteredAgencies = [...filteredAgencies];
          this.filterSelected = agencies;
          this.counter = {...this.counter, length: this.filterSelected.length};
          break;
        case 'Tipo':
          const missionTypes = this.service.missionTypes.filter(
            l =>
              l.name.toLowerCase().includes(search));
          this.filterSelected = missionTypes;
          this.counter = {...this.counter, length: this.filterSelected.length};
          break;
      }
    }

  }

  selectDropDownItem(value: string) {
    this.optionsForm.controls['optionsControl'].setValue(value);
    this.filterSelected = [];
  }
}

// https://medium.com/@kastepanyan24/how-to-set-selected-option-dynamically-in-angular-6-85c99958cca5
