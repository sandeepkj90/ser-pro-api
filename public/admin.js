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
function assignTechy() {
  let obj = {
    assignedTo: $('#technicianList option:selected').val(),
    status: 'ASSIGNED',
  };
  $.ajax({
    method: 'PUT',
    url: `/serviceRequests/update/${
      document.getElementById('hidden-id').innerHTML
    }`,
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PATCH',
      'Access-Control-Allow-Headers': 'application/json',
      contentType: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    data: JSON.stringify(obj),
    dataType: 'json',
    success: function (response) {
      //if request if made successfully then the response represent the data
      changePage('SERVICE');
      console.log('response', response);
      if (response.status == 200) {
        $('#showMessage').css('display', 'block');
        $('#message').text(response.message);

        // localStorage.setItem('token',response.token);
        setTimeout(() => {
          $('#showMessage').css('display', 'none');
          $('#tableData').html('');
          // onLoad();
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
      $('#serviceData').html('');
      $('#detail-view').css('display', 'none');
      $('#right-side').css('display', 'none');
      $('#service-side').css('display', 'block');
      $('.serviceMenu').css('color', 'cadetblue');
      $('.serviceMenu').css('background', 'whitesmoke');
      $('.userMenu').css('color', 'whitesmoke');
      $('.userMenu').css('background', 'cadetblue');
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
            // if(response.data && response.data.items && response.data.items.length>0){
            // items = response.data;

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
                            <td>${new Date(it.date).toLocaleDateString(
                              'en-us',
                              {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              }
                            )}</td>
                            <td>${it.title}</td>
                            <td>${it.description}</td>
                            <td><img src=uploads/${
                              it.pics
                            } alt='not found' width='50px' height='50px'/></td>
                            
                    <td>${it.status}</td>
                    <td>${it.assignedTo?.firstName || ''} ${
                it.assignedTo?.lastName || ''
              }</td>
                            
                            
                        <td>${
                          it.status == 'PENDING'
                            ? `<span style="cursor:pointer;color:#2a59a2; font-size:16px;"onclick="changeStatus(\'${it._id}\','PENDING')"><i class="fa fa-check-square-o" aria-hidden="true"></i> accept</span>`
                            : it.status == 'ACCEPTED'
                            ? `<span style="cursor:pointer;color:blue; font-size:16px;" onclick="changeStatus(\'${it._id}\','ACCEPTED',\'${it.title}\',\'${it.description}\',\'${it.pics}\')"><i class="fa fa-pencil-square-o" aria-hidden="true"> assign</i></span>`
                            : `<span style="cursor:pointer;color:green; font-size:16px;" ><i class="fa fa-thumbs-o-up"  aria-hidden="true"></i> closed</span>`
                        }</td></tr>`;
            }

            // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
            $('#serviceData').append(str);

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

function changeStatus(id, status, title, description, pics) {
  console.log('chnage-', id, status, title, description, pics);
  let obj = {};
  if (status == 'PENDING') {
    obj['status'] = 'ACCEPTED';
  }
  if (status != 'ACCEPTED') {
    $.ajax({
      method: 'PATCH',
      url: `/serviceRequests/changeReqStatus/${id}`,
      contentType: 'application/json',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH',
        'Access-Control-Allow-Headers': 'application/json',
        contentType: 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      data: JSON.stringify(obj),
      dataType: 'json',
      success: function (response) {
        //if request if made successfully then the response represent the data
        changePage('SERVICE');
        console.log('response', response);
        if (response.status == 200) {
          $('#showMessage').css('display', 'block');
          $('#message').text(response.message);

          // localStorage.setItem('token',response.token);
          setTimeout(() => {
            $('#showMessage').css('display', 'none');
            $('#tableData').html('');
            // onLoad();
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
  } else if (status == 'ACCEPTED') {
    $.ajax({
      method: 'GET',
      url: '/users/getUserList?role=' + localStorage.getItem('role'),
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
          $('#detail-view').css('display', 'block');
          $('#title').html(title);
          $('#hidden-id').html(id);
          $('#description').html(description);
          $('#screenshot').attr('src', `uploads/${pics}`);
          $('#technicianList').html('');
          let techOption = '';
          for (let i of response.data) {
            techOption += `<option value="${i._id}">${
              i.firstName
            }-${i.skills.join(',')}</option>`;
          }
          $('#technicianList').append(techOption);
          // $('#screenshot').html(title);

          // $('#showMessage').css('display', 'block');
          // $('#message').text(response.message);
          // // localStorage.setItem('token',response.token);
          // setTimeout(() => {
          //   $('#showMessage').css('display', 'none');
          //   $('#tableData').html('');
          //   onLoad();
          //   // window.location.href = '/home';
          // }, 2000);
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
function approveUser(id) {
  $.ajax({
    method: 'PATCH',
    url: `/users/approve/${id}`,
    contentType: 'application/json',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PATCH',
      'Access-Control-Allow-Headers': 'application/json',
      contentType: 'application/json',
      Authorization: localStorage.getItem('token'),
    },
    dataType: 'json',
    success: function (response) {
      //if request if made successfully then the response represent the data

      console.log('response', response);
      if (response.status == 200) {
        $('#tableData').html('');
        onLoad();
        // if(response.data && response.data.items && response.data.items.length>0){
        // items = response.data;

        // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
        // $('#tableData').append(str);

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
                        ? `<span style="cursor:pointer;color:#2a59a2; font-size:16px;" onclick="approveUser(\'${it._id}\')"><i class="fa fa-check" aria-hidden="true"></i></span>`
                        : '<span style="cursor:pointer;color:green; font-size:16px;" ><i class="fa fa-thumbs-o-up" aria-hidden="true"></i></span>'
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
