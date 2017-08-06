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
  showTable:boolean = false;
  showGotAsins:boolean = false;
  showLoader:boolean = false;

  ngOnInit() {
  }

  getAmazonAsins(event) {
    this.scraperData = event;
    this.searchService.srearchAmzonAsin(event).subscribe(res=>{
      this.showGotAsins = true;
      this.searchService.srearchAmzonProducts(res).subscribe(response=>{
        this.margeLists(this.scraperData,response);
        this.showTable = true;
        this.showLoader = true;
      })
    })
  }

  margeLists(oldData,newData){
    for(let i=0;i<oldData.length;i++){
      let tempData = newData[i][0];
      if (newData[i] != ""){
        oldData[i]['asin'] = tempData.ASIN[0];
        oldData[i]['priceAmazon'] = tempData.OfferSummary[0].LowestNewPrice[0].FormattedPrice[0];
        oldData[i]['isGood'] = this.parseAndCompare(oldData[i].price,oldData[i].priceAmazon);
        oldData[i]['salesRank'] = tempData.hasOwnProperty('SalesRank') ? tempData.SalesRank[0] : '';
        oldData[i]['amazonTitle'] = tempData.ItemAttributes[0].Title[0];
        oldData[i]['amazonImage'] = tempData.hasOwnProperty('MediumImage') ? tempData.MediumImage[0].URL[0] : '';
      } else{
        oldData[i]['asin'] = '';
        oldData[i]['priceAmazon'] = '';
        oldData[i]['isGood'] = '';
        oldData[i]['salesRank'] ='';
        oldData[i]['amazonTitle'] ='';
        oldData[i]['amazonImage'] ='';
      }
    }
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

  resetData(){
    this.scraperData = [];
    this.showGotAsins = false;
    this.showTable = false;
  }
}

