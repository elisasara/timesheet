
$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyD_KKc6tVHrQRLjJk2JCEsNQK6N7DqpBOg",
        authDomain: "timesheet-1c89f.firebaseapp.com",
        databaseURL: "https://timesheet-1c89f.firebaseio.com",
        projectId: "timesheet-1c89f",
        storageBucket: "timesheet-1c89f.appspot.com",
        messagingSenderId: "217577071545"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submitButton").on("click", function () {
        event.preventDefault();

        var name = $("#employeeName").val().trim();
        var role = $("#employeeRole").val().trim();
        var start = $("#employeeStart").val().trim();
        console.log(start);
        var formattedDate = moment(start).format("DD/MM/YY")
        console.log(moment(start).format("DD/MM/YY"));
        var rate = $("#employeeRate").val().trim();
        var difference = moment(formattedDate).diff(moment(), "months");
        console.log(difference);
        var monthsWorked = Math.abs(difference);
        console.log(monthsWorked);

        database.ref().push({
            EmployeeName: name,
            EmployeeRole: role,
            StartDate: start,
            MonthlyRate: rate
        });

        // dataRef.ref().on("child_added", function(childSnapshot) {


        database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (Childsnapshot) {
            var name = Childsnapshot.val().EmployeeName;
  
            var role = Childsnapshot.val().EmployeeRole;

            var start = Childsnapshot.val().StartDate;

            var rate = Childsnapshot.val().MonthlyRate;


            var appendString = "<tr><td>" + name + "</td><td>" + role + "</td><td>" + start + "</td><td>" + rate + "</td></tr>";

            $("#employeeTable").append(appendString);

        });



    });

});


