let attendeeName = "";
let currentAttInfo;
let currentTime;

window.onload = function () {
  displayTable();
};

function submitAttendee() {
  let fname = document.getElementById("firstname").value;
  let lname = document.getElementById("lastname").value;
  let comp = document.getElementById("company").value;
  let loc = document.getElementById("location").value;

  attendeeName = fname + " " + lname;
  document.getElementById("currentAttendee").innerHTML = attendeeName;

  document.getElementById("rank").innerHTML = rank;

  currentAttInfo = {
    rank: 0,
    name: attendeeName,
    company: comp,
    location: loc,
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

  let rankCell = tableRow.appendChild(document.createElement("td"));
  rankCell.textContent = info.rank;
  let nameCell = tableRow.appendChild(document.createElement("td"));
  nameCell.textContent = info.name;
  let companyCell = tableRow.appendChild(document.createElement("td"));
  companyCell.textContent = info.company;
  let locationCell = tableRow.appendChild(document.createElement("td"));
  locationCell.textContent = info.location;
  let timeCell = tableRow.appendChild(document.createElement("td"));
  timeCell.textContent = info.time;
}

function displayTable() {
  let tableRef = document
    .getElementById("leaderboard-table")
    .getElementsByTagName("tbody")[0];
  tableRef.innerHTML = "";
  let storedInfo = localStorage.getItem("ranking");
  let rank = 0;
  if (storedInfo) {
    let revisedData = [];
    let sortedLeaderboard = JSON.parse(storedInfo).sort((a, b) =>
      a.time > b.time ? 1 : b.time > a.time ? -1 : 0
    );

    let lbTable = document
      .getElementById("leaderboard-table")
      .getElementsByTagName("tbody")[0];

    console.log("before ", sortedLeaderboard);

    sortedLeaderboard.forEach(function (att) {
      let tableRow = lbTable.insertRow();
      tableRow.setAttribute("id", "rank" + att.rank);
      let rankCell = tableRow.appendChild(document.createElement("td"));
      rankCell.setAttribute("class", "rank");
      rank = rank + 1;
      att.rank = rank;
      rankCell.textContent = rank;
      let nameCell = tableRow.appendChild(document.createElement("td"));
      nameCell.textContent = att.name;
      let companyCell = tableRow.appendChild(document.createElement("td"));
      companyCell.textContent = att.company;
      let locationCell = tableRow.appendChild(document.createElement("td"));
      locationCell.textContent = att.location;
      let timeCell = tableRow.appendChild(document.createElement("td"));
      timeCell.textContent = att.time;
      let deleteCell = tableRow.appendChild(document.createElement("td"));
      deleteLink = deleteCell.appendChild(document.createElement("img"));
      deleteLink.setAttribute("src", "./bin.png");
      deleteLink.setAttribute("class", "trash");
      deleteLink.setAttribute("id", rank);
      deleteLink.addEventListener("click", deleteRecord);
      revisedData.push(att);
    });
    console.log("after ", sortedLeaderboard);
    localStorage.setItem("ranking", JSON.stringify(revisedData));
  }
}

function deleteRecord(el) {
  console.log(el);
  let currentRank = el.target.id;
  console.log(currentRank);
  let existingData = JSON.parse(localStorage.getItem("ranking"));
  let toDelete = existingData.filter(
    (att) => att.rank.toString() !== currentRank.toString()
  );
  localStorage.setItem("ranking", JSON.stringify(toDelete));
  displayTable();
  console.log(toDelete);
}

function showTimer() {
  milliseconds++;
  if (milliseconds === 100) {
    seconds++;
    milliseconds = 0;
    if (seconds === 60) {
      seconds = 0;
      minute++;

      // if (minute === 60) {
      //   minute = 0;
      //   hour++;
      // }
    }
  }

  // let hourTime = hour < 10 ? "0" + hour : hour;
  let minuteTime = minute < 10 ? "0" + minute : minute;
  let secondTime = seconds < 10 ? "0" + seconds : seconds;
  let millisecondTime =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  // currentTime = hourTime + ":" + minuteTime + ":" + secondTime;
  currentTime = minuteTime + ":" + secondTime + ":" + millisecondTime;
  document.getElementById("timer").innerHTML = currentTime;
}

// let hour = 00;
let minute = 00;
let seconds = 00;
let milliseconds = 0;
let interval;
let start = false;

document.getElementById("toggleButton").onclick = function () {
  if (!start) {
    start = true;
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(showTimer, 50);
  } else {
    start = false;
    if (attendeeName !== "") {
      currentAttInfo.time = currentTime;
      let existingAttendees = JSON.parse(
        localStorage.getItem("ranking") || "[]"
      );
      existingAttendees.push(currentAttInfo);

      localStorage.setItem("ranking", JSON.stringify(existingAttendees));

      //   storeInTable(currentAttInfo);
      displayTable();
    }
    attendeeName = "";
    currentAttInfo = {};
    currentTime = "";
    clearInterval(interval);
  }
};

const body = document.querySelector("body");
body.onkeyup = function (event) {
  console.log("event", event.code);
  if (event.code === "Enter") {
    document.getElementById("toggleButton").click();
  }
};

// document.addEventListener("keypress", function (event) {
//   console.log("hello")
//   if (event.key === "Enter") {
//     event.preventDefault();

//     document.getElementById("toggleButton").onclick = function () {
//       if (!start) {
//         start = true;
//         if (interval) {
//           clearInterval(interval);
//         }
//         interval = setInterval(showTimer, 50);
//       } else {
//         start = false;
//         if (attendeeName !== "") {
//           currentAttInfo.time = currentTime;
//           let existingAttendees = JSON.parse(
//             localStorage.getItem("ranking") || "[]"
//           );
//           existingAttendees.push(currentAttInfo);

//           localStorage.setItem("ranking", JSON.stringify(existingAttendees));

//           //   storeInTable(currentAttInfo);
//           displayTable();
//         }
//         attendeeName = "";
//         currentAttInfo = {};
//         currentTime = "";
//         clearInterval(interval);
//       }
//     };
//   }
// });

// document.getElementById("stop").onclick = function () {
//   if (attendeeName !== "") {
//     currentAttInfo.time = currentTime;
//     let existingAttendees = JSON.parse(localStorage.getItem("ranking") || "[]");
//     existingAttendees.push(currentAttInfo);

//     localStorage.setItem("ranking", JSON.stringify(existingAttendees));

//     //   storeInTable(currentAttInfo);
//     displayTable();
//   }
//   attendeeName = "";
//   currentAttInfo = {};
//   currentTime = "";
//   clearInterval(interval);
// };

document.getElementById("reset").onclick = function () {
  clearInterval(interval);
  // hour = 0;
  minute = 0;
  seconds = 0;
  milliseconds = 0;
  attendeeName = "";
  currentAttInfo = {};
  currentTime = "";
  document.getElementById("currentAttendee").innerHTML = "";
  document.getElementById("timer").innerHTML = "00:00:000";
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
