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
  target;
  notrouting = true;
  public myInput;
  constructor(public http: HttpClient) { }
  onInput(val) {
  }
  navigate(location) {
    this.notrouting = false;
    const address = location.houseNumber + '+' + location.street + '+' + location.city + '+' + location.state;
    const url = `https://geocoder.api.here.com/6.2/geocode.json?&app_id=JIhWsj5ocJ55IpNQqmiM&app_code=Dl3qLVq0RJn-RBmD5LRviw&searchtext=${address}`
    this.http.get(url)
      .subscribe((result: any) => {
        this.target = result.Response.View[0].Result[0].Location;
      }, (err) => {
        console.log(err);
      })
  }
  onChange(e) {
    this.notrouting = true;
    const value = e.target.value
    const url = `http://autocomplete.geocoder.api.here.com/6.2/suggest.json?query=${value}&app_id=JIhWsj5ocJ55IpNQqmiM&app_code=Dl3qLVq0RJn-RBmD5LRviw`;
    this.http.get(url)
      .subscribe((result: any) => {
        if (result.suggestions) {
          const data = result.suggestions.filter((item) => {
            if (item.address.houseNumber) {
              return item;
            }
          })
          this.results = data;
        } else {
          this.results = [];
        }
      }, (err) => {
        console.log(err);
        this.results;
      })
  }
};
