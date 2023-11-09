console.log('admin page js');
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
      $('#right-side').css('display', 'block');
      $('.userMenu').css('color', 'cadetblue');
      $('.userMenu').css('background', 'whitesmoke');

      $('#service-side').css('display', 'none');
      $('.serviceMenu').css('background', 'cadetblue');
      $('.serviceMenu').css('color', 'whitesmoke');

      break;
    }
    case 'SERVICE': {
      $('#right-side').css('display', 'none');
      $('#service-side').css('display', 'block');
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
function deleteEntry(data) {
  console.log('button clicked delete');
  console.log('delete data', data);
  $.ajax({
    method: 'DELETE',
    url: '/dishes/deleteById/' + data,
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE',
      'Access-Control-Allow-Headers': 'application/json',
      contentType: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    dataType: 'json',
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log('response', response);
      if (response.status == 200) {
        $('#showMessage').css('display', 'block');
        $('#message').text(response.message);

        // localStorage.setItem('token',response.token);
        setTimeout(() => {
          $('#showMessage').css('display', 'none');
          $('#tableData').html('');
          onLoad();
          // window.location.href = '/home';
        }, 2000);
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
}
function orderDetail(id) {
  window.location.href = '/adminOrderDetail?input=' + id;
}
function changeStatus(id, status) {
  let spanData = $('#' + id + 'changeText').text();
  console.log('spandata--', spanData);
  if (
    spanData == 'WAITING CHEF ACTION' ||
    spanData == 'CLOSED' ||
    spanData == 'WAITING FOR BILL'
  )
    return;

  let url = '';
  if (status == 'PENDING') {
    // $('#changeText').text('CONFIRMED')
    url = '/orders/orderConfirmedByAdmin/' + id;
  } else if (status == 'GET_BILL') {
    url = '/orders/closeOrder/' + id;
  }
  $.ajax({
    method: 'PUT',
    url: url,
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Headers': 'application/json',
      contentType: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    dataType: 'json',
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log('response', response);
      if (response.status == 200) {
        $('#showMessage').css('display', 'block');
        $('#message').text(response.message);

        // localStorage.setItem('token',response.token);
        setTimeout(() => {
          $('#showMessage').css('display', 'none');
          $('#tableData').html('');
          onLoad();
          // window.location.href = '/home';
        }, 2000);
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
}

function getStatus(status) {
  if (status == 'PENDING') return 'CONFIRM';
  else if (status == 'CONFIRMED' || status == 'GETTING_READY')
    return 'WAITING CHEF ACTION';
  else if (status == 'READY_TO_SERVE') return 'WAITING FOR BILL';
  else if (status == 'GET_BILL') return 'CLOSE';
  else if (status == 'CLOSED') return 'CLOSED';
}
function getItemName(items) {
  let str = '';
  for (let i of items) {
    str += `[${i.item.name}-${i.quantity}]\t\t`;
  }
  return str;
}
function onLoad() {
  console.log('getname', localStorage.getItem('name'));
  document.getElementById('setName').innerText = `Hi ${localStorage.getItem(
    'name'
  )}`;
  $.ajax({
    method: 'GET',
    url: '/users/getUserList?role=ADMIN',
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
        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;
        let str = '';
        for (let it of response.data) {
          str += `<tr>
                        <td>${new Date(it.date).toLocaleDateString('en-us', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}</td>
                        <td>${it.firstName}</td>
                        <td>
                        ${it.email}</td>
                        <td>${it.phone}</td>
                <td>${it.role}</td>
                <td>${it.profilePic}</td>
                <td>${it.skills.join(' ')}</td>
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
        $('#showMessage').css('display', 'none');
      }, 3000);
    },
  });
}
