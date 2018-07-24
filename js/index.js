
$(document).ready(function() {


    //localStorage.clear();
    for (var i = 0; i < localStorage.length; i++) {
    	var board = JSON.parse(localStorage.getItem(localStorage.key(i)));

    	create(board.boardName,board.boardId);
    }


});

function createBoard() {

	var boardId =0;
	var name = document.getElementById('dashboard-input-id').value;
	boardId = localStorage.length+1;

	var board = {
		boardId: boardId,
		boardName: name,
				boardList: []/*[{
					listId: 0,
					listName: "",
					items: {
						itemId: "1",
						itemName: ""
					}
				}
				]*/
			};
			localStorage.setItem(boardId, JSON.stringify(board));
			create(name,boardId);
		}

function create(name, boardId){


	var ul = document.getElementById('list');
	var li = document.createElement('li');
	li.className = 'card text-center';

	var div = document.createElement("div");
	div.className = 'card-body bg-success';
	var h6 = document.createElement("h6");
	var a = document.createElement("a");
	a.setAttribute('href', "board.html?boardName=" + name + "&boardId=" + boardId);
	a.innerHTML = name;
	h6.appendChild(a);
	div.appendChild(h6);
	li.appendChild(div);
	ul.appendChild(li);

	$('#myModal').modal('hide');
	document.getElementById('dashboard-input-id').value = '';

}