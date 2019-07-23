import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChange, SimpleChanges } from '@angular/core';
declare var H: any;
@Component({
  selector: 'here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit {
  @Input()
  public address: any;
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
  public nav;
  public destMarker;
  public routeLine;
  public ui;
  public constructor() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.address.currentValue) {
      console.log('ready for navigation');
      this.checkRoute(changes.address.currentValue);
    }
  }
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
      // add a resize listener to make sure that the map occupies the whole container
      window.addEventListener('resize', () => this.map.getViewPort().resize());
      this.ui = H.ui.UI.createDefault(this.map, this.defaultLayers);
      var mapEvents = new H.mapevents.MapEvents(this.map);
      var behavior = new H.mapevents.Behavior(mapEvents);
      var outerElement = document.createElement('div'),
        innerElement = document.createElement('div');
      innerElement.innerHTML = '<img src="../assets/theft.png" style="margin-left: -16px; margin-top:-16px;" />';
      outerElement.appendChild(innerElement);
      var domIcon = new H.map.DomIcon(outerElement, {});
      // marker 1 <p>Theft <br> 900 BLOCK W 30TH ST</p>
      const marker1 = new H.map.DomMarker({ lat: 34.023370, lng: -118.274240 }, { icon: domIcon });
      marker1.setData("<div style='width:200px; text-align:center; background-color: white;'> <p style='color:black; margin: 0;'>900 Block W 30th ST</p>  <p style='color:green; margin: 0;'> Frequent Crime Here: </p> <p style='color:black; margin: 0;'> Theft </p> </div>");
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
        // remove previous bubbles
        if (this.ui.getBubbles().length > 0) {
          for (let item of this.ui.getBubbles()) {
            this.ui.removeBubble(item);
          }
        }
        this.ui.addBubble(bubble);
        // zoom to marker
        this.map.setCenter(
          { lat: 34.021960, lng: -118.279970 },
          5
        )
        console.log(bubble.getContentElement());
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
      var outerElement = document.createElement('div'),
        innerElement = document.createElement('div');
      innerElement.innerHTML = '<img src="../assets/fist.png" style="margin-left: -16px; margin-top:-16px;" />';
      outerElement.appendChild(innerElement);
      var domIcon = new H.map.DomIcon(outerElement, {});
      // marker 2
      const marker2 = new H.map.DomMarker({ lat: 34.021960, lng: -118.279970 }, { icon: domIcon });
      marker2.setData("<div style='width:200px; text-align:center; background-color: white;'> <p style='color:black; margin: 0;'>3200 Block S Hoover ST</p>  <p style='color:green; margin: 0;'> Frequent Crime Here: </p> <p style='color:black; margin: 0;'> Theft </p> </div>");
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
        // remove previous bubbles
        if (this.ui.getBubbles().length > 0) {
          for (let item of this.ui.getBubbles()) {
            this.ui.removeBubble(item);
          }
        }
        this.ui.addBubble(bubble);
        console.log('zoom');
        // zoom to marker
        this.map.setCenter(
          { lat: 34.021960, lng: -118.279970 },
          5
        )
      });
      this.map.addObject(new H.map.Circle(
        { lat: 34.021960, lng: -118.27997 },
        200,
        {
          style: {
            strokeColor: 'rgba(290, 0, 0, 0.4)',
            lineWidth: 1,
            fillColor: 'rgba(290, 0, 0, 0.4)'
          }
        }
      ));
      var outerElement = document.createElement('div'),
        innerElement = document.createElement('div');
      innerElement.innerHTML = '<img src="../assets/bandit.png" style="margin-left: -16px; margin-top:-16px;" />';
      outerElement.appendChild(innerElement);
      var domIcon = new H.map.DomIcon(outerElement, {});
      // marker 3
      const marker3 = new H.map.DomMarker({ lat: 34.026270, lng: -118.298850 }, { icon: domIcon });
      marker3.setData("<div style='width:200px; text-align:center; background-color: white;'> <p style='color:black; margin: 0;'>Vermont Ave & 30TH ST</p>  <p style='color:green; margin: 0;'> Frequent Crime Here: </p> <p style='color:black; margin: 0;'> Theft </p> </div>");
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
        // remove previous bubbles
        if (this.ui.getBubbles().length > 0) {
          for (let item of this.ui.getBubbles()) {
            this.ui.removeBubble(item);
          }
        }
        this.ui.addBubble(bubble);
        // zoom to marker
        this.map.setCenter(
          { lat: 34.026270, lng: -118.298850 },
          5
        )
      });
      this.map.addObject(new H.map.Circle(
        { lat: 34.026270, lng: -118.298850 },
        200,
        {
          style: {
            strokeColor: 'rgba(290, 0, 0, 0.4)',
            lineWidth: 1,
            fillColor: 'rgba(290, 0, 0, 0.4)'
          }
        }
      ));
      var outerElement = document.createElement('div'),
        innerElement = document.createElement('div');
      innerElement.innerHTML = '<img src="../assets/theft.png" style="margin-left: -16px; margin-top:-16px;" />';
      outerElement.appendChild(innerElement);
      var domIcon = new H.map.DomIcon(outerElement, {});
      // marker 4
      const marker4 = new H.map.DomMarker({ lat: 34.022130, lng: -118.292300 }, { icon: domIcon });
      marker4.setData("<div style='width:200px; text-align:center; background-color: white;'> <p style='color:black; margin: 0;'>1100 Block W 36TH PL</p>  <p style='color:green; margin: 0;'> Frequent Crime Here: </p> <p style='color:black; margin: 0;'> Theft </p> </div>");
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
        // remove previous bubbles
        if (this.ui.getBubbles().length > 0) {
          for (let item of this.ui.getBubbles()) {
            this.ui.removeBubble(item);
          }
        }
        this.ui.addBubble(bubble);
        // zoom to marker
        this.map.setCenter(
          { lat: 34.022130, lng: -118.292300 },
          5
        )
      });
      this.map.addObject(new H.map.Circle(
        { lat: 34.022130, lng: -118.292300 },
        200,
        {
          style: {
            strokeColor: 'rgba(290, 0, 0, 0.4)',
            lineWidth: 1,
            fillColor: 'rgba(290, 0, 0, 0.4)'
          }
        }
      ));
      var outerElement = document.createElement('div'),
        innerElement = document.createElement('div');
      innerElement.innerHTML = '<img src="../assets/fist.png" style="margin-left: -16px; margin-top:-16px;" />';
      outerElement.appendChild(innerElement);
      var domIcon = new H.map.DomIcon(outerElement, {});
      // marker 6
      const marker6 = new H.map.DomMarker({ lat: 34.018850, lng: -118.281026 }, { icon: domIcon });
      marker6.setData("<div style='width:200px; text-align:center; background-color: white;'> <p style='color:black; margin: 0;'>Figueroa & Jefferson</p>  <p style='color:green; margin: 0;'> Frequent Crime Here: </p> <p style='color:black; margin: 0;'> Theft </p> </div>");
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
        // remove previous bubbles
        if (this.ui.getBubbles().length > 0) {
          for (let item of this.ui.getBubbles()) {
            this.ui.removeBubble(item);
          }
        }
        this.ui.addBubble(bubble);
        // zoom to marker
        this.map.setCenter(
          { lat: 34.018850, lng: -118.281026 },
          5
        )
      });
      this.map.addObject(new H.map.Circle(
        { lat: 34.018850, lng: -118.281026 },
        200,
        {
          style: {
            strokeColor: 'rgba(290, 0, 0, 0.4)',
            lineWidth: 1,
            fillColor: 'rgba(290, 0, 0, 0.4)'
          }
        }
      ));
      this.map.addObjects([marker1, marker2, marker3, marker4, marker6]);
      //let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    }, 100);
  }
  //Route Finding
  calcRoute() {
    const waypoint0 = `geo!${this.lat},${this.lng}`;
    const waypoint1 = `geo!${this.address.DisplayPosition.Latitude},${this.address.DisplayPosition.Longitude}`;
    var routingParameters = {
      // The routing mode:
      'mode': 'fastest;car',
      // The start point of the route:
      'waypoint0': waypoint0,
      // The end point of the route:
      'waypoint1': waypoint1,
      'representation': 'display',
      // avoid areas
      'avoidareas': '34.027568,-118.284179;34.027266,-118.283707'
    };
    //Results
    // Define a callback function to process the routing response:
    var onResult = (result) => {
      this.nav = null;
      if(this.routeLine){
        this.map.removeObject(this.routeLine);
        this.routeLine = null;
      }
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
        this.routeLine = new H.map.Polyline(linestring, {
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
        this.map.addObjects([this.routeLine]);
        // Set the map's viewport to make the whole route visible:
        this.map.setCenter(
          { lat: this.lat, lng: this.lng },
          5
        )
        //this.map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
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
  checkRoute(address) {
    if (this.ui.getBubbles().length > 0) {
      for (let item of this.ui.getBubbles()) {
        this.ui.removeBubble(item);
      }
    }
    if(this.routeLine){
      this.map.removeObject(this.routeLine);
      this.routeLine = null;
    }
    if(this.destMarker){
      this.map.removeObject(this.destMarker);
    }
    this.address = address;
    this.nav = address;
    var dest = new H.map.Icon("../assets/destination.png", { });
    this.destMarker = new H.map.Marker({ lat: address.DisplayPosition.Latitude, lng: address.DisplayPosition.Longitude }, { icon: dest });
    this.map.addObjects([this.destMarker]);
    // zoom to marker
    this.map.setCenter(
      { lat: address.DisplayPosition.Latitude, lng: address.DisplayPosition.Longitude },
      5
    )
  }
  close(){
    if(this.routeLine){
      this.map.removeObject(this.routeLine);
      this.routeLine = null;
    }
    this.map.removeObject(this.destMarker);
    this.destMarker = null;
    this.nav = null;
    this.map.setCenter(
      { lat: this.lat, lng: this.lng },
      5
    )
  }
}
