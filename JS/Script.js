var productNameInput = document.getElementById("productNameInput") ;
var userNameAlert = document.getElementById("userNameAlert")
var productPriceInput  = document.getElementById("productPriceInput") ;
var productCategoryInput = document .getElementById("productCategoryInput") ;
var productDescInput = document.getElementById("productDescInput") ;
var mainBtn = document.getElementById("mainBtn") ;
var productContainer ;
if(localStorage.getItem("myProduct")  == null   )
{
    productContainer = [] ;
}
else
{
    productContainer =  JSON.parse( localStorage.getItem("myProduct" )  ) ;
    displayProduct() ;

}

function validProductName()
{
    var regex  = /^[A-Z][a-z]{3,8}$/;

    if(regex.test(productNameInput.value)  == true )
    {
        productNameInput.classList.add("is-valid") ;
        productNameInput.classList.remove("is-invalid") ;
        userNameAlert.classList.replace("d-block" ,  "d-none") ;

        return true

    }
    else
    {
        productNameInput.classList.add("is-invalid") ;
        productNameInput.classList.remove("is-valid") ;
        userNameAlert.classList.replace("d-none" ,  "d-block") ;


        return false

    }

}
productNameInput.addEventListener("keyup" , validProductName ) ;

function addProduct()
{

    if(validProductName() == true)
    {
        var product =
        {
            Name :  productNameInput.value ,
            Price :  productPriceInput.value ,
            Category :  productCategoryInput.value ,
            Desc :  productDescInput.value ,
    
        } 
       productContainer.push(product) ;
       localStorage.setItem("myProduct"   , JSON.stringify(  productContainer ) ) ;
        clearForm () ;
        displayProduct() ;

    }



}

function clearForm()
{
    productNameInput.value = "" ;
    productPriceInput.value = "" ;
    productCategoryInput.value  = "" ;
    productDescInput.value = "" ;

}

function displayProduct()
{
    var cartoona  = `` ;

    for( var i = 0 ; i <  productContainer.length   ; i++)
    {
        cartoona += ` <tr>
                <td>`+i+`</td>
                <td>`+productContainer[i].Name+`</td>
                <td>`+productContainer[i].Price+`</td>
                <td>`+productContainer[i].Category+`</td>
                <td>`+productContainer[i].Desc+`</td>
                <td> <button onclick="changFormUpdate(`+i+`) ;"  class="btn btn-outline-warning" >Update</button> </td>
                <td> <button    onclick=" deleteProduct(`+i+`) ;" class="btn btn-outline-danger" >Delete</button> </td>
            </tr> `

    }

    mainBtn.innerHTML = "Add Product"


    document.getElementById("myProduct").innerHTML = cartoona ;

}


function deleteProduct(productIndex)
{
    productContainer.splice(productIndex , 1) ;
    localStorage.setItem("myProduct"   , JSON.stringify(  productContainer ) ) ;
    displayProduct()
}

function searchProduct(searchTerm)
{        var cartoona = `` ;


    for(var i = 0 ; i  <    productContainer.length     ;  i++)
    {

        if(productContainer[i].Name.toLowerCase()  .includes(searchTerm.toLowerCase() ) == true 
        || productContainer[i].Category.toLowerCase() .includes(searchTerm.toLowerCase() ) == true  )
        {
                cartoona += ` <tr>
                <td>`+i+`</td>
                <td>`+productContainer[i].Name+`</td>
                <td>`+productContainer[i].Price+`</td>
                <td>`+productContainer[i].Category+`</td>
                <td>`+productContainer[i].Desc+`</td>
                <td> <button class="btn btn-outline-warning" >Update</button> </td>
                <td> <button    onclick=" deleteProduct(`+i+`) ;" class="btn btn-outline-danger" >Delete</button> </td>
                </tr> ` ;

        }
        else
        {

            console.log("M4 mawgod") ;

        }
    }
    document.getElementById("myProduct").innerHTML = cartoona ;


}

function changFormUpdate(productIndex)
{
    productNameInput.value = productContainer[productIndex].Name ;
    productPriceInput.value = productContainer[productIndex].Price ;
    productCategoryInput.value = productContainer[productIndex].Category ;
    productDescInput.value = productContainer[productIndex].Desc ;

    productContainer.splice(productIndex , 1) ;


    mainBtn.innerHTML = "Update"

}


for(var i = 0 ; i < productContainer.length  ; i++)
{

    if (mainBtn.innerHTML == addProduct )
    {
        displayProduct() ;
    }
    else
    {
        changFormUpdate() ;
    }

}