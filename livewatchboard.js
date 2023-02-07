let attendeeName = "";
let currentAttInfo;
let currentTime;

window.onload = function () {
  displayTable();
};

function submitAttendee() {
  let fname = document.getElementById("firstname").value;
  let lname = document.getElementById("lastname").value;

  attendeeName = fname + " " + lname;
  document.getElementById("currentAttendee").innerHTML = attendeeName;

  currentAttInfo = {
    firstname: fname,
    lastname: lname,
    time: "",
  };

  document.getElementById("attendeeInfo").reset();
  return false;

  //   existingAttendees.push(currentAttInfo);

  //   localStorage.setItem("ranking", JSON.stringify(existingAttendees));

  //   storeInTable(currentAttInfo);
}

function storeInTable(info) {
  let lbTable = document
    .getElementById("leaderboard-table")
    .getElementsByTagName("tbody")[0];

  let tableRow = lbTable.insertRow();
  let fnameCell = tableRow.appendChild(document.createElement("td"));
  fnameCell.textContent = info.firstname;
  let lnameCell = tableRow.appendChild(document.createElement("td"));
  lnameCell.textContent = info.lastname;
  let timeCell = tableRow.appendChild(document.createElement("td"));
  timeCell.textContent = info.time;
}

function displayTable() {
  let tableRef = document
    .getElementById("leaderboard-table")
    .getElementsByTagName("tbody")[0];
  tableRef.innerHTML = "";
  let storedInfo = localStorage.getItem("ranking");

  if (storedInfo) {
    let sortedLeaderboard = JSON.parse(storedInfo).sort((a, b) =>
      a.time > b.time ? 1 : b.time > a.time ? -1 : 0
    );

    let lbTable = document
      .getElementById("leaderboard-table")
      .getElementsByTagName("tbody")[0];

    sortedLeaderboard.forEach(function (att) {
      let tableRow = lbTable.insertRow();
      let fnameCell = tableRow.appendChild(document.createElement("td"));
      fnameCell.textContent = att.firstname;
      let lnameCell = tableRow.appendChild(document.createElement("td"));
      lnameCell.textContent = att.lastname;
      let timeCell = tableRow.appendChild(document.createElement("td"));
      timeCell.textContent = att.time;
    });
  }
}

function showTimer() {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minute++;

    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  let hourTime = hour < 10 ? "0" + hour : hour;
  let minuteTime = minute < 10 ? "0" + minute : minute;
  let secondTime = seconds < 10 ? "0" + seconds : seconds;
  //   let millisecondTime =
  //     milliseconds < 10
  //       ? "0" + milliseconds
  //       : milliseconds ;

  currentTime = hourTime + ":" + minuteTime + ":" + secondTime;
  document.getElementById("timer").innerHTML = currentTime;
}

let hour = 00;
let minute = 00;
let seconds = 00;
// let milliseconds = 0;
let interval;

document.getElementById("start").onclick = function () {
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(showTimer, 50);
};

document.getElementById("stop").onclick = function () {
  if (attendeeName !== "") {
    currentAttInfo.time = currentTime;
    let existingAttendees = JSON.parse(localStorage.getItem("ranking") || "[]");
    existingAttendees.push(currentAttInfo);

    localStorage.setItem("ranking", JSON.stringify(existingAttendees));

    //   storeInTable(currentAttInfo);
    displayTable();
  }
  attendeeName = "";
  currentAttInfo = {};
  currentTime = "";
  clearInterval(interval);
};

document.getElementById("reset").onclick = function () {
  clearInterval(interval);
  hour = 0;
  minute = 0;
  seconds = 0;
  //   milliseconds = 0;
  attendeeName = "";
  currentAttInfo = {};
  currentTime = "";
  document.getElementById("currentAttendee").innerHTML = "";
  document.getElementById("timer").innerHTML = "00:00:00";
};

function saveTable() {
  let csv_data = [];

  let rows = document
    .getElementById("leaderboard-table")
    .getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let col = rows[i].querySelectorAll("th, td");

    let csv_row = [];
    for (let j = 0; j < col.length; j++) {
      csv_row.push(col[j].innerHTML);
    }

    csv_data.push(csv_row.join(","));
  }

  csv_data = csv_data.join("\n");

  downloadFile(csv_data);
}

function downloadFile(data) {
  //   let csv_file = new Blob([data], { type: "text/csv" });

  const downloadLink = document.createElement("a");
  downloadLink.setAttribute(
    "href",
    `data:text/csv;charset=utf-8, ${encodeURIComponent(data)}`
  );
  downloadLink.setAttribute("download", "leaderboard.csv");

  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.click();

  document.body.removeChild(downloadLink);
}
