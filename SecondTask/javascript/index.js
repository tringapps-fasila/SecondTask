let dataarray = [{
   "id": 1,
   "email": "fasila@gmail.com",
   "FirstName": "fasila",
   "LastName": "firthous",
   "Phone": 1234567845,
   "dob": "2003-11-03",
   "Gender":"female"
},
{
   "id": 2,
   "email": "ahamed@gmail.com",
   "FirstName": "ahamed",
   "LastName": "ibrahim",
   "Phone": 1234578902,
   "dob": "2012-12-22",
   "Gender": "male"
}];
function initial() {

if(!(localStorage.userdata))
{
  localStorage.userdata = JSON.stringify(dataarray);
}
if (localStorage.userdata) {
   dataarray = JSON.parse(localStorage.userdata);
   for (let i in dataarray) {
     preparetable(dataarray[i].id, dataarray[i].email, dataarray[i].FirstName, dataarray[i].LastName, dataarray[i].Phone, dataarray[i].dob, dataarray[i].Gender);
   }
}

}
let selectedRow=null; 
let locate=-1;
function  onsubmitreg(){
  if(selectedRow==null && locate==-1)
  {
     reads();
  }
  else{
     update(locate);
  }
}
function reads() {
if((document.getElementById("terms").checked))
{
let email = document.getElementById("mail").value;
let FirstName = document.getElementById("FirstName").value;
let LastName = document.getElementById("LastName").value;
let Phone = document.getElementById("phone").value;
let dob = document.getElementById("dob").value;
let Gender;
if (document.getElementById('female').checked) {
   Gender = document.getElementById('female').value;
} else if(document.getElementById('male').checked) {
   Gender = document.getElementById('male').value;
}

let id = dataarray.length + 1;
let data = { id: id, email: email, FirstName: FirstName, LastName: LastName, Phone: Phone, dob: dob, Gender: Gender };
dataarray.push(data);

localStorage.userdata = JSON.stringify(dataarray);

preparetable(id, email, FirstName, LastName, Phone, dob, Gender);


document.getElementById("mail").value = "";
document.getElementById("FirstName").value = "";
document.getElementById("LastName").value = "";
document.getElementById("phone").value = "";
document.getElementById("dob").value = "";
document.getElementById("female").checked=false;
document.getElementById("male").checked=false;
}
}
function preparetable(sno, email, FirstName, LastName, Phone, dob, Gender) {

let table = document.getElementById("regtable");
let row = table.insertRow();
let idcell = row.insertCell(0);
let emailcell = row.insertCell(1);
let FirstNamecell = row.insertCell(2);
let LastNamecell = row.insertCell(3);
let phonecell = row.insertCell(4);
let dobcell = row.insertCell(5);
let gencell = row.insertCell(6);
let actioncell=row.insertCell(7);
let num=sno-1;
console.log(num);

 
emailcell.innerHTML = email;
FirstNamecell.innerHTML = FirstName;
LastNamecell.innerHTML = LastName;
phonecell.innerHTML = Phone;
dobcell.innerHTML = dob;
gencell.innerHTML = Gender;
idcell.innerHTML = sno;
actioncell.innerHTML="<button id=edit onclick=edits(this,"+num+")>edit</button><button id=delete onclick=deletes(this,"+num+")>delete</button>";
}
function deletes(td,id){
   dataarray.splice(id,1);
   console.log(dataarray);
   console.log(id);
   localStorage.userdata = JSON.stringify(dataarray);
   if(confirm('Are you sure to delete this record?')){
       newrow=td.parentElement.parentElement;
       document.getElementById("regtable").deleteRow(newrow.rowIndex);
       
}
}

function edits(td,index){
locate=index;
 console.log(locate);
 console.log("hello");
 selectedRow=td.parentElement.parentElement;
 document.getElementById("mail").value=selectedRow.cells[1].innerHTML;
 document.getElementById("FirstName").value=selectedRow.cells[2].innerHTML;
 document.getElementById("LastName").value = selectedRow.cells[3].innerHTML;
 document.getElementById("phone").value = selectedRow.cells[4].innerHTML;
 document.getElementById("dob").value = selectedRow.cells[5].innerHTML;
 if(selectedRow.cells[6].innerHTML==document.getElementById('female').value)
 {
   document.getElementById('female').checked=true;
}
else{
   document.getElementById('male').checked=true;
}
console.log(selectedRow.cells[5].innerHTML);
}
function update(index){
   dataarray = JSON.parse(localStorage.userdata);
   let mail=document.getElementById("mail").value;
   let firstname=document.getElementById("FirstName").value;
   let lastname=document.getElementById("LastName").value;
   let phone= document.getElementById("phone").value;
   let dob=document.getElementById("dob").value;
   let gender;
   if (document.getElementById('female').checked) {
      gender = document.getElementById('female').value;
   } else if(document.getElementById('male').checked) {
      gender = document.getElementById('male').value;
   }
   
  selectedRow.cells[1].innerHTML=mail;
  selectedRow.cells[2].innerHTML=firstname;
  selectedRow.cells[3].innerHTML=lastname; 
  selectedRow.cells[4].innerHTML=phone;
  selectedRow.cells[5].innerHTML=dob;
  selectedRow.cells[6].innerHTML=gender;   
  selectedRow=null;
  console.log(dataarray);
  console.log(index);
  dataarray[index].email=document.getElementById("mail").value;
  dataarray[index].FirstName=firstname;
  dataarray[index].LastName=lastname;
  dataarray[index].Phone=phone;
  dataarray[index].dob=dob;
  dataarray[index].Gender=gender;

   
  localStorage.userdata = JSON.stringify(dataarray);


}

