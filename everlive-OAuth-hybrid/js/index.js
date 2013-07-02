/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
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
			apiKey: ''
		});
	},
	initializeFacebookAuthentication: function() {
		var facebookConfig = {
			name: "Facebook",
			loginMethodName: "loginWithFacebook",
			endpoint: "https://www.facebook.com/dialog/oauth",
			response_type:"token",
			client_id: "622842524411586",
			redirect_uri:"https://www.facebook.com/connect/login_success.html",
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
			client_id: "778590299624.apps.googleusercontent.com",
			redirect_uri: "https://www.facebook.com/connect/login_success.html", 				 
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
			client_id: "00000000480F82FA",
			redirect_uri: "https://www.everlive.com/SignIn", 				 
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