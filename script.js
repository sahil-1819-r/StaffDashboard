let queue = [];
let tokenNumber = 1;
let current = null;
let holdList = [];

function addPerson() {
  let name = document.getElementById("nameInput").value;

  if (name === "") {
    alert("Please enter name");
    return;
  }

  let token = "T-0" + tokenNumber;

  queue.push({
     token: token,
     name: name,
     status: "PENDING"
  });

  tokenNumber++;

  document.getElementById("nameInput").value = "";
  updateQueue();
  updateAnalyticsCounts ();
}
function updateAnalyticsCounts() {
  let total = 0;
  let served = 0;
  let pending = 0;

  for (let i = 0; i < queue.length; i++) {

    if (!queue[i].token || !queue[i].name) continue;

    total++;

    if (queue[i].status === "SUCCESSFUL") served++;
    if (queue[i].status === "PENDING") pending++;
  }

  document.getElementById("totalCount").innerText = total;
  document.getElementById("servedCount").innerText = served;
  document.getElementById("pendingCount").innerText = pending;
}
function callNext() {
  for (let i = 0; i < queue.length; i++) {

    if (!queue[i].token || !queue[i].name) continue;

    if (queue[i].status === "PENDING") {

      queue[i].status = "SUCCESSFUL";
      current = queue[i];

      document.getElementById("currentToken").innerText =
        current.token + " - " + current.name;

      updateQueue();
      updateAnalyticsCounts();
      return;
    }
  }

  alert("No pending tokens left");
}
function holdToken() {
  if (current === null) {
    alert("No active token to hold");
    return;
  }

  current.status = "HELD";
  holdList.push(current);
  current = null;

  document.getElementById("currentToken").innerText = "--";

  updateQueue();
  updateHoldList();
  updateAnalyticsCounts();
}
function updateHoldList() {
  let list = document.getElementById("holdList");
  list.innerHTML = "";

    for (let i = 0; i < holdList.length; i++) {
      let li = document.createElement("li");
      li.innerText = holdList[i].token + " - " + holdList[i].name;
      list.appendChild(li);
    }
}
function callFromHold() {

  if (holdList.length === 0) {
    alert("No one in hold list");
    return;
  }

  let person = holdList.shift();

  current = person;
  current.status = "SUCCESSFUL";

  document.getElementById("currentToken").innerText =
    current.token + " - " + current.name;

  updateHoldList();
  updateQueue();
  updateAnalyticsCounts();
}

function updateQueue() {
  let tbody = document.getElementById("queueTableBody");
  tbody.innerHTML = "";

  for (let i = 0; i < queue.length; i++) {

    if (!queue[i].token || !queue[i].name) continue;

    let row = document.createElement("tr");

    let tokenCell = document.createElement("td");
    tokenCell.innerText = queue[i].token;

    let nameCell = document.createElement("td");
    nameCell.innerText = queue[i].name;

    let statusCell = document.createElement("td");
    statusCell.innerText = queue[i].status;

    row.appendChild(tokenCell);
    row.appendChild(nameCell);
    row.appendChild(statusCell);

    tbody.appendChild(row);
  }
}
