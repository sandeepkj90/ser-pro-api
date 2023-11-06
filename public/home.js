(function(){
    if(!localStorage.getItem('token'))
    window.location.href='/login';
    onLoad();
   
})();
function logout(){
    localStorage.removeItem('token');
    window.location.href="/login";
}
function backToList(){
    window.location.href="/admin";

}
function createDish(){
    window.location.href="/dishDetail";
}
function updateDish(name,price,dishType,image,_id){
    let data = {name,price,dishType,image,_id}
    console.log('data fro update', data);
    window.location.href = '/dishDetail?input='+window.btoa(JSON.stringify(data));    
}
function deleteEntry(data){
    console.log('button clicked delete');
    console.log('delete data',data);
    $.ajax({
        method: "DELETE",
        url: '/dishes/deleteById/'+data,
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
            
            console.log('response',response);
            if(response.status==200){
                // $('#showMessage').css('display','block');
                // $('#message').text(response.data.response.length +' Data Found');
                let str = '';
                for(let item of response.data.response){
                    str += `<tr>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.dishType}</td>
                    <td>${item.image}</td>
                    <td></span><span  onclick="updateDish(\'${item.name}\',\'${item.price}\',\'${item.dishType}\',\'${item.image}\',\'${item._id}\')" class="glyphicon glyphicon-edit updatebtn"></span><span  onclick="deleteEntry(\'${item._id}\')" class="glyphicon glyphicon-trash deletebtn"></span></td>
                  </tr>`;
                }
                $('#tableData').append(str);
                

                // localStorage.setItem('token',response.token); 
                setTimeout(()=>{
                    $('#showMessage').css('display','none');
                    // window.location.href = '/home';
                },1000)
                
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