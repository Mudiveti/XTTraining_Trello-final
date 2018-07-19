	var dashboardName = '';

	

	$(document).ready(function(){


		$(".dashboard-input").blur(function(){
         alert($(this).val());
	});


	});




	document.getElementById('add-to-list').onclick = function() {
		var name = document.getElementById('myInput').value;

		var list = document.getElementById('list');
		var newLI = document.createElement('li');
		newLI.className='card bg-info';

		var div1 = document.createElement("div");
		div1.className='card-body text-center';
		var aTag = document.createElement("a");
		aTag.setAttribute('href',"yourlink.htm");
		aTag.innerHTML='<h6>'+name+'</h6>';
		div1.appendChild(aTag);
		newLI.appendChild(div1);
		list.appendChild(newLI);

	}

