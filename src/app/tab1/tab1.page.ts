import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  results = [];
  public myInput;
  constructor(public http: HttpClient) { }

  onInput(val) {
    console.log(val);
    console.log(this.myInput);
  }

  onChange(e) {
    const value = e.target.value
    console.log(value);

    const url = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=${value}&app_id=JIhWsj5ocJ55IpNQqmiM&app_code=Dl3qLVq0RJn-RBmD5LRviw`;
    this.http.get(url)
    .subscribe((result: any) => {

      console.log(result);
      if(result.suggestions){
        const data = result.suggestions.filter((item) => {
          if(item.address.houseNumber){
            return item;
          } 
        })
        this.results = data;

      }else{
        this.results = [];
      }

    }, (err) => {
      console.log(err);
      this.results;
    })

  }

};
