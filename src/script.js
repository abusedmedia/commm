;(function(){


	$('#commm_container').css({x:350, display:'none'})
	var open = false;

	$('#commm_togglr').on('click', function(){
		$('#commm_togglr').hide()
		$('#commm_container').css({display:'block'})
		$('#commm_container').transition({x:0}, 500, 'easeInOutExpo')
		open=true
	})
	// $('#commm_head').on('click', function(){
	// 	$('#commm_container').transition({x:350}, 500, 'easeInOutExpo')
	// 	setTimeout(function(){
	// 		$('#commm_container').css({display:'none'})
	// 	}, 501)
	// 	$('#commm_togglr').show()
	// 	open=true
	// })

	var firebase_config = {
	  apiKey: "AIzaSyChN7OL3hGJe4NRF5rQ5DpaFurkLab3v7c",
	  authDomain: "project-5948081093960809797.firebaseapp.com",
	  databaseURL: "https://project-5948081093960809797.firebaseio.com",
	  storageBucket: "",
	};
	firebase.initializeApp(firebase_config);

	firebase.database().ref().on('value', function(snapshot){
		console.log(snapshot.val())
	})

	var provider = new firebase.auth.GoogleAuthProvider();



	// check
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		user.the_name = (user.displayName) ? user.displayName : user.email 
	    setAsLoggedIn(user)
	    initBoard(user)
	  } else {
	    setAsLoggedOut()
	  }
	});


	// login
	$('#commm_login').on('click', function(){
		firebase.auth().signInWithRedirect(provider);
		firebase.auth().getRedirectResult().then(function(result) {
		  	console.log(result.user)
		}).catch(function(error) {
			console.log(error)
		});
	})

	// logout
	$('#commm_logout').on('click', function(){
		firebase.auth().signOut().then(function() {
		  console.log('logged out')
		}, function(error) {
		  console.log('logged out error')
		});
		return false;
	})

	$('#commm_login').hide()
	$('#commm_logout').hide()
	$('#commm_newthread').hide()
	$('#commm_newtext').hide()

	function setAsLoggedIn(usr){
		$('#commm_displayName').text(usr.the_name)
		$('#commm_logout').show()
		$('#commm_login').hide()
		$('#commm_newthread').show()
		$('#commm_newtext').show()
	}

	function setAsLoggedOut(){
		$('#commm_displayName').text('')
		$('#commm_logout').hide()
		$('#commm_login').show()
		$('#commm_newthread').hide()
		$('#commm_newtext').hide()
		$('#commm_mainList').html('')
	}


	function initBoard(usr){
		var loc = window.location.href.split('://')[1]
		console.log(loc)

		locref = 'pages/'+loc

		var page = {}
		console.log(usr)

		var db = firebase.database();
		db.ref(locref).on('value', function(snapshot){
			if(!snapshot.val()){
				page[locref] = {loc:loc,  email:usr.email, name:usr.the_name, created:new Date(), updated:new Date(), threads:[]}
				db.ref().update(page)
					.then(function(data){
						console.log('then', data)
					})	
					.catch(function(data){
						console.log('catch', data)
					})
			}else{
				page[locref] = snapshot.val()
				page[locref].updated = new Date()
			}

			console.log(page[locref])

			updateList()
			
		})


		$('#commm_newthread').on('click', function(){
			var p = page[locref]
			if(!p.threads) p.threads = []

			var txt = $('#commm_newtext').val()

			var thread = {email:usr.email, name:usr.the_name, created:new Date(), updated:new Date(), replies:[{name:usr.the_name, text:txt}]}

			p.threads.push(thread)

			console.log(page)

			db.ref().update(page)
					.then(function(data){
						console.log('then', data)
						updateList()
					})	
					.catch(function(data){
						console.log('catch', data)
					})

			return false
		})


		function updateList(){
			$('.reply').off()
			$('.mark').off()

			$('#commm_mainList').html('')
			page[locref].threads.forEach(function(d, i){
				if(d.status != 'archived'){
					var item = $('<li><button class="mark" id="commm_mark__'+i+'">Mark</button></li>')
					var repl = d.replies
					repl.forEach(function(c, j){
						var reply = $('<p>'+c.name+': <small>'+c.text+'</small></p>')
						item.append(reply)
					})
					item.append('<input id="commm_reply__'+i+'" type="text" /><button class="reply" id="commm_reply_submit__'+i+'">Add</button>')
					$('#commm_mainList').append(item)
				}
			})

			$('.reply').on('click', function(){
				var id = $(this).attr('id').split('__')[1]
				var txt = $('#commm_reply__'+id).val()

				var thread = page[locref].threads[id]
				thread.replies.push({name:usr.the_name, text:txt})

				db.ref().update(page)
					.then(function(data){
						console.log('then', data)
						updateList()
					})	
					.catch(function(data){
						console.log('catch', data)
					})
				return false
			})

			$('.mark').on('click', function(){
				var id = $(this).attr('id').split('__')[1]
				var thread = page[locref].threads[id]
				thread.status = 'archived'
				db.ref().update(page)
					.then(function(data){
						console.log('then', data)
						updateList()
					})	
					.catch(function(data){
						console.log('catch', data)
					})
				return false
			})

			$('#commm_togglr_inner').text( page[locref].threads.length )
		}

	}

	

})();
