
(function () {
    if (localStorage.getItem('token'))
        window.location.href = '/home';
})();
function login() {
    if (!document.getElementById('email').value || !document.getElementById('password').value) {
        $('#showMessage').css('display', 'block');
        $('#message').text('Fields are Mandatory');
        // localStorage.setItem('token', response.token);
        setTimeout(() => {
            $('#showMessage').css('display', 'none');
            // window.location.href = '/home';
        }, 2000)
        return;
    }
    let obj = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value

    }
    console.log('hello ', obj);
    $.ajax({
        method: "POST",
        url: '/users/login',
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'application/json',
            contentType: 'application/json'
        },
        data: JSON.stringify(obj),
        dataType: "json",
        success: function (response) {
            //if request if made successfully then the response represent the data

            console.log('response', response);
            if (response.status == 200) {
                $('#showMessage').css('display', 'block');
                $('#message').text(response.message);
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    $('#showMessage').css('display', 'none');
                    if(response.data.role =='CUSTOMER')
                    window.location.href = '/customerHome';
                    else if(response.data.role =='CHEF')
                    window.location.href = '/chefHome';
                    else
                    window.location.href = '/admin';

                }, 1000)

            }
        }, error: function (error) {
            console.log('error', error);
            //let data = JSON.stringify(error.responseJSON.message.message));
            $('#showMessage').css('display', 'block');
            $('#message').text(error.responseJSON.message);
            setTimeout(() => {
                $('#showMessage').css('display', 'none');

            }, 3000)
        }
    });
    console.log('hello');
}