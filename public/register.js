let skillList = [];

(function () {
  if (localStorage.getItem('token')) window.location.href = '/home';
})();
function PreviewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById('uploadImage').files[0]);

  oFReader.onload = function (oFREvent) {
    document.getElementById('uploadPreview').src = oFREvent.target.result;
  };
}
function clearData() {
  document.getElementById('skillList').innerHTML = '';
  document.getElementById(
    'skillList'
  ).innerHTML = `<a id="closeData" class="show-technicians" onclick="clearData()">X</a>`;
  skillList = [];
}
function onChangeRole(event) {
  if (event.value == 'TECHNICIAN') {
    document.getElementById('skillList').innerHTML = '';
    document.getElementById(
      'skillList'
    ).innerHTML = `<a id="closeData" class="show-technicians" onclick="clearData()">X</a>`;
    $('#skillList').css('display', 'block');
    $('#showSkill').css('display', 'block');
  } else {
    $('#showSkill').css('display', 'none');
    $('#skillList').css('display', 'none');
  }
}
function addSkill() {
  if (skillList.length < 4) {
    let skill = document.getElementById('skill').value;
    skillList.push(skill);
    $('#closeData').css('display', 'block');

    let div = document.getElementById('skillList');
    let span = document.createElement('span');
    span.textContent = skill;
    div.appendChild(span);
    document.getElementById('skill').value = '';
  } else {
    $('#showMessage').css('display', 'block');
    $('#message').text('Maximum 3 skills allowed.');
    setTimeout(() => {
      $('#showMessage').css('display', 'none');
    }, 3000);
  }
}
function register() {
  let obj = {
    firstName: document.getElementById('fname').value,
    lastName: document.getElementById('lname').value,
    email: document.getElementById('email').value,
    role: document.getElementById('role').value,
    password: document.getElementById('password').value,
    pincode: document.getElementById('pincode').value,
    phone: document.getElementById('phone').value,
    address: document.getElementById('address').value,
    skills: skillList,
  };
  console.log('hello ', obj);
  $.ajax({
    method: 'POST',
    url: '/users/register',
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
      if (response.status == 201) {
        $('#showMessage').css('display', 'block');
        $('#message').text('User Registered Successfully.');
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
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
