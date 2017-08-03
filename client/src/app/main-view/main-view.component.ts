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
      if (newData[i][0].hasOwnProperty('ASIN')){
        oldData[i]['asin'] = newData[i][0].ASIN[0];
        oldData[i]['priceAmazon'] = newData[i][0].OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
        oldData[i]['isGood'] = this.parseAndCompare(oldData[i].price,oldData[i].priceAmazon);
      } else{
        oldData[i]['asin'] = '';
        oldData[i]['priceAmazon'] = '';
        oldData[i]['isGood'] = '';
      }
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

