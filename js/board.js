//localStorage.clear();

var listName = '';
var deleteListName = '';
var params = getParams();
var board;
$(document).ready(function() {

	board = JSON.parse(localStorage.getItem(params.boardId));
	document.getElementById('dashBoardId').innerHTML = board.boardName;
	var ul1 = document.getElementById('ulId');
	$.each(board.boardList, function(i, list) {
		var li1 = document.createElement("li");
		li1.className = 'card sort';
		li1.innerHTML = '<div type="button" class="btn text-left edit-list" data-toggle="modal" data-target="#myModal">' + list.listName + '</div><div class="modal fade" id="myModal"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Edit</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><form class="form-inline" role="form"><input type="text" class="form-control mb-2 mr-sm-2" placeholder="name.." ></form></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deleteListName()">Delete</button><button type="button" class="btn btn-primary" onclick="changeListName(this)">Submit</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';
		var ul2 = document.createElement("ul");
		ul2.className = 'list sortableList';

		var li3 = document.createElement("li");
		li3.className='list-group-item';
		var i=0;
		var itemLength = list.items.length;
		if(itemLength === 0){
			var li2 = document.createElement("li");
			ul2.appendChild(li3);
		}

		$.each(list.items, function(i, item) {
			var li2 = document.createElement("li");

			li2.className = 'btn bg-light text-left list_item_button show';
			li2.innerHTML = item.itemName;
			li2.id =item.itemId;
			if(i==0){
				ul2.appendChild(li3);
				i=1;
			}

			ul2.appendChild(li2);

		});
		/* ul2.appendChild(li3);*/
		li1.appendChild(ul2);
		li1.innerHTML = li1.innerHTML + '<div  class="itemInput"><input type="text" placeholder="list name..." class="itemname" maxlength="40"><button type="button" class="btn btn-primary ml-1 addbutton" onclick="return addItem(this)">Add</button></div>';
		ul1.appendChild(li1);
	});

    //li droppable
    $('#ulId ul').sortable({
    	revert: 'invalid',
    	connectWith: ".sort ul",
    	items: "li.show "
    });


    //drag&drop ul
    $(".sortableList").sortable({
    	revert: true,
    	update: function( event, ui ) {

    		var list = [];  
    		for(var i=0;i<$(".edit-list").length;i++){
    			var listNm = $(".edit-list")[i].innerHTML;

    			for(j=0;j<board.boardList.length;j++){
    				if(listNm === board.boardList[j].listName){
    					list.push(board.boardList[j]);
    				}
    			}
    		}

    		for(var i=0;i<list.length;i++) {
    			board.boardList[i] = list[i];
    		}

    		localStorage.removeItem(board.boardId);
    		localStorage.setItem(board.boardId,JSON.stringify(board));


    		
    		for(var i = 0 ; i < $(".sort").length ; i++){
    			var itemArray = [];
    			var items = board.boardList[i].items;
    			var li = $(".sort")[i].children[2].children;

    			for(var j=0;j < li.length ; j++){
    				var name = li[j].innerHTML;
    				if(name!=''){
    					var id = li[j].id;
    					var item ={
    						itemId:id,
    						itemName:name
    					};

    					itemArray.push(item);
    				}

    			}
    			board.boardList[i].items = [];
    			for(var k=0;k< itemArray.length;k++){   
    				board.boardList[i].items[k]=itemArray[k];  
    			}  

    		}           

    		localStorage.removeItem(board.boardId);
    		localStorage.setItem(board.boardId,JSON.stringify(board));

    	}
    });


    $( ".sortableList" ).droppable({
    	drop: function( event, ui ) {
    	}

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
    		$('.rename_list').attr('contenteditable', 'false');

    		return false;
    	}
    });

    $('h6').click(function(event) {

    	$(this).css('background-color', 'white');
    	$(this).attr('contenteditable', 'true');
    	$(this).focus();
    });

    $("h6").blur(function() {

    	$(this).css('background-color', '');
    	$('.rename_list').attr('contenteditable', 'false');
    });

    $("[data-toggle=popover-add-item]").popover({
    	html: true,
    	content: function() {
    		return $('#popover-content-add-item').html();
    	}
    });


    $(".form-control").blur(function() {
    	listName = $(this).val();
    	$(this).val() = '';

    });


    $(".edit-list").click(function() {
    	deleteListName = $(this)[0].innerHTML;

    });


    $(".btn-danger").click(function() {
    	for(var i=0;i<$('.sort').length;i++){

    		if($('.sort')[i].children[0].innerHTML === deleteListName){
    			$('.sort')[i].className = 'd-none';
    		}
    	}
    	var listArray = [];
    	for(var j =0;j<board.boardList.length;j++){
    		if(board.boardList[j].listName != deleteListName){
    			listArray.push(board.boardList[j]);
    		}
    	}
    	board.boardList=listArray;

    	localStorage.removeItem(board.boardId);
    	localStorage.setItem(board.boardId,JSON.stringify(board));

    });
});

function addItem(e) {
	var itemIdTemp = 0;
	var listName = e.parentElement.parentElement.children[0].innerHTML;
	var item = e.parentElement.children[0].value;
	$('.itemname').val('');

	for( var i=0;i<board.boardList.length;i++){

		if(board.boardList[i].listName===listName){
			var itemId = board.boardList[i].items.length+1;
			itemIdTemp = itemId;
			var addItem ={
				itemId:itemId,
				itemName:item
			};
			board.boardList[i].items.push(addItem);
		}
	}
	localStorage.setItem(board.boardId,JSON.stringify(board));

	var ul = e.parentElement.parentElement.children[2];
	var li = document.createElement("li");
	li.className = 'btn bg-light text-left list_item_button show';
	li.innerHTML = item;
	li.id=itemIdTemp;
	ul.appendChild(li);
}

function renameboard(e) {
	var boardname2 = e.parentElement.children[0].value;
	document.getElementById('dashBoardId').textContent = boardname2;
	board.boardName = boardname2;
	localStorage.removeItem(board.boardId);
	localStorage.setItem(board.boardId,JSON.stringify(board));
   // gBoardName = boardname2;

   $(".popover").css("display", "none");
}

function addList(e) {

	var listName = e.parentElement.children[0].value;
	var li = document.createElement('li');
	li.className = ' card sort ';
	li.innerHTML = ' <div type="button" class="btn text-left edit-list" data-toggle="modal" data-target="#myModal">' + listName + '</div><div class="modal fade" id="myModal"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Edit</h4><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body"><form class="form-inline" role="form"><input type="text" class="form-control mb-2 mr-sm-2" placeholder="name.."></form></div><div class="modal-footer"><button type="button" class="btn btn-danger" data-dismiss="modal">Delete</button><button type="button" class="btn btn-primary">Submit</button><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div><ul class="list sortableList ui-sortable"><li class="list-group-item"></li></ul><div  class="itemInput"><input type="text" placeholder="list name..." class="itemname" maxlength="40"><button type="button" class="btn btn-primary ml-1 addbutton" onclick="return addItem(this)">Add</button></div>';
	var ul = document.getElementById('ulId');
	ul.appendChild(li);

	$('#ulId ul').sortable({
		revert: 'invalid',
		connectWith: ".sort ul",
		items: "li.show "
	});
	$(".sortableList").sortable({
		revert: true,
     //  connectWith: ".sort ul",
 });
	$('.popover').remove();


	var listId = board.boardList.length+1;
	var list = {
		listId: listId,
		listName: listName,
                    items: [/*{
                        itemId: "1",
                        itemName: ""
                    }*/]

                }

                board.boardList.push(list);
                localStorage.setItem(board.boardId,JSON.stringify(board));
                location.reload();
            }

            function changeListName(e) {


            	var inputs = $(".edit-list");
    //if(listName != deleteListName){
    	for (var i = 0; i < inputs.length; i++) {
    		if (listName == inputs[i].innerHTML) {
    			$('#myModal').modal('hide');
    			return;
    		}
    	}
    	for (var i = 0; i < inputs.length; i++) {
    		if (inputs[i].innerHTML === deleteListName) {

    			inputs[i].innerHTML = listName;

    			for(var j=0;j<board.boardList.length;j++){
    				if(board.boardList[j].listName === deleteListName){
    					board.boardList[j].listName = listName;
    				}
    			}

    		}

    	}
    	$('#myModal').modal('hide');

    	localStorage.removeItem(board.boardId);
    	localStorage.setItem(board.boardId,JSON.stringify(board));

    }

    function getParams() {
    	var params = {},
    	pairs = document.URL.split('?')
    	.pop()
    	.split('&');

    	for (var i = 0, p; i < pairs.length; i++) {
    		p = pairs[i].split('=');
    		params[p[0]] = p[1];
    	}
    //localStorage.setItem(params);
    return params;
}