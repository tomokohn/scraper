import {Component, OnInit} from '@angular/core';
import {SearchService} from "../search/search.service";

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.sass']
})
export class MainViewComponent implements OnInit {

  constructor(private searchService:SearchService) {
  }

  scraperData;

  ngOnInit() {
  }

  workOnResult(event) {
    this.scraperData = event;
    this.searchService.srearchAmzon(event).subscribe(res=>{
      this.margeLists(this.scraperData,res);
    })

  }

  margeLists(oldData,newData){
    for(let i=0;i<oldData.length;i++){
      oldData[i]['titleAmazon'] = newData[i].title;
      oldData[i]['urlAmazon'] = newData[i].url;
      oldData[i]['imgAmazon'] = newData[i].image;
      oldData[i]['priceAmazon'] = newData[i].price;
      oldData[i]['isGood'] = this.parseAndCompare(oldData[i].price,oldData[i].priceAmazon);
    }
    console.log("marged list", oldData);
  }

  parseAndCompare(price1,price2){
    if (price1 === undefined || price2 === undefined){
      return false;
    }
    let num1 = price1.replace("$",'');
    num1 = parseInt(num1);
    let num2 = price2.replace("$",'');
    num2 = parseInt(num2);
    return (num1 * 1.5) < num2;
  }
}

