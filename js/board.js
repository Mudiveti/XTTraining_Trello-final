var listName='';
var deleteListName='';
var params = getParams();
$(document).ready(function(){

/*
	$.ajax ({
		type: "GET",
		url: "http://localhost:3000/subList?id="+params.boardId,
		success: function(data)
		{

			document.getElementById('dashBoardId').innerHTML=params.boardName;
			var ul1 = document.getElementById('ulId');

			$.each(data.subListArray, function(i, sublist) {

					var li1 = document.createElement("li");
					li1.className='card ui-state-default sort';
					li1.innerHTML='<div type="button" class="btn text-left edit-list" data-toggle="modal" data-target="#myModal">'+sublist.subListName+'</div><div class="modal fade" id="myModal"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Edit</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><form class="form-inline" role="form"><input type="text" class="form-control mb-2 mr-sm-2" placeholder="name.."></form></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteListName()">Delete</button><button type="button" class="btn btn-primary" onclick="changeListName(this">Submit</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';
					var ul2 = document.createElement("ul");
					ul2.className='list sortableList';
                      

                     $.ajax ({
			                 type: "GET",
			                 url: "http://localhost:3000/items?subListId="+sublist.subListId,
			                 success: function(data)
			                   {
			                     	$.each(data.items, function(i, item) {
						            var li2 = document.createElement("li");
						            li2.className='btn bg-light text-left ui-state-default list_item_button show';
						            li2.innerHTML=item.itemName;
						            ul2.appendChild(li2);

					                 });
			                   }
		             });

					li1.appendChild(ul2);
					li1.innerHTML=li1.innerHTML+'<div  class="itemInput"><input type="text" placeholder="list name..." class="itemname" maxlength="40"><button type="button" class="btn btn-primary ml-1 addbutton" onclick="return addItem(this)">Add</button></div>';
					ul1.appendChild(li1);
			
			});
		}
	});

	*/





	document.getElementById('dashBoardId').innerHTML=params;
	var data =  [{
		"boardName": "Dashboard1",
		"boardId": "Id1",
		"itemList": [{
			"itemListName": "List1",
			"items": ["Item11", "Item12", "Item13"]
		},
		{
			"itemListName": "List2",
			"items": ["Item21", "Item22", "Item23"]
		},
		{
			"itemListName": "List3",
			"items": ["Item31", "Item32", "Item33"]
		}/*,
		{
			"itemListName": "List1",
			"items": ["Item1", "Item2", "Item3"]
		},
		{
			"itemListName": "List1",
			"items": ["Item1", "Item2", "Item3"]
		},
		{
			"itemListName": "List1",
			"items": ["Item1", "Item2", "Item3"]
		}*/
		]
	}];

	$.each(data, function(i, item) {
		document.getElementById('dashBoardId').innerHTML=item.boardName;
		var ul1 = document.getElementById('ulId');
		$.each(item.itemList, function(i, list) {
			var li1 = document.createElement("li");
			li1.className='card ui-state-default sort';
			li1.innerHTML='<div type="button" class="btn text-left edit-list" data-toggle="modal" data-target="#myModal">'+list.itemListName+'</div><div class="modal fade" id="myModal"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Edit</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><form class="form-inline" role="form"><input type="text" class="form-control mb-2 mr-sm-2" placeholder="name.." ></form></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteListName()">Delete</button><button type="button" class="btn btn-primary" onclick="changeListName(this)">Submit</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';
			var ul2 = document.createElement("ul");
			ul2.className='list sortableList';
			$.each(list.items, function(i, item) {
				var li2 = document.createElement("li");
				li2.className='btn bg-light text-left ui-state-default list_item_button show';
				li2.innerHTML=item;
				ul2.appendChild(li2);

			});
			li1.appendChild(ul2);
			li1.innerHTML=li1.innerHTML+'<div  class="itemInput"><input type="text" placeholder="list name..." class="itemname" maxlength="40"><button type="button" class="btn btn-primary ml-1 addbutton" onclick="return addItem(this)">Add</button></div>';
			ul1.appendChild(li1);
		});

	});



	$('ul').droppable();

	$('#ulId ul').sortable({
		revert: 'invalid',
		connectWith: ".sort ul",
		items: "li.show "
	});



	$(".sortableList").sortable({
		revert: true,
        /*update: function (event, ui) {
            // Some code to prevent duplicates
        }*/
    });
	$(".draggable").draggable({
		connectToSortable: '.sortableList',
		cursor: 'pointer',
		helper: 'clone',
		revert: 'invalid'
	});


	$("[data-toggle=popover]").popover({
		html: true, 
		content: function() {
			return $('#popover-content').html();
		}
	});
	$("[data-toggle=popoverAddList]").popover({
		html: true, 
		content: function() {
			return $('#popover-content-addlist').html();
		}
	});


	$('.rename_div').click(function(event) {
		$(".popover").css("display", "block");

	});

	$('.rename_list').on('keydown', function(e) {

		var name = $(this).text();
		if (e.which === 13 && e.shiftKey === false) {
			$(this).css('background-color', '');
			$('.rename_list').attr('contenteditable','false');

			return false;
		}
	});

	$('h6').click(function(event) {

		$(this).css('background-color', 'white');
		$(this).attr('contenteditable', 'true');
		$(this).focus();
	});

	$("h6").blur(function(){

		$(this).css('background-color', '');
		$('.rename_list').attr('contenteditable','false');
	});

	$("[data-toggle=popover-add-item]").popover({
		html: true, 
		content: function() {
			return $('#popover-content-add-item').html();
		}
	});


	$(".form-control").blur(function(){
		listName =  $(this).val();
		$(this).val()='';

	});


	$(".edit-list").click(function(){
		deleteListName =  $(this)[0].innerHTML;

	});


	$(".btn-danger").click(function(){
		alert(deleteListName);

	});
});

