//call the element 
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catigoriy = document.getElementById('catigoriy');
let creat = document.getElementById('creat');
let btnDeleteAll = document.getElementById('deleteAll');
let ddeleteAll = document.getElementById('ddeleteAll');
let search = document.getElementById('search');



let mode = 'creat' ;
let searshMode = 'title';
let tmp;

// creat function for total
function gettotal(){
    if (price.value != ''){
    let resolte = (+price.value + +taxes.value + +ads.value)
    - +discount.value ;
    total.innerHTML = resolte;
    total.style.backgroundColor = 'green';
} else {
    total.innerHTML = '';
    total.style.backgroundColor = 'red' ;
}
};
//create prodoct
//create array
let dataPro;
// if found data in local storage
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
} else dataPro = [] ;
creat.onclick = function (){
let newPro = {
    title:title.value.toLowerCase() ,
    price:price.value ,
    taxes:taxes.value ,
    ads:ads.value ,
    discount:discount.value ,
    total:total.innerHTML ,
    count:count.value  , 
    catigoriy:catigoriy.value.toLowerCase()
}
dataPro.push(newPro);

if(mode==='creat'){
    if(newPro.count) {
        for(let i = 0 ; i < newPro.count ; i++){
            dataPro.push(newPro);
        }
    } else{ dataPro.push(newPro);
    
    }
}else {
    dataPro[tmp] = newPro;
    mode = 'creat';
    creat.innerHTML = 'creat';
    count.style.display = 'block'
}
//save local storage
localStorage.setItem('product' , JSON.stringify(dataPro));

showData() 
clearinput();
};
function clearinput(){
    title.value ='' ,
    price.value = '' ,
    taxes.value = '' ,
    ads.value = '' ,
    discount.value = '' ,
    total.innerHTML = '' ,
    count.value = '' ,
    catigoriy.value = ''    
};
function showData(){
    gettotal();
    let table = '';
    for (let i = 0 ; i < dataPro.length ; i++ ){
    table += `
    <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catigoriy}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`
    
    }
    document.getElementById("tbody").innerHTML = table ;
    if (dataPro.length > 0 ){
        ddeleteAll.innerHTML = 
        `<button onclick = "fdeleteAll()" id="deleteAll"> delete all (${dataPro.length})</button>`;
        
    }else{ddeleteAll.innerHTML = ''}
    localStorage.product=JSON.stringify(dataPro);
}
showData() ;
function deleteData(i)
{
    dataPro.splice(i,1);
localStorage.product=JSON.stringify(dataPro);
showData();

};

function fdeleteAll (){
    dataPro.splice(0)
    localStorage.product=JSON.stringify(dataPro);
    showData();
}
function update(i){
    title.value =dataPro[i].title ,
    price.value = dataPro[i].price  ,
    taxes.value = dataPro[i].taxes  ,
    ads.value = dataPro[i].ads  ,
    discount.value = dataPro[i].discount  ,
    gettotal();
    count.style.display = 'none'
    creat.innerText = 'save'
    mode = 'save'
    tmp = i;

    catigoriy.value = dataPro[i].catigoriy
    scroll({
        top:0,
        behavior: 'smooth'
    })

}

function getSearchMode (id){
    if(id == 'sBytitle'){
        searshMode = 'title';
        
    } else if (id == 'sBycatigoriy') {
        searshMode = 'catigoriy'
        
    } 
    search.placeholder = 'search By '+searshMode
    search.focus() ;
    search.value='';
    showData();
    
};
function searchData(value){
let table = '';
for(let i = 0 ; i<dataPro.length ; i++)
    if(searshMode === 'title'){
    
        if(dataPro[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].catigoriy}</td>
                <td><button onclick="update(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`
        document.getElementById("tbody").innerHTML=table ;
        }else{};
    }   else {
    // for(let i = 0 ; i<dataPro.length ; i++)
    if(dataPro[i].catigoriy.includes(value.toLowerCase())){
        table += `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].catigoriy}</td>
            <td><button onclick="update(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
        document.getElementById("tbody").innerHTML=table ;
    }else{};
    
}
};
