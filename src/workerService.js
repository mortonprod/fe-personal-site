/**
    The function returns function to access the service worker. 
    If you need to update the app then return a change in state from function and call setState
    @function   
*/
export default (function(){
    /**
        Ask the user to allow notifications.
    */
    function setPermissions(){
		Notification.requestPermission(function(status) {
		    console.log('Notification permission status:', status);
	    });
        notify("Welcome Back. Notifications Enabled.");
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