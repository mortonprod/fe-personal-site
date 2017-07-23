/**
    Links to notification: Add the ability to add notification from the client. 

    Links to service worker: Subscribe setState as callback to add serviceWorker info.
    Call fire in serviceWorker to update serviceWorker state and then update any compoponent subscribed.


    Additional:
    Connects to notification API and communicates to service worker using postMessage.
    Remember you can't call app code from service worker. Therefore you need to communicate through post message.
    Sw-precache-webpack-plugin will create the service worker so you can't add post message easily to this.
    Therefore just access lifecycle in registerServiceWorker to get when it started. 
    Lifecycle event handlers will pass message to workerService. WorkerService function will then call setState with message if added.

    Require and import will run the global scope once and return exports to all subsequent require/import calls. Import binds data an  require passes by value. 
    Import binds means you can't change the value of import variable directly. It must be done by calling a function inside the imported file.

    If you need to update the app then return a change in state from function and call setState
    @function   
*/
export default (function(){
    /**
        Ask the user to allow notifications.
    */
    function setPermissions(){
        if(!navigator.userAgent.includes("Node.js") && !navigator.userAgent.includes("jsdom")){
			Notification.requestPermission(function(status) {
			    console.log('Notification permission status:', status);
		    });
	        notify("Welcome Back. Notifications Enabled.");
        }
    }
    /**
        If notification granted then show a message
    */
    function notify(message) {
		// Let's check if the browser supports notifications
		if (!("Notification" in window)) {
		    alert("This browser does not support system notifications");
		}

		// Let's check whether notification permissions have already been granted
		else if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			var notification = new Notification(message);
		}

		// Otherwise, we need to ask the user for permission
		else if (Notification.permission !== 'denied') {
			Notification.requestPermission(function (permission) {
			  // If the user accepts, let's create a notification
			  if (permission === "granted") {
			    var notification = new Notification(message);
			  }
			});
        }
    }
	function notifyDetailed(theBody,theIcon,theTitle) {
	    if (Notification.permission === "granted") {
			var options = {
			  body: theBody,
			  icon: theIcon
			}
			var n = new Notification(theTitle,options);
			setTimeout(n.close.bind(n), 5000); 
	    }else{
            Notification.requestPermission(function (permission) {
              // If the user accepts, let's create a notification
              if (permission === "granted") {
                var n = new Notification(theTitle,options);
              }
            });
        }
    }
    return{
        setPermissions,
        notify,
        notifyDetailed
    }
})();

let cb = []
/**
    Only a single copy of cb is create for each import/require, store for subscription setState.
*/
let serviceWorker = (function(){
    function subscribe(fn){
        cb.push(fn);
    }
    function fire(state){
        cb.forEach((el)=>{
            el({serviceWorker:state});
        })
    }
    return {
        subscribe,
        fire
    }
})()

export {serviceWorker};