
function populate_schedule(table) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'schedule.csv');
	xhr.onload = function () {
		if (xhr.status === 200) {
			var schedule = document.getElementById("schedule");
			var tbody = schedule.getElementsByTagName('tbody');

			var row = table.insertRow();
			var cell = newRow.insertCell();
			var cellText = document.createTextNode('New row');
			cell.appendChild(cellText);
		}
		else {
			alert('Request failed.  Returned status of ' + xhr.status);
		}
	};
	xhr.send();
}
