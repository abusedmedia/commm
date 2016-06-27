;(function(){

	$(window).ready(function(){

			

			firebase.database().ref().on('value', function(snapshot){
				console.log('value', snapshot.val())
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
			$('[commm_login]').on('click', function(){
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

			$('#commm_login_btn').hide()
			$('#commm_logout').hide()
			$('#commm_newthread').hide()
			$('#commm_newtext').hide()

			function setAsLoggedIn(usr){
				$('#commm_displayName').text(usr.the_name)
				$('#commm_logout').show()
				$('#commm_login_btn').hide()
				$('#commm_newthread').show()
				$('#commm_newtext').show()
			}

			function setAsLoggedOut(){
				$('#commm_displayName').text('')
				$('#commm_logout').hide()
				$('#commm_login_btn').show()
				$('#commm_newthread').hide()
				$('#commm_newtext').hide()
				$('#commm_mainList').html('')
			}



			function update(page){
				var db = firebase.database();
				db.ref().update(page)
					.then(function(data){
						console.log('then', data)
					})	
					.catch(function(data){
						console.log('catch', data)
					})
			}

			function initBoard(usr){
				var loc = window.location.href.split('://')[1]
				console.log(loc)

				locref = 'pages/'+loc

				var page = {}

				var db = firebase.database();
				db.ref(locref).on('value', function(snapshot){
					if(!snapshot.val()){
						page[locref] = {loc:loc,  email:usr.email, name:usr.the_name, created:new Date(), updated:new Date(), threads:[]}
						update(page)
					}else{
						page[locref] = snapshot.val()
						page[locref].updated = new Date()
					}

					updateList()
				})


				$('#commm_newthread').on('click', function(){
					var p = page[locref]
					if(!p.threads) p.threads = []

					var txt = $('#commm_newtext').val()

					var thread = {email:usr.email, name:usr.the_name, created:new Date(), updated:new Date(), replies:[{name:usr.the_name, text:txt}]}

					p.threads.push(thread)

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
					console.log('updateList')
					$('#commm .reply').off()
					$('#commm .mark').off()
					$('#commm .del').off()

					$('#commm_mainList').html('')
					page[locref].threads.forEach(function(d, i){
						if(d.status != 'archived'){
							var item = $('<li><button class="mark" id="commm_mark__'+i+'">Mark as resolved</button></li>')
							var repl = d.replies
							repl.forEach(function(c, j){
								if(c.status != 'archived'){
									var del = (c.email == usr.email) ? '<button class="del" id="commm_del__'+i+'__'+j+'">Remove</button>' : ''
									var reply = $('<p>'+c.name+': '+del+'<small>'+c.text+'</small></p>')
									item.append(reply)
								}
							})
							item.append('<textarea rows="5" id="commm_reply__'+i+'" ></textarea><button class="reply" id="commm_reply_submit__'+i+'">Reply</button>')
							$('#commm_mainList').append(item)
						}
					})

					$('#commm .reply').on('click', function(){
						var id = $(this).attr('id').split('__')[1]
						var txt = $('#commm_reply__'+id).val()

						var thread = page[locref].threads[id]
						thread.replies.push({name:usr.the_name, email:usr.email, text:txt, created:new Date()})

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

					$('#commm .mark').on('click', function(){
						var id = $(this).attr('id').split('__')[1]
						var thread = page[locref].threads[id]
						thread.status = 'archived'
						thread.marked_by = usr.the_name
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

					$('#commm .del').on('click', function(){
						var ids = $(this).attr('id').split('__')
						var msg = page[locref].threads[ids[1]].replies[ids[2]]
						msg.status = 'archived'
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

					
					var v = 0
					page[locref].threads.forEach(function(d, i){
						if(d.status != 'archived'){
							v += 1
						}
					})
					Public_Stats.update(v)
					
				}

			}



	})

})();
