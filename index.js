let totalInsertions = [];
let noft = document.getElementById("not");
let notfText = document.getElementById("not-text");

//Clear all button
$("#clearAll").on("click", () => {
  $("tbody").html("");
  form_clear();
});
// Clears the input areas
function form_clear() {
  $("#title").val("");
  $("#desc").val("");
}
//Adds a new row if it's not null
$("#add").on("click", (e) => {
  e.preventDefault();
  title = $("#title").val();
  desc = $("#desc").val();
  let innerStr = "";
  if (title.trim() === "") {
    alert("Title can't be null. Please enter a title");
    return;
  }
  nofify("Task Added.", "orange");
  //Creates a json object in order to save the input
  currentInsertion = {
    curTitle: title,
    curDesc: desc,
    status: "done",
  };
  totalInsertions.push(currentInsertion);
  $("tbody").fadeOut(400, () => {
    let i = 0;
    totalInsertions.forEach((element) => {
      innerStr += `<tr id = "tr${i++}">
     <th scope="row">${i}</th>
     <td>${element.curTitle}</td>
     <td>${element.curDesc}</td>
     <td><button type="submit" class="btn btn-success btn-sm replace">${
       element.status
     }</button></td>
     <td><button type="submit" class="btn btn-danger btn-sm delete">Delete</button></td>
     </tr>`;
    });
    $("tbody").html(innerStr);
    $("tbody").fadeIn(400);
  });
});

$(document).on("click", ".replace", (e) => {
  rowId = getCurrentRow(e);
  totalInsertions[rowId].status = "✔️";
  $(e.currentTarget).html("✔️");
  nofify("Task Completed.", "green");
});

$(document).on("click", ".delete", (e) => {
  e.preventDefault();
  rowId = getCurrentRow(e);
  totalInsertions.splice(rowId, 1);
  let i = 0;
  let innerStr = "";
  // Because splice does not work on splice (1, 1) deletes the central element
  $("tbody").fadeOut(400, () => {
    totalInsertions.forEach((element) => {
      innerStr += `<tr id = "tr${i++}">
       <th scope="row">${i}</th>
       <td>${element.curTitle}</td>
       <td>${element.curDesc}</td>
       <td><button type="submit" class="btn btn-success btn-sm replace">${
         element.status
       }</button></td>
       <td><button type="submit" class="btn btn-danger btn-sm delete">Delete</button></td>
       </tr>`;
    });
    $("tbody").html(innerStr);
    $("tbody").fadeIn(400);
  });
});

function getCurrentRow(event) {
  currRow = $(event.currentTarget).parent().parent();
  rowId = $(currRow).attr("id");
  return rowId.replace(/[^0-9]/g, "");
}

function nofify(message, color) {
  noft.innerHTML = message;
  noft.style.visibility = "visible";
  noft.style.borderColor = color;
  setTimeout(() => {
    noft.style.visibility = "hidden";
  }, 3000);
}
