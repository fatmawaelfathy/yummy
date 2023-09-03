let rowData = document.getElementById("rowData");
let submitBtn;
let searchContainer = document.getElementById("searchContainer");
let lds = document.querySelector(".lds-roller")

// ''''''''''''''''''''''''''''''body''''''''''''''''''''''''''''''''''''
$(document).ready(() => {
    searchByName("").then(() => {
        $(".lds-roller").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})



//< ================================= Start nav =============================================>
function openNav() {
    $(".side-nav-menu").animate({
        left:0
    },500)
$(".open-close-icon").removeClass("fa-align-justify")
$(".open-close-icon").addClass("fa-x")

for (let i = 0; i < 5; i++) {
    $(".links li").eq(i).animate({
        top:0
    },(i+5)*100)
    
}

    
}

function closeNav() {
    let Width= $(".side-nav-menu  .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left:-Width
    },500)

    $(".open-close-icon").addClass("fa-align-justify")
$(".open-close-icon").removeClass("fa-x")


$(".links li").animate({
    top:300
},500)


    
}
closeNav()
$(".side-nav-menu i.open-close-icon").click(()=>{
    if ($(".side-nav-menu").css("left")=="0px") {
        closeNav()
        
    }else{
        openNav()
    }
})


// //======================================= catogryyy=======================================>>>.




function displayMeals(arr) {
    let array = "";

    for (let i = 0; i < arr.length; i++) {
        array += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = array
}


async function  getCategories() {
    rowData.innerHTML = ""
    lds.classList.remove("d-none")
    
   
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let result = await respons.json( )
    lds.classList.add("d-none")

    disblayCategories(result.categories.slice(0,20))
   
   
}


function disblayCategories(arr) {
    let array = ""
    for (let i = 0; i < arr.length; i++) {
        array +=`<div class="col-md-3">
        <div  onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" >
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
</div>
`      
    }
    rowData.innerHTML= array

    
}

// //////////////////////////////////////////========Area===================

  async function getArea() {
   
   
      let respons= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
      let result = await respons .json()
      lds.classList.add("d-none")
      disblayArea(result.meals) 
     
    
}

function disblayArea(arr) {
    let array =''
    for (let i = 0; i < arr.length; i++) {
        array +=`<div class="col-md-3">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class=" rounded-2 cursor-pointer text-center">
        <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
            </div>
       
</div>`
        
    }
    rowData.innerHTML = array
    
}


// ======================================Ingredients====================================

     async function getIngredients() {
        lds.classList.remove("d-none")
    rowData.innerHTML=""
   
    let respons = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let result = await respons.json()
    lds.classList.add("d-none")
    disblayIngredients(result.meals.slice(0,20))
    
   
}
function disblayIngredients(arr) {
    let array = ""
    for (let i = 0; i < arr.length; i++) {
        array +=`<div class="col-md-3">
        <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class=" text-center rounded-2 cursor-pointer">

        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
</div>
`      
    }
    rowData.innerHTML= array  
}


//...................................start Meals.............................................

async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    lds.classList.remove("d-none")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    let result = await response.json()

    lds.classList.add("d-none")
    displayMeals(result.meals.slice(0, 20))
   

}
async function getAreaMeals(area) {
    rowData.innerHTML = ""
  
    lds.classList.remove("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let result = await response.json()

    lds.classList.add("d-none")
    displayMeals(result.meals.slice(0, 20))
    
}
async function getIngredientsMeals(Ingredien) {
    rowData.innerHTML = ""
    lds.classList.remove("d-none")

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredien}`)
   let result = await response.json()
   lds.classList.add("d-none")

    displayMeals(result.meals.slice(0, 20))
   

}


// ......................................end Meals...................................



async function getMealDetails(mealID) {
    closeNav()
    rowData.innerHTML = ""
    lds.classList.remove("d-none")
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    let result = await respone.json();
    lds.classList.add("d-none")
    displayMealDetails(result.meals[0])
   

}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let baket = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = baket
}




function contacts(){
    lds.classList.remove("d-none")
    rowData.innerHTML =`<div class="container">
    <div class="row py-5 g-4 " id="rowData"><div class="contact min-vh-100 d-flex justify-content-center align-items-center">
<div class="container w-75 text-center">
<div class="row g-4">
    <div class="col-md-6">
        <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
            Special characters and numbers not allowed
        </div>
    </div>
    <div class="col-md-6">
        <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
            Email not valid *exemple@yyy.zzz
        </div>
    </div>
    <div class="col-md-6">
        <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid Phone Number
        </div>
    </div>
    <div class="col-md-6">
        <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid age
        </div>
    </div>
    <div class="col-md-6">
        <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid password *Minimum eight characters, at least one letter and one number:*
        </div>
    </div>
    <div class="col-md-6">
        <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid repassword 
        </div>
    </div>
</div>
<button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>
</div> </div>
</div>

`
lds.classList.add("d-none")
submitBtn =document.getElementById("submitBtn")

document.getElementById("nameInput").addEventListener("focus",()=>{

    nameInputContact=true
})
document.getElementById("phoneInput").addEventListener("focus",()=>{

    phoneInputContact=true
})

document.getElementById("emailInput").addEventListener("focus",()=>{
    emailInputContact = true
})
document.getElementById("ageInput").addEventListener("focus",()=>{
    ageInputContact = true
})

document.getElementById("passwordInput").addEventListener("focus",()=>{
    passwordInputContact = true
})
document.getElementById("repasswordInput").addEventListener("focus",()=>{
    repasswordInputContact = true
})

}
let nameInputContact = false;
let phoneInputContact=false;
let ageInputContact = false;
let passwordInputContact=false;
let repasswordInputContact= false;
let emailInputContact = false;


function inputsValidation (){
    if (nameInputContact) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")  
        }else{
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")
        }
        
    }
    if ( emailInputContact) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")  
        }else{
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")
        }
        
    }
    if (ageInputContact)  {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")  
        }else{
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
        
    }
    if ( passwordInputContact) {
        if (passwordValidation()) {
            document.getElementById(" passwordAlert").classList.replace("d-block", "d-none")  
        }else{
            document.getElementById(" passwordAlert").classList.replace("d-none", "d-block")
        }
    if ( phoneInputContact) {
        if (phoneValidation()) {
            document.getElementById(" phoneAlert").classList.replace("d-block", "d-none")  
        }else{
            document.getElementById(" phoneAlert").classList.replace("d-none", "d-block")
        }
        
    }
    if ( repasswordInputContact) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")  
        }else{
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")
        }
        
    }
}

    if (nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
} else {
    submitBtn.setAttribute("disabled", true)
}
    
}
function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}
// ....................................................................................................

function showSearchInputs() {
   
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(term) {
    closeNav()
    lds.classList.remove("d-none")
    rowData.innerHTML = ""
   

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()
    lds.classList.add("d-none")
    response.meals ? displayMeals(response.meals) : displayMeals([])
    

}

async function searchByFLetter(term) {
    closeNav()
    lds.classList.remove("d-none")
    rowData.innerHTML = ""
    term == "" ? term = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()
    lds.classList.add("d-none")
    response.meals ? displayMeals(response.meals) : displayMeals([])
    

}



