function addItem(e){

	var item =  e.parentElement.children[0].value;
	var ul=   e.parentElement.parentElement.children[2];
	var li = document.createElement("li");
	li.className='btn bg-light text-left ui-state-default list_item_button show';
	li.innerHTML=item;
	ul.appendChild(li);
	$('.itemname').val('');
}

function renameboard(e){
	var boardname2 =  e.parentElement.children[0].value;
	document.getElementById('dashBoardId').textContent=boardname2;
	$(".popover").css("display", "none");
}

function addList(e){

	var boardname2 =  e.parentElement.children[0].value;
	var li = document.createElement('li');
	li.className=' card ui-state-default sort ';
	li.innerHTML=' <div type="button" class="btn text-left edit-list" data-toggle="modal" data-target="#myModal">'+boardname2+'</div><div class="modal fade" id="myModal"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Edit</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><form class="form-inline" role="form"><input type="text" class="form-control mb-2 mr-sm-2" placeholder="name.."></form></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Delete</button><button type="button" class="btn btn-primary">Submit</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div><ul class="list sortableList ui-sortable"></ul><div  class="itemInput"><input type="text" placeholder="list name..." class="itemname" maxlength="40"><button type="button" class="btn btn-primary ml-1 addbutton" onclick="return addItem(this)">Add</button></div>';
	var ul = document.getElementById('ulId');
	ul.appendChild(li);
	$('.popover').remove();

}
function changeListName(e){


	var inputs = $(".edit-list");
//if(listName != deleteListName){
	for(var i = 0; i < inputs.length; i++){
		if(listName == inputs[i].innerHTML){
			$('#myModal').modal('hide');
			return;
		}
	}
	for(var i = 0; i < inputs.length; i++){
		if(inputs[i].innerHTML === deleteListName){

			inputs[i].innerHTML = listName;

		}

	}

	$('#myModal').modal('hide');	  

}

function getParams(){
	var idx = document.URL.indexOf('?');
	/*var param ={};*/
	/*if (idx != -1) {
		var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
		for (var i=0; i<pairs.length; i++)
		{
			nameVal = pairs[i].split('=');
			params[nameVal[0]] = nameVal[1];
		}
	}
	return param;*/
	var params = {},
	pairs = document.URL.split('?')
	.pop()
	.split('&');

	for (var i = 0, p; i < pairs.length; i++) {
		p = pairs[i].split('=');
		params[ p[0] ] =  p[1];
	}     

	return params;
}


