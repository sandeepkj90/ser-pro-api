(function(){
    if(!localStorage.getItem('token'))
    window.location.href='/login';
    onLoad();
   
})();
function logout(){
    localStorage.removeItem('token');
    window.location.href="/login";
}
function goToOrder(){
    window.location.href="/order";

}

function createDish(){
    window.location.href="/dishDetail";
}
function openDish(name,price,dishType,image,_id, incart){
    let data = {name,price,dishType,image,_id,incart}
    console.log('data fro update', data);
    window.location.href = '/customerDishDetail?input='+window.btoa(JSON.stringify(data));    
}
function goToCart(){
    // let data = $('#itemsInCart').val();
    if(!parseInt($('#itemsInCart').text()))
    return;
    window.location.href = '/cartDetail';    


}
function onLoad(){
    
    $.ajax({
        method: "GET",
        url: '/dishes/getList',
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
            let cartList = response.data.cartList;
            if(cartList && cartList.items)
            $('#itemsInCart').text(cartList.items.length);
            console.log('response',response.data);
            if(response.status==200){
                let str = '';
                for(let item of response.data.response){
                    if(cartList && cartList.items.length>0 && cartList.items.find(it=>it.item._id == item._id)){
                        str += `<tr>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.dishType}</td>
                    <td>${item.image}</td>
                    <td></span><span  onclick="openDish(\'${item.name}\',\'${item.price}\',\'${item.dishType}\',\'${item.image}\',\'${item._id}\',\'INCART\')" class="glyphicon glyphicon-folder-open updatebtn"></span><span class="glyphicon glyphicon-shopping-cart addedToCart">in-cart</span></td>
                  </tr>`;
                    }else{
                        str += `<tr>
                        <td>${item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.dishType}</td>
                        <td>${item.image}</td>
                        <td></span><span  onclick="openDish(\'${item.name}\',\'${item.price}\',\'${item.dishType}\',\'${item.image}\',\'${item._id}\')" class="glyphicon glyphicon-folder-open updatebtn"></span></td>
                      </tr>`;
                    }
                    
                    
                }
                $('#tableData').append(str);
                

                // localStorage.setItem('token',response.token); 
                
                
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