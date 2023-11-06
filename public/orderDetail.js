(function(){
    if(!localStorage.getItem('token'))
    window.location.href='/login';
    onLoad();
   
})();
let items ='';
function logout(){
    localStorage.removeItem('token');
    window.location.href="/login";
}
// let orderId = '';

function backToList(){
    window.location.href ='/order';
}
function getBills(){
    let id = location.href.split('?input=')[1];
    $.ajax({
        method: "PUT",
        url: '/orders/getBill/'+id,
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'PUT',
            'Access-Control-Allow-Headers':'application/json',
            contentType: 'application/json',
            Authorization:localStorage.getItem('token')
          },
          dataType: "json",
        success: function(response){
            //if request if made successfully then the response represent the data
            
            console.log('response',response);
            if(response.status==200){
                $('#showMessage').css('display','block');
                $('#message').text(response.message);
                
                

                // localStorage.setItem('token',response.token); 
                setTimeout(()=>{
                    $('#showMessage').css('display','none');
                    $('#tableData').html('');
                    $('#totalAmount').val(0);
                    onLoad();
                    // window.location.href = '/home';
                },2000)
                
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
    // console.log('order Id',orderId);
}
function deleteItemFromCart(id){
    console.log('button clicked delete');
    console.log('delete data',id);
    $.ajax({
        method: "DELETE",
        url: '/carts/deleteById/'+id,
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'DELETE',
            'Access-Control-Allow-Headers':'application/json',
            contentType: 'application/json',
            Authorization:localStorage.getItem('token')
          },
          dataType: "json",
        success: function(response){
            //if request if made successfully then the response represent the data
            
            console.log('response',response);
            if(response.status==200){
                $('#showMessage').css('display','block');
                $('#message').text(response.message);
                
                

                // localStorage.setItem('token',response.token); 
                setTimeout(()=>{
                    $('#showMessage').css('display','none');
                    $('#tableData').html('');
                    $('#totalAmount').val(0);
                    onLoad();
                    // window.location.href = '/home';
                },2000)
                
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
}
function OrderIt(){
console.log(items);
let newArray = [];
for(let it of items){
    newArray.push({
        "item": it.item._id,
        "quantity":it.quantity
    })
}
let finalObj = {
    "items": newArray
}
$.ajax({
    method: "POST",
    url: '/orders/create',
    contentType: 'application/json',
    headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST',
        'Access-Control-Allow-Headers':'application/json',
        contentType: 'application/json',
        Authorization:localStorage.getItem('token')
      },
      dataType: "json",
      data: JSON.stringify(finalObj),

    success: function(response){
        //if request if made successfully then the response represent the data
        
        console.log('response',response);
        if(response.status==201){
            window.location.href = '/orderDetail';
            
            
        }else{
            let str = '';
                // for(let it of response.data.items){
                    str += `<tr>No item Added to cart</tr>`;
                $('#tableData').append(str);
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
}
function onLoad(){
    let id = location.href.split('?input=')[1];
    $.ajax({
        method: "GET",
        url: '/orders/getByOrderId/'+id,
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST',
            'Access-Control-Allow-Headers':'application/json',
            contentType: 'application/json',
            Authorization:localStorage.getItem('token')
          },
          dataType: "json",
        success: function(response){
            //if request if made successfully then the response represent the data
            
            console.log('response',response);
            if(response.status==200){
                $('#orderId').val("#"+response.data.orderId);
                $('#date').text(new Date(response.data.date).toLocaleDateString('en-us', {  year:"numeric", month:"short", day:"numeric", hour:'numeric',minute:'numeric',weekday:"long"}));
                $('#status').val(response.data.status);
                if(response.data.status =='GET_BILL' ||response.data.status =='CONFIRMED'||response.data.status =='PENDING'||response.data.status =='CLOSED'||response.data.status =='GETTING_READY'){
                    $('#requestBill').css('display','none');
                }


                if(response.data && response.data.items && response.data.items.length>0){
                    items = response.data.items;
                    let str = '';
                    for(let it of response.data.items){
                        str += `<tr>
                        <td>${it.item.name}</td>
                        <td>${it.item.price}</td>
                        <td>${it.item.dishType}</td>
                        <td>${it.item.image}</td>
                        <td>${it.quantity}</td>                        
                         </tr>`;
                    }
                    // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
                    $('#tableData').append(str);
                    $('#totalAmount').val(response.data.totalAmount)
                    
    
                    // localStorage.setItem('token',response.token); 
                    
                }else{
                    let str = '';
                    // for(let it of response.data.items){
                        str += `<tr>No item Added to cart</tr>`;
                    $('#tableData').append(str);

                }
                
                
            }else{
                let str = '';
                    // for(let it of response.data.items){
                        str += `<tr>No item Added to cart</tr>`;
                    $('#tableData').append(str);
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
}