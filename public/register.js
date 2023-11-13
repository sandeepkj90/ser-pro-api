let skillList = [];

(function () {
  if (localStorage.getItem('token')) window.location.href = '/home';
})();
let profilepic = '';
function previewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById('uploadImage').files[0]);

  oFReader.onload = function (oFREvent) {
    document.getElementById('uploadPreview').src = oFREvent.target.result;
  };
  // const fileInput = document.getElementById('uploadImage');
  const file = document.getElementById('uploadImage').files[0];
  console.log('files', file);
  if (!file) {
    alert('Please select a file.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  console.log('formData--', formData);
  // You can also append additional data to the FormData if needed
  // formData.append('key', 'value');
  $.ajax({
    url: '/upload',
    type: 'POST',
    data: formData,
    async: false,
    cache: false,
    contentType: false,
    enctype: 'multipart/form-data',
    processData: false,
    success: function (response) {
      console.log(response.data.path);
      profilepic = response.data.filename;
    },
  });
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
    let skill = document.getElementById('skills').value;
    skillList.push(skill);
    $('#closeData').css('display', 'block');

    let div = document.getElementById('skillList');
    let span = document.createElement('span');
    span.textContent = skill;
    div.appendChild(span);
    document.getElementById('skills').value = '';
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
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    role: document.getElementById('role').value,
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value,
    pincode: document.getElementById('pincode').value,
    address: document.getElementById('address').value,
    profilePic: profilepic,
    // skills: skillList,
    ...(document.getElementById('role').value == 'TECHNICIAN' && {
      skills: skillList,
    }),
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
