;(function(){

	Public_Stats = {};
	
	function getLoc(){
		var loc = window.location.href.split('://')[1]

		loc = loc.replace('.', '_')
		loc = loc.replace('#', '__')
		loc = loc.replace('$', '___')
		loc = loc.replace('[', '--')
		loc = loc.replace(']', '--')

		return loc
	}
	
	var loc = getLoc()

	// get the public stats number to populate the + btn
	var stats = {}
	stsref = 'stats/'+loc
	firebase.database().ref(stsref).on('value', function(snapshot){
		var v = 0
		if(!snapshot.val()){
			stats[stsref] = {active:v}
			firebase.database().ref().update(stats)
				.then(function(data){
					console.log('ok stats', data)
				})	
				.catch(function(data){
					console.log('err stats', data)
				})
		}else{
			stats[stsref] = snapshot.val()
			v = stats[stsref].active
		}
		$('#commm_togglr_inner').text( v )
	})



	function update(v){
		stats[stsref].active = v
		firebase.database().ref().update(stats)
				.then(function(data){
					console.log('then', data)
				})	
				.catch(function(data){
					console.log('catch', data)
				})
	}

	Public_Stats.update = update
	Public_Stats.getLoc = getLoc
	
})();