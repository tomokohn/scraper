import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  constructor(private searchService:SearchService) { }
  urlForm:FormGroup;
  dataAnswer;
  @Output() searchResult = new EventEmitter();
  @Output() beginSearch = new EventEmitter();

  ngOnInit() {
    this.urlForm = new FormGroup({
      url: new FormControl('', Validators.required)
    })
  }


  onSubmit(){
    this.beginSearch.emit();
    this.searchService.scrapeWalmart(this.urlForm.value.url).subscribe(res=>{
      this.dataAnswer = res;
      this.searchResult.emit(this.dataAnswer);
    })
  }

}
