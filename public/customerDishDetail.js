let _id = '';
$( document ).ready(function() {
    console.log( "ready!" );
    if(!localStorage.getItem('token'))
    window.location.href='/';
    if(location.href.includes('?')){
        let data = location.href.split('?input=')[1];
        let finaldata = JSON.parse(window.atob(data));
        console.log(finaldata.name);
        $('#name').val(finaldata.name);
        $('#price').val(finaldata.price);
        $('#image').val(finaldata.image);
        $('#dishType').val(finaldata.dishType);
        if(finaldata.incart){
            $('#inCart').css('display','block');
            $('#addToCart').css('display','none');
        }
        

        
        _id = finaldata._id;

    

    }
});
// (function(){
    
   function myOrder(){
    window.location.href ='/order';

   }
// })();
function backToList(){
    window.location.href ='/customerHome';
}
function logout(){
    localStorage.removeItem('token');
    window.location.href="/login";
}
function addItemToCart(){
    let obj = {
        items :{
            item:_id,
            quantity:document.getElementById('quantity').value
        }
    }
    console.log('update ',obj);
    $.ajax({
        method: "POST",
        url: '/carts/create/',
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST',
            'Access-Control-Allow-Headers':'application/json',
            contentType: 'application/json',
            Authorization:localStorage.getItem('token')
          },
          data:JSON.stringify(obj),
          dataType: "json",
        success: function(response){
            //if request if made successfully then the response represent the data
            
            console.log('response',response);
            if(response.status==200 || response.status==201){
                $('#showMessage').css('display','block');
                $('#message').text(response.message); 
                setTimeout(()=>{
                    $('#showMessage').css('display','none');
                    window.location.href = '/customerHome';
                    
                    
                },3000)
                
            }
        },error:function(error){
            console.log('error',error);
            //let data = JSON.stringify(error.responseJSON.message.message));
            $('#showMessage').css('display','block');
            $('#message').text(error.responseJSON.message); 
            setTimeout(()=>{
                $('#showMessage').css('display','none');
                
            },3000)
        }
      });
    console.log('hello');
}
function createDish(){
    let obj = {
        name :document.getElementById('name').value,
        price :parseInt(document.getElementById('price').value),
        dishType :document.getElementById('dishType').value,
        image :document.getElementById('image').value,
    }
    console.log('hello ',obj);
    $.ajax({
        method: "POST",
        url: '/dishes/create',
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST',
            'Access-Control-Allow-Headers':'application/json',
            contentType: 'application/json',
            Authorization:localStorage.getItem('token')
          },
          data:JSON.stringify(obj),
          dataType: "json",
        success: function(response){
            //if request if made successfully then the response represent the data
            
            console.log('response',response);
            if(response.status==201){
                $('#showMessage').css('display','block');
                $('#message').text(response.message); 
                setTimeout(()=>{
                    $('#showMessage').css('display','none');
                    window.location.href = '/home';
                    
                    
                },3000)
                
            }
        },error:function(error){
            console.log('error',error);
            //let data = JSON.stringify(error.responseJSON.message.message));
            $('#showMessage').css('display','block');
            $('#message').text(error.responseJSON.message); 
            setTimeout(()=>{
                $('#showMessage').css('display','none');
                
            },3000)
        }
      });
    console.log('hello');
}