import * as React from "react";
import { loadBingApi, Microsoft } from "./BingMapLoader";

interface IMapProps {
    mapOptions?: any;
}

export default class BingMap extends React.Component<IMapProps, any> {
  
  private mapRef = React.createRef<HTMLDivElement>();
  public pinInfobox:any;
  
  closeInfobox = (e:any) =>{
            this.pinInfobox.setOptions({visible:false});
        }

  public pushpinFrameBVHTML = '<div style="overflow-wrap: break-word; color: rgb(255, 255, 255); display: block;"><span class="teaser-offer--close"></span><div class="teaser-offer place map-layer"><p class="teaser-offer--title">{title}</p><div class="teaser-offer--content"><div class="teaser-offer--content--inner"><div class="teaser-offer--text"><div class="teaser-offer--contact"><address class="teaser-offer--place physical-address"><span class="highlight">{description}</span></address><ul class="teaser-offer--infos"><li class="teaser-offer--infos-item phone"><a href="tel:+7 347 246 92 74" title="Call to +7 347 246 92 74" class="phone-link">+7 347 246 92 74</a></li><li class="teaser-offer--infos-item email"><a href="mailto:ufa.office@inspectorate.ru">ufa.office@inspectorate.ru</a></li><li class="teaser-offer--infos-item website"><a href="{url}" target="_blank">{url}</a></li></ul></div></div></div></div></div></div>';


  public pushpinFrameHTML = '<div class="infobox"><a class="infobox_close" href="javascript:{'+this.closeInfobox+'}"><img src="images/close.png"/></a><div class="infobox_content">{content}</div></div><div class="infobox_pointer"><img src="images/pointer_shadow.png"></div>';

  public componentDidMount() {
    loadBingApi().then(() => {
      this.initMap();
    });
  }

  
displayInfobox0 = (e:any) =>
         {
             if (e.targetType == "pushpin") {
              
                this.pinInfobox.setOptions({
                    visible:true,
                    offset: new Microsoft.Maps.Point(-30,40),
                   htmlContent: this.pushpinFrameBVHTML.replace('{title}', e.target.Title).replace('{description}', e.target.Description).replace('{url}', e.target.url)
                });

                //set location of infobox
                this.pinInfobox.setLocation(e.target.getLocation());
            }
         }
 displayInfobox = (e:any) => {
   this.pinInfobox.setOptions({ title: e.target.Title, description: e.target.Description, visible: true, offset: new Microsoft.Maps.Point(0, 25)
    });
    this.pinInfobox.setLocation(e.target.getLocation());
  }
displayInfobox1 = (e:any) =>
         {
             if (e.targetType == "pushpin") {
                var pin = e.target;
               var infoboxTemplate = '<div class="infobox1"><div class="title">{title}</div>{description}</div>';
                
                var title = e.target.Title;
                var description = e.target.Description+' <br/><br/><a href="tel:'+e.target.phone+'" target="_blank" class="phone">'+e.target.phone+'</a><br/><br/><a href="mailto:'+e.target.email+'" target="_blank" class="email">'+e.target.email+'</a><br/><br/><a href="'+e.target.url+'" target="_blank" class="url">'+e.target.url+'</a>';


                this.pinInfobox.setOptions({
                    visible:true,
                    offset: new Microsoft.Maps.Point(-30,40),
                   htmlContent: infoboxTemplate.replace('{title}', title).replace('{description}', description)
                });

                //set location of infobox
                this.pinInfobox.setLocation(pin.getLocation());
            }
         }
  displayInfobox3 = (e:any) =>
         {
             if (e.targetType == "pushpin") {
                var pin = e.target;
                 var infoboxTemplate = '<div class="infobox1"><div class="title">' + e.target.Title + '</div>'+ e.target.Description+'</div>';

                this.pinInfobox.setOptions({
                    visible:true,
                    offset: new Microsoft.Maps.Point(-30,40),
                    htmlContent: infoboxTemplate
                });

                //set location of infobox
                this.pinInfobox.setLocation(pin.getLocation());
            }
         }
  displayInfobox2 = (e:any) =>
         {
             if (e.targetType == "pushpin") {
                var pin = e.target;

                var html = "<span class='infobox_title'>" + e.target.Title + "</span><br/>" + e.target.Description;

                this.pinInfobox.setOptions({
                    visible:true,
                    offset: new Microsoft.Maps.Point(-33, 20),
                    htmlContent: this.pushpinFrameHTML.replace('{content}',html)
                });

                //set location of infobox
                this.pinInfobox.setLocation(pin.getLocation());
            }
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
   

    pushpinInfos[0] = { 'lat': 19.0826881, 'lng': 72.6009738, 'title': 'MUMBAI - HEAD OFFICE', 'description': '72. BUSINESS PARK. MAROL INDUSTRIAL AREA CROSS ROAD "C". ANDHERI EAST. MUMBAI MAHARASHTRA INDIA','phone': '+ 91 22 6274 2000','email': 'bvindia.corporate@in.bureauveritas.com','url': 'https://www.bureauveritas.co.in/'};
    
    pushpinInfos[1] = { 'lat': 13.0480438, 'lng': 79.9287977, 'title': 'CHENNAI - I & F OFFICE', 'description': 'CHAMIERS TOWERS. 7TH FLOOR NEW DOOR NO. 37. CHAMIERS ROAD TEYNAMPET CHENNAI TAMIL NADU INDIA','phone': '+ 91 44 4226 4500','email': 'bv.chennai@bureauveritas.com','url': 'https://www.bureauveritas.co.in/'};

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
        pin.phone=pushpinInfos[i].phone;
        pin.email=pushpinInfos[i].email;
        pin.url=pushpinInfos[i].url;

        pinLayer.push(pin); 
        Microsoft.Maps.Events.addHandler(pin, 'click', this.displayInfobox1);
        Microsoft.Maps.Events.addHandler(pin, 'mouseover', this.closeInfobox);
    }
 
    map.entities.push(pinLayer);
    map.entities.push(infoboxLayer);

    var bestview = Microsoft.Maps.LocationRect.fromLocations(locs);
    map.setView({ center: bestview.center, zoom: 10 });
    return map;
  }
}
