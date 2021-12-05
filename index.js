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
  if (localStorage.getItem('itemsJson') == null) {
    arr = [];
    arr.push([tit, des]);
    localStorage.setItem('itemsJson', JSON.stringify(arr));
  }
  else {
    str = localStorage.getItem('itemsJson');
    arr = JSON.parse(str);
    arr.push([tit, des]);
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
    <td><button type="submit" class="btn btn-primary" onclick="replace(this)" >Done</button></td>
    <td><button type="submit" class="btn btn-primary" id = "delete" onclick="remove(this , ${i})">Delete</button></td>
  </tr>`;
  });
  document.getElementById("tbody").innerHTML = str;
  form_clear();
  k = i;
});
function replace(e){
e.innerHTML = "✔️";
};
function remove(e , ind){
e.parentElement.parentElement.innerHTML = "";
str2 = localStorage.getItem('itemsJson');
arr2 = JSON.parse(str2);
arr2.splice(ind-1 , ind-1);
localStorage.setItem('itemsJson', JSON.stringify(arr2));
}