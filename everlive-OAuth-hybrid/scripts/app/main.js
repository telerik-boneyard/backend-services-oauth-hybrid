var everliveApiKey = '';

//Settings of your Facebook project
var fbSettings = {
    client_id: '',
	redirect_uri:'',
}

//Settings of your Google project
var gSettings = {
    client_id: '',
	redirect_uri:'',
}

//Settings of you LiveID project
var liveSettings = {
    client_id: '',
	redirect_uri:'',
}

var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicity call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		app.initializeEverlive();
		app.initializeFacebookAuthentication();
		app.initializeGoogleAuthentication(); 
		app.initializeLiveIdAuthentication();
		navigator.splashscreen.hide();
	},
	initializeEverlive:function() {
		Everlive.init({
			apiKey: everliveApiKey
		});
	},
	initializeFacebookAuthentication: function() {
		var facebookConfig = {
			name: "Facebook",
			loginMethodName: "loginWithFacebook",
			endpoint: "https://www.facebook.com/dialog/oauth",
			response_type:"token",
			client_id: fbSettings.client_id,
			redirect_uri: fbSettings.redirect_uri,
			access_type:"online",
			scope:"email",
			display: "touch"
		};
		var facebook = new IdentityProvider(facebookConfig); 
		var loginFbBtn = document.getElementById("loginFb");
		loginFbBtn.addEventListener('click', function() {
			facebook.getAccessToken(function(token) {
				Everlive.$.Users.loginWithFacebook(token)
				.then(function(res) {
					console.log(res);
					var message = "Welcome to Everlive!";
					navigator.notification.alert(message, function() {
					}, "Everlive")
				}, function(err) {
					console.log(err);
					navigator.notification.alert(err.message, function() {
					}, "Everlive")
				})
			})
		});
	},
	initializeGoogleAuthentication: function() {
		var googleConfig = {
			name: "Google",
			loginMethodName:"loginWithGoogle",
			endpoint: "https://accounts.google.com/o/oauth2/auth",
			response_type: "token",
			client_id: gSettings.client_id,
			redirect_uri: gSettings.redirect_uri, 				 
			scope: "https://www.googleapis.com/auth/userinfo.profile", 
			access_type: "online",
			display: "touch" 
		};
		var google = new IdentityProvider(googleConfig);
        
		var loginGoogleBtn = document.getElementById("loginGoogle");
		loginGoogleBtn.addEventListener('click', function() {
			google.getAccessToken(function(token) {
				Everlive.$.Users.loginWithGoogle(token)
				.then(function(res) {
					console.log(res);
					var message = "Welcome to Everlive!";
					navigator.notification.alert(message, function() {
					}, "Everlive")
				}, function(err) {
					console.log(err);
					navigator.notification.alert(err.message, function() {
					}, "Everlive")
				})
			})
		});
	},
	initializeLiveIdAuthentication: function() {
		var liveIdConfig = {
			name: "LiveID",
			loginMethodName:"loginWithLiveID",
			endpoint: "https://login.live.com/oauth20_authorize.srf",
			response_type: "token",
			client_id: liveSettings.client_id,
			redirect_uri: liveSettings.redirect_uri,				 
			scope: "wl.basic",
			access_type: "online",
			display: "touch"
		};
		var liveId = new IdentityProvider(liveIdConfig);
        
		var loginLiveIdBtn = document.getElementById("loginLiveId");
		loginLiveIdBtn.addEventListener('click', function() {
			liveId.getAccessToken(function(token){
                Everlive.$.Users.loginWithLiveID(token)
				.then(function(res) {
					console.log(res);
					var message = "Welcome to Everlive!";
					navigator.notification.alert(message, function() {
					}, "Everlive")
				}, function(err) {
					console.log(err);
					navigator.notification.alert(err.message, function() {
					}, "Everlive")
				})
            })
		});
	}
};