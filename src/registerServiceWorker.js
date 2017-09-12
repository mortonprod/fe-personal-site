import {serviceWorker} from "./workerService";

/**
    Connects and communicates between the service worker and the page. 
    Update App state when particular event handlers called. 
    @function
*/

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    serviceWorker.fire({message:'Loading service worker.'});
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            serviceWorker.fire({message:'Service worker running.'});

			registration.onupdatefound = () => {
			const installingWorker = registration.installing;
				installingWorker.onstatechange = () => {
				  if (installingWorker.state === 'installed') {
				    if (navigator.serviceWorker.controller) {
				      // At this point, the old content will have been purged and
				      // the fresh content will have been added to the cache.
				      // It's the perfect time to display a "New content is
				      // available; please refresh." message in your web app.
                      serviceWorker.fire({message:'New content is available; please refresh.'});
				    } else {
				      // At this point, everything has been precached.
				      // It's the perfect time to display a
				      // "Content is cached for offline use." message.

                      serviceWorker.fire({message:'New content is available; please refresh.'});
				    }
				  }
				};
			};


        })
        .catch(error => {

          serviceWorker.fire({message:'Error during service worker registration'});
        });
    });
  }else{
    serviceWorker.fire({message:'No service worker found. Use chrome of firefox for those features.'});
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
