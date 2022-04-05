let k = 0;
form = document.getElementsByClassName("form-control");
function form_clear (){
  form[0].value = "";
  form[1].value = "";
}
document.getElementById("clearAll").addEventListener("click" , ()=>{
  localStorage.clear();
  document.getElementById("tbody").innerHTML = "";
  form_clear();
});
butto = document.getElementById("add");
butto.addEventListener("click", () => {
  tit = form[0].value;
  des = form[1].value;
  let status = "done";
  if (form[0].value == "")
  {
    alert("Title can't be null. Please enter a title")
    return;
  }
  if (localStorage.getItem('itemsJson') == null && form[0].value !== "") {
    arr = [];
    arr.push([tit, des, status]);
    localStorage.setItem('itemsJson', JSON.stringify(arr));
  }
  else {
    str = localStorage.getItem('itemsJson');
    arr = JSON.parse(str);
    arr.push([tit, des, status]);
    localStorage.setItem('itemsJson', JSON.stringify(arr));
  }
  str = "";
  i = 0;
  arr.forEach(element  => {
    str += 
    `<tr id = "tr${++i}">
    <th scope="row">${i}</th>
    <td>${element[0]}</td>
    <td>${element[1]}</td>
    <td><button type="submit" class="btn btn-primary" onclick="replace(this)" >${element[2]}</button></td>
    <td><button type="submit" class="btn btn-primary" id = "delete" onclick="remove(this , ${i})">Delete</button></td>
  </tr>`;
  });
  document.getElementById("tbody").innerHTML = str;
  form_clear();
  k = i;
});
function replace(e){
e.innerHTML = "✔️";
let array = JSON.parse(localStorage.getItem('itemsJson'));
let index = e.parentElement.parentElement.firstChild.nextSibling.textContent;
array[index-1][2] = "✔️";
localStorage.setItem('itemsJson', JSON.stringify(array));
};
function remove(e , ind){
e.parentElement.parentElement.innerHTML = "";
str2 = localStorage.getItem('itemsJson');
arr2 = JSON.parse(str2);
arr2.splice(ind-1 , 1);
localStorage.setItem('itemsJson', JSON.stringify(arr2));
str = "";
  i = 0;
  arr2.forEach(element  => {
    str += 
    `<tr id = "tr${++i}">
    <th scope="row">${i}</th>
    <td>${element[0]}</td>
    <td>${element[1]}</td>
    <td><button type="submit" class="btn btn-primary" onclick="replace(this)" >${element[2]}</button></td>
    <td><button type="submit" class="btn btn-primary" id = "delete" onclick="remove(this , ${i})">Delete</button></td>
  </tr>`;
  });
  document.getElementById("tbody").innerHTML = str;
}
