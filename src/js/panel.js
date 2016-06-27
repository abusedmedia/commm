;(function(){
	$(window).ready(function(){


		$('#commm').css({x:350})
		var open = false;

		$('#commm_togglr').on('click', function(){
			$('#commm_togglr').hide()
			$('#commm').css({display:'block'})
			$('#commm').transition({x:0}, 500, 'easeInOutExpo')
			open=true
		})
		$('[commm_close]').on('click', function(){
			$('#commm').transition({x:350}, 500, 'easeInOutExpo')
			setTimeout(function(){
				$('#commm').css({display:'none'})
			}, 501)
			$('#commm_togglr').show()
			open=true
		})


	})
})();