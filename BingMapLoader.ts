// tslint:disable:interface-name
export interface MapWindow extends Window {
  Microsoft: any;
  bingAPIReady: () => void; 
}

declare let window: MapWindow;
export let Microsoft: any;



export function loadBingApi(key?: string): Promise<void> {
  const callbackName = "bingAPIReady";
  let url = `https://www.bing.com/api/maps/mapcontrol?callback=${callbackName}&key=ApJA7XsmAsrok-nwOdyQILRZAjsHNu4_GCjn2fhoeo-7q3RG2km1UwBjqPPuEkXd`;
  if (key) {
    url += `&key=${key}`;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.src = url;
    window.bingAPIReady = () => {
      Microsoft = window.Microsoft;
      resolve();
    };
    script.onerror = (error: Event) => {
      reject(error);
    };
    document.body.appendChild(script);
  });
}
