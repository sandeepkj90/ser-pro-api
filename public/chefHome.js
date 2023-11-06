(function () {
    if (!localStorage.getItem('token'))
        window.location.href = '/login';
    onLoad();

})();
function logout() {
    localStorage.removeItem('token');
    window.location.href = "/login";
}


function goToDish() {
    window.location.href = "/home";
}
function updateDish(name, price, dishType, image, _id) {
    let data = { name, price, dishType, image, _id }
    console.log('data fro update', data);
    window.location.href = '/dishDetail?input=' + window.btoa(JSON.stringify(data));
}
function deleteEntry(data) {
    console.log('button clicked delete');
    console.log('delete data', data);
    $.ajax({
        method: "DELETE",
        url: '/dishes/deleteById/' + data,
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE',
            'Access-Control-Allow-Headers': 'application/json',
            contentType: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        dataType: "json",
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
                }, 2000)

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
}
function orderDetail(id) {
    window.location.href = '/adminOrderDetail?input=' + id;
}
function changeStatus(id, status) {
    let spanData = $('#' + id + 'changeText').text();
    console.log('spandata--', spanData);
    if (spanData == 'ORDER SERVED') {
        return;
    }

    let url = '';
    if (status == 'CONFIRMED') {
        // $('#changeText').text('CONFIRMED')
        url = '/orders/orderConfirmedByChef/' + id;
    } else if (status == 'GETTING_READY') {
        url = '/orders/orderReadyToServe/' + id;
    }
    $.ajax({
        method: "PUT",
        url: url,
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PUT',
            'Access-Control-Allow-Headers': 'application/json',
            contentType: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        dataType: "json",
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
                }, 2000)

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
}

function getStatus(status) {
    if (status == 'CONFIRMED')
        return 'START';
    else if ( status == 'GETTING_READY')
        return 'SERVE IT'
        else if (status =='READY_TO_SERVE')
        return 'ORDER SERVED';
}
function getItemName(items){
    let str = '';
    for(let i of items){
        str += `[${i.item.name}-${i.quantity}]\t\t`;
    }
    return str;

}
function onLoad() {
    $.ajax({
        method: "GET",
        url: '/orders/getList',
        contentType: 'application/json',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'application/json',
            contentType: 'application/json',
            Authorization: localStorage.getItem('token')
        },
        dataType: "json",
        success: function (response) {
            //if request if made successfully then the response represent the data

            console.log('response', response);
            if (response.status == 200) {
                // if(response.data && response.data.items && response.data.items.length>0){
                items = response.data.items;
                let str = '';
                for (let it of response.data) {
                    str += `<tr>
                        <td>${it.date}</td>
                        <td>${it.orderId}</td>
                        <td>
                        
                        ${getItemName(it.items)}</td>
                        <th>${it.status}</td>
                        
                    <td><span id="${it._id}changeText" class="confirm" onclick="changeStatus(\'${it._id}\',\'${it.status}\')">${getStatus(it.status)}</span></td>

                        
                         </tr>`;

                }
                // str +=`<tr><td>Total Amount</td><td>${response.data.totalAmount}</tr>`
                $('#tableData').append(str);

                // $('#totalAmount').val(response.data.totalAmount)


                // localStorage.setItem('token',response.token); 




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
}