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
  public defaultLayers: any;
  public constructor() { }
  public ngOnInit() {
    this.platform = new H.service.Platform({
      'apikey': 'gqbD6bqWeTXAP-G66gP2olsUMYl5yY3W-3ew7nR-z5g'

    });
  }
  public ngAfterViewInit() {
    setTimeout(() => {
      // Obtain the default map types from the platform object:
      this.defaultLayers = this.platform.createDefaultLayers();
      // Instantiate (and display) a map object:
      this.map = new H.Map(
        this.mapElement.nativeElement,
        this.defaultLayers.vector.normal.map,
        {
          zoom: 14,
          tilt: 45,
          center: { lat: this.lat, lng: this.lng }
        });
      // Create the default UI:
      var ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
      // Enable the event system on the map instance:
      var mapEvents = new H.mapevents.MapEvents(this.map);
      // Instantiate the default behavior, providing the mapEvents object: 
      var behavior = new H.mapevents.Behavior(mapEvents);
      const marker1 = new H.map.Marker({ lat: 34.023370, lng: -118.274240 }, { icon: theft });
      marker1.setData("<p>Theft <br> 900 BLOCK W 30TH ST</p>");
      marker1.addEventListener("tap", event => {

        // get marker coords
        var coord = this.map.screenToGeo(event.currentPointer.viewportX,
          event.currentPointer.viewportY);

        const bubble = new H.ui.InfoBubble(
          coord,
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);

      });
      this.map.addObject(new H.map.Circle(
        { lat: 34.023370, lng: -118.274240 },
        200,
        {
          style: {
            strokeColor: 'rgba(290, 0, 0, 0.4)', 
            lineWidth: 1,
            fillColor: 'rgba(290, 0, 0, 0.4)' 
          }
        }
      ));


      const marker2 = new H.map.Marker({ lat: 34.021960, lng: -118.279970 }, { icon: theft });
      marker2.setData("<p>Theft <br> 3200 BLOCK S HOOVER ST </p>");
      marker2.addEventListener("tap", event => {
        // get marker coords
        var coord = this.map.screenToGeo(event.currentPointer.viewportX,
          event.currentPointer.viewportY);

        const bubble = new H.ui.InfoBubble(
          coord,
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });


      const marker3 = new H.map.Marker({ lat: 34.026270, lng: -118.298850 }, { icon: rob });
      marker3.setData("<p>Robbery <br> VERMONT AV & 30TH ST </p>");
      marker3.addEventListener("tap", event => {
        // get marker coords
        var coord = this.map.screenToGeo(event.currentPointer.viewportX,
          event.currentPointer.viewportY);

        const bubble = new H.ui.InfoBubble(
          coord,
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });

      const marker4 = new H.map.Marker({ lat: 34.022130, lng: -118.292300 }, { icon: theft });
      marker4.setData("<p>Theft <br> 1100 BLOCK W 36TH PL </p>");
      marker4.addEventListener("tap", event => {
        // get marker coords
        var coord = this.map.screenToGeo(event.currentPointer.viewportX,
          event.currentPointer.viewportY);

        const bubble = new H.ui.InfoBubble(
          coord,
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });

      const marker5 = new H.map.Marker({ lat: 34.023369, lng: -118.274239 }, { icon: rob });
      marker5.setData("<p>Robbery <br> 1500 BLOCK W 30TH ST </p>");
      marker5.addEventListener("tap", event => {
        // get marker coords
        var coord = this.map.screenToGeo(event.currentPointer.viewportX,
          event.currentPointer.viewportY);

        const bubble = new H.ui.InfoBubble(
          coord,
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });

      const marker6 = new H.map.Marker({ lat: 34.018850, lng: -118.281026 }, { icon: fist });
      marker6.setData("<p>Assault <br> FIGUEROA & JEFFERSON </p>");
      marker6.addEventListener("tap", event => {
        // get marker coords
        var coord = this.map.screenToGeo(event.currentPointer.viewportX,
          event.currentPointer.viewportY);

        const bubble = new H.ui.InfoBubble(
          coord,
          {
            content: event.target.getData()
          }
        );
        ui.addBubble(bubble);
      });

      this.map.addObjects([marker1, marker2, marker3, marker4, marker5, marker6]);
      //let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    }, 100);
  }

  //Route Finding
  calcRoute() {
    // Create the parameters for the routing request:
    var routingParameters = {
      // The routing mode:
      'mode': 'fastest;car',
      // The start point of the route:
      'waypoint0': 'geo!34.021741,-118.287356',
      // The end point of the route:
      'waypoint1': 'geol!34.065980,--118.309980',
      // To retrieve the shape of the route we choose the route
      // representation mode 'display'
      'representation': 'display',
      // avoid areas
      'avoidareas': '34.027568,-118.284179;34.027266,-118.283707'
    };

    //Results
    // Define a callback function to process the routing response:
    var onResult = (result) => {
      var route,
        routeShape,
        startPoint,
        endPoint,
        linestring;
      if (result.response.route) {
        // Pick the first route from the response:
        route = result.response.route[0];
        // Pick the route's shape:
        routeShape = route.shape;
        // Create a linestring to use as a point source for the route line
        linestring = new H.geo.LineString();
        // Push all the points in the shape into the linestring:
        routeShape.forEach(function (point) {
          var parts = point.split(',');
          linestring.pushLatLngAlt(parts[0], parts[1]);
        });
        // Retrieve the mapped positions of the requested waypoints:
        startPoint = route.waypoint[0].mappedPosition;
        endPoint = route.waypoint[1].mappedPosition;
        // Create a polyline to display the route:
        var routeLine = new H.map.Polyline(linestring, {
          style: { strokeColor: 'blue', lineWidth: 3 }
        });
        // Create a marker for the start point:
        var startMarker = new H.map.Marker({
          lat: startPoint.latitude,
          lng: startPoint.longitude
        });
        // Create a marker for the end point:
        var endMarker = new H.map.Marker({
          lat: endPoint.latitude,
          lng: endPoint.longitude
        });
        // Add the route polyline and the two markers to the map:
        this.map.addObjects([routeLine, startMarker, endMarker]);
        // Set the map's viewport to make the whole route visible:
        this.map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
      }
    };
    // Get an instance of the routing service:
    var router = this.platform.getRoutingService();
    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult,
      function (error) {
        alert(error.message);
      });
  }
}