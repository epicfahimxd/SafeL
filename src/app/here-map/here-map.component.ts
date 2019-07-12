import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

var fist = new H.map.Icon("../assets/fist.png", { size: { w: 35, h: 35 } });
var rob = new H.map.Icon("../assets/bandit.png", { size: { w: 35, h: 35 } });
var theft = new H.map.Icon("../assets/theft.png", { size: { w: 35, h: 35 } });
declare var H: any;

@Component({
  selector: 'here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public appId: any;

  @Input()
  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  private platform: any;
  private map: any;
  private router: any;



  public constructor() { }

  public ngOnInit() {
    this.platform = new H.service.Platform({
      "app_id": 'JIhWsj5ocJ55IpNQqmiM',
      "app_code": 'Dl3qLVq0RJn-RBmD5LRviw'
    });
    this.router = this.platform.getRoutingService();
  }


  public ngAfterViewInit() {
    setTimeout(() => {
      let defaultLayers = this.platform.createDefaultLayers();
      this.map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
          zoom: 14,
          tilt: 45,
          center: { lat: this.lat, lng: this.lng }
        }
      );

      const ui = H.ui.UI.createDefault(this.map, defaultLayers);
      const marker1 = new H.map.Marker({ lat: 34.023370, lng: -118.274240 }, { icon: theft });
      marker1.setData("<p>Theft <br> 900 BLOCK W 30TH ST</p>");
      marker1.addEventListener("tap", event => {
        const bubble = new H.ui.InfoBubble(
          event.target.getPosition(),
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });


      const marker2 = new H.map.Marker({ lat: 34.021960, lng: -118.279970 }, { icon: theft });
      marker2.setData("<p>Theft <br> 3200 BLOCK S HOOVER ST</p>");
      marker2.addEventListener("tap", event => {
        const bubble = new H.ui.InfoBubble(
          event.target.getPosition(),
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });

      const marker3 = new H.map.Marker({ lat: 34.026270, lng: -118.298850 }, { icon: rob });
      marker3.setData("<p> Robbery <br> VERMONT AV & 30TH ST</p>");
      marker3.addEventListener("tap", event => {
        const bubble = new H.ui.InfoBubble(
          event.target.getPosition(),
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });

      const marker4 = new H.map.Marker({ lat: 34.022130, lng: -118.292300 }, { icon: theft });
      marker4.setData("<p> Theft <br> 1100 BLOCK W 36TH PL </p>");
      marker4.addEventListener("tap", event => {
        const bubble = new H.ui.InfoBubble(
          event.target.getPosition(),
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });

      const marker5 = new H.map.Marker({ lat: 34.023369, lng: -118.274239 }, { icon: rob });
      marker5.setData("<p>Robbery <br> 1500 BLOCK W 30TH ST </p>");
      marker5.addEventListener("tap", event => {
        const bubble = new H.ui.InfoBubble(
          event.target.getPosition(),
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });

      const marker6 = new H.map.Marker({ lat: 34.018850, lng: -118.281026 }, { icon: fist });
      marker6.setData("<p> Assault <br> FIGUEROA & JEFFERSON </p>");
      marker6.addEventListener("tap", event => {
        const bubble = new H.ui.InfoBubble(
          event.target.getPosition(),
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });

      this.map.addObjects([marker1, marker2, marker3, marker4, marker5, marker6]);
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    }, 100);
  }


  public isoline() {
    let params = {
      "mode": "fastest;car;traffic:enabled",
      "range": "300",
      "rangetype": "time",
      "departure": "now",
      "start": this.lat + "," + this.lng
    }
    this.map.removeObjects(this.map.getObjects());
    this.router.calculateIsoline(params, data => {
      if (data.response) {
        let center = new H.geo.Point(data.response.center.latitude, data.response.center.longitude),
          isolineCoords = data.response.isoline[0].component[0].shape,
          linestring = new H.geo.LineString(),
          isolinePolygon,
          isolineCenter;
        isolineCoords.forEach(coords => {
          linestring.pushLatLngAlt.apply(linestring, coords.split(','));
        });
        isolinePolygon = new H.map.Polygon(linestring);
        isolineCenter = new H.map.Marker(center);
        this.map.addObjects([isolineCenter, isolinePolygon]);
        this.map.setViewBounds(isolinePolygon.getBounds());
      }
    }, error => {
      console.error(error);
    });
  }

}