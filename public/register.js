(function(){
    if(localStorage.getItem('token'))
    window.location.href='/home';
})();
function register(){
    let obj = {
        name :document.getElementById('name').value,
        email :document.getElementById('email').value,
        password :document.getElementById('password').value,
        phone :document.getElementById('phone').value,
        address: document.getElementById('address').value
    }
    console.log('hello ',obj);
    $.ajax({
        method: "POST",
        url: '/users/create',
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'POST',
            'Access-Control-Allow-Headers':'application/json',
            contentType: 'application/json'
          },
          data:JSON.stringify(obj),
          dataType: "json",
        success: function(response){
            //if request if made successfully then the response represent the data
            
            console.log('response',response);
            if(response.status==201){
                $('#showMessage').css('display','block');
                $('#message').text('User Registered Successfully.'); 
                setTimeout(()=>{
                    window.location.href = '/';
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
