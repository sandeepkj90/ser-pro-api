console.log('admin page js');
let filePath = '';
(function () {
  if (!localStorage.getItem('token')) window.location.href = '/login';
  //   $('#setName').text(`Hi ${localStorage.getItem('name')}`);
  onLoad();
})();
function logout() {
  localStorage.removeItem('token');
  window.location.href = '/login';
}
function changePage(pageName) {
  switch (pageName) {
    case 'USER': {
      $('#service-side').css('display', 'none');
      $('.serviceMenu').css('background', 'cadetblue');
      $('.serviceMenu').css('color', 'whitesmoke');

      $('#right-side').css('display', 'block');
      $('.userMenu').css('background', 'whitesmoke');
      $('.userMenu').css('color', 'cadetblue');

      break;
    }
    case 'SERVICE': {
      $('#service-side').css('display', 'block');
      $('#right-side').css('display', 'none');
      $('.serviceMenu').css('color', 'cadetblue');
      $('.serviceMenu').css('background', 'whitesmoke');
      $('.userMenu').css('color', 'whitesmoke');
      $('.userMenu').css('background', 'cadetblue');
    }
  }
}
function goToDish() {
  window.location.href = '/home';
}
function updateDish(name, price, dishType, image, _id) {
  let data = { name, price, dishType, image, _id };
  console.log('data fro update', data);
  window.location.href =
    '/dishDetail?input=' + window.btoa(JSON.stringify(data));
}
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
  $('#loading').css('display', 'block');

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
      filePath = response.data.filename;
      setTimeout(() => {
        $('#loading').css('display', 'none');
      }, 2000);
    },
  });
}

function onLoad() {
  console.log('getname', localStorage.getItem('name'));
  document.getElementById('setName').innerText = `Hi ${localStorage.getItem(
    'name'
  )}`;
  $('#loading').css('display', 'block');

  $.ajax({
    method: 'GET',
    url: '/serviceRequests/getListByUserId',
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'application/json',
      contentType: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    dataType: 'json',
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log('response', response);
      if (response.status == 200) {
        $('#loading').css('display', 'none');
        $('#tableData').html('');
        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;
        if (localStorage.getItem('profilePic')) {
          // $('#profileImage').src('')
          $('#profileImage').attr(
            'src',
            `uploads/${localStorage.getItem('profilePic')}`
          );
        }
        let str = '';
        //   {
        //     "_id": "654de80e6ff9f63c2b1aefb0",
        //     "userId": "654c10834081654b04a3bdba",
        //     "title": "Pipe got damaged",
        //     "date": "2023-11-10T08:19:41.777Z",
        //     "description": "pipe got very damanged",
        //     "pics": "uploads/1699604000072-imgback.jpg",
        //     "status": "PENDING",
        //     "__v": 0
        // }
        for (let it of response.data) {
          str += `<tr>
                        <td>${new Date(it.date).toLocaleDateString('en-us', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}</td>
                        <td>${it.title}</td>
                        <td>${it.description}</td>
                        <td><img src=uploads/${
                          it.pics
                        } alt='not found' width='50px' height='50px'/></td>
                        
                <td>${it.status}</td>
                
                        
                        
                    <td>${
                      it.status == 'INPROGRESS'
                        ? '<span style="cursor:pointer;color:#2a59a2; font-size:16px;"onclick=""><i class="fa fa-check" aria-hidden="true"></i></span>'
                        : '<span style="cursor:pointer;color:green; font-size:16px;" onclick=""><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>'
                    }</td></tr>`;
        }
        // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
        $('#tableData').append(str);

        // $('#totalAmount').val(response.data.totalAmount)

        // localStorage.setItem('token',response.token);
      }
    },
    error: function (error) {
      console.log('error', error);
      //let data = JSON.stringify(error.responseJSON.message.message));
      $('#showMessage').css('display', 'block');
      $('#message').text(error.responseJSON.message);
      setTimeout(() => {
        $('#loading').css('display', 'none');

        $('#showMessage').css('display', 'none');
      }, 3000);
    },
  });
}
// function registerRequest() {}

function raiseRequest() {
  let obj = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    pics: filePath,
    userId: localStorage.getItem('userId'),
  };
  console.log('objet reqeust', obj);
  for (let i in obj) {
    if ((i != 'pics' && obj[i] == '') || obj[i] == []) {
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
  $('#loading').css('display', 'block');

  $.ajax({
    method: 'POST',
    url: '/serviceRequests/create',
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'application/json',
      contentType: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    data: JSON.stringify(obj),
    dataType: 'json',
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log('response', response);
      if (response.status == 201) {
        $('#showMessage').css('display', 'block');
        $('#message').text('Service Request raised Successfully.');
        setTimeout(() => {
          $('#loading').css('display', 'none');
          // onLoad();
          window.location.href = '/customerHome';
        }, 3000);
      }
    },
    error: function (error) {
      console.log('error', error);
      //let data = JSON.stringify(error.responseJSON.message.message));
      $('#showMessage').css('display', 'block');
      $('#message').text(error.responseJSON.message);
      setTimeout(() => {
        $('#loading').css('display', 'none');

        $('#showMessage').css('display', 'none');
      }, 3000);
    },
  });
  console.log('hello');
}
