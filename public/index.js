(function () {
  if (localStorage.getItem('token')) window.location.href = '/admin';
})();
function login() {
  let obj = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  for (let i in obj) {
    if (obj[i] == '' || obj[i] == []) {
      $(`#${i}`).css('border', '1px red solid');
      $('#message').css('color', 'red');

      $('#showMessage').css('display', 'block');
      $('#showMessage').css('background', '#f2dede');
      let key = i[0].toUpperCase() + i.slice(1);
      $('#message').text(`${key} is Required.`);

      setTimeout(() => {
        $('#showMessage').css('display', 'none');
        $(`#${i}`).css('border', 'none');
        $('#message').css('color', '#1e81b0');

        // window.location.href = '/register';
      }, 3000);
      return;
    } else {
      $(`#${i}`).css('border', 'none');
    }
  }

  console.log('hello ', obj);
  $.ajax({
    method: 'POST',
    url: '/users/login',
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'application/json',
      contentType: 'application/json',
    },
    data: JSON.stringify(obj),
    dataType: 'json',
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log('response', response);
      if (response.status == 200) {
        $('#showMessage').css('display', 'block');
        $('#message').text(response.message);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.firstName);
        localStorage.setItem('userId', response.data._id);
        setTimeout(() => {
          $('#showMessage').css('display', 'none');
          if (response.data.role == 'CUSTOMER')
            window.location.href = '/customerHome';
          else if (response.data.role == 'CHEF')
            window.location.href = '/chefHome';
          else window.location.href = '/admin';
        }, 1000);
      }
    },
    error: function (error) {
      console.log('error', error);
      //let data = JSON.stringify(error.responseJSON.message.message));
      $('#showMessage').css('display', 'block');
      $('#message').text(error.responseJSON.message);
      setTimeout(() => {
        $('#showMessage').css('display', 'none');
      }, 3000);
    },
  });
  console.log('hello');
}
