var attendeesArr = new Array();
var currentEventID;

//selects attendees of a given event
function selectAttendees(eventID) {
    sessionStorage.setItem("currentEventId", eventID);
    var dbRef = firebase.database().ref(); // Reference to realtime db
    currentUserID = eventID;
    var table = document.getElementById('eventAttendees');
    var rowIndex = 1;

    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }
    var emailRef = dbRef.child('eventAttendees').child(eventID);
    emailRef.once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var row = table.insertRow(rowIndex);

            var userkey = childSnapshot.key;
            console.log("usr nkey" + userkey);
            var timeStamp = childSnapshot.val();
            var attendeesRef = dbRef.child('users').child(userkey);
            attendeesRef.once('value').then(function(attendeesShot) {
                console.log(attendeesShot.val());
                var memberName = row.insertCell(0);
                var memberPhone = row.insertCell(1);
                var ezcashStat = row.insertCell(2).appendChild(document.createTextNode("ontime"));
                //var selectCell = row.insertCell(3);
                var timeStampCell = row.insertCell(3).appendChild(document.createTextNode(timeStamp));
                var editCell = row.insertCell(4);
                var deleteCell = row.insertCell(5);


                var fName = attendeesShot.child('firstName').val() + " ";
                var lName = attendeesShot.child('lastName').val();
                memberName.appendChild(document.createTextNode(fName + lName));
                memberPhone.appendChild(document.createTextNode(attendeesShot.child('mobile').val()));

                editCell.innerHTML = '<img src="../images/edit.png" width="25" height="25" onclick="edit_event()">';
                deleteCell.innerHTML = '<img src="../images/delete.png" width="25" height="25" onclick="delete_event()">';

                deleteCell.onclick = function() {
                    delete_attendee(userkey);
                }
            });
        });
    });
    console.log(attendeesArr);
}