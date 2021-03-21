import * as React from "react";
import { loadBingApi, Microsoft } from "./BingMapLoader";

interface IMapProps {
    mapOptions?: any;
}

export default class BingMap extends React.Component<IMapProps, any> {
  private mapRef = React.createRef<HTMLDivElement>();
  public pinInfobox:any;

  public componentDidMount() {
    loadBingApi().then(() => {
      this.initMap();
    });
  }
 displayInfobox = (e:any) => {
   this.pinInfobox.setOptions({ title: e.target.Title, description: e.target.Description, visible: true, offset: new Microsoft.Maps.Point(0, 25) });
    this.pinInfobox.setLocation(e.target.getLocation());
  }
  public render() {
    return <div ref={this.mapRef} className="map" />;
  }
  

  private initMap() {
    const map = new Microsoft.Maps.Map(this.mapRef.current);
    if (this.props.mapOptions) {
      map.setOptions(this.props.mapOptions);
    }
    var pushpinInfos = [];
   

    pushpinInfos[0] = { 'lat': 42.0076215, 'lng': 20.9689308, 'title': 'Kipper Market', 'description': 'Braka Miladinovi 178, 1200 Tetovë, Tetovo, Macedonia' };
    
    pushpinInfos[1] = { 'lat': 41.799645, 'lng': 20.913514, 'title': 'Kipper Market', 'description': 'Kipper Gostivar' };

    var infoboxLayer = new Microsoft.Maps.EntityCollection();
    var pinLayer = new Microsoft.Maps.EntityCollection();

    // Create the info box for the pushpin
    this.pinInfobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false });
    infoboxLayer.push(this.pinInfobox);

    var locs = [];
    for (var i = 0 ; i < pushpinInfos.length; i++) {
        locs[i] = new Microsoft.Maps.Location(pushpinInfos[i].lat, pushpinInfos[i].lng);
        var pin = new Microsoft.Maps.Pushpin(locs[i],{
        icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
        anchor: new Microsoft.Maps.Point(12, 39)
        });
        pin.Title = pushpinInfos[i].title;
        pin.Description = pushpinInfos[i].description;
        
        pinLayer.push(pin); 
        Microsoft.Maps.Events.addHandler(pin, 'click', this.displayInfobox);
    }
 
    map.entities.push(pinLayer);
    map.entities.push(infoboxLayer);

    var bestview = Microsoft.Maps.LocationRect.fromLocations(locs);
    map.setView({ center: bestview.center, zoom: 10 });
    return map;
  }
}
