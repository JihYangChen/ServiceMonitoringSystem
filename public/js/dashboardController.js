// --- Update Data ---    

var add_HostFlag = '';
var delete_HostFlag = '';
function updateTable(hosts) {
    var tableContentStr = "";
    var add_status = false;
    var delete_status = true;

    for (host in hosts) {
        tableContentStr += `
            <tr>
                <td><i class="fa fa-desktop"></i> &nbsp;&nbsp;<button type="button" class="btn btn-xs btn-link" data-toggle="modal" data-target="#viewModal" data-h_name="${ hosts[host].displayName }" data-h_id="${ hosts[host].id }">${ hosts[host].displayName }</button></td>
                <td>${ hosts[host].host }</td>
                <td>${ getStatusTd(hosts[host].status) }</td>
                <td>${ hosts[host].checkServiceOption }</td>
                <td>${ new Date(hosts[host].lastCheckTime).toLocaleString() }</td>
                <td>${ getTimeDuration(new Date(hosts[host].statusStartTime).getTime()) }</td>
                <td><button type="button" value="${ hosts[host].id }" class="deleteHostBtn btn btn-xs btn-danger"><i class="fa fa-trash-o"></i> Delete</button></td>
            </tr> `;

        if (add_HostFlag == hosts[host].displayName){
        add_status = true;
        }
        if (delete_HostFlag == hosts[host].id){
        delete_status = false;
        }
    }

    if(add_HostFlag != '' && add_status){
        add_HostFlag = '';
        $('#loadingContent').hide();
    }
    if(delete_HostFlag != '' && delete_status){
        delete_HostFlag = '';
        $('#loadingContent').hide();
    }

    $("#tableContent").html( tableContentStr );
    $("td").css("vertical-align","middle");
}

function getStatusTd(status) {
    if (status === "Up")
        return `<i class="fa  fa-check-circle" style="color:rgb(31, 182, 81)"></i> Up`
    else if(status === "Down")
        return `<i class="fa  fa-times-circle" style="color:rgb(254, 16, 45)"></i> Down`
    else
        return `<i class="fa  fa-refresh" style="color:rgb(46, 166, 236)"></i> Loading`
}

function getTimeDuration(startTime) {
    var interval = Date.now() - startTime;

    var msecPerMinute = 1000 * 60;  
    var msecPerHour = msecPerMinute * 60;  
    var msecPerDay = msecPerHour * 24;  

    var days = Math.floor(interval / msecPerDay );  
    interval = interval - (days * msecPerDay );  

    var hours = Math.floor(interval / msecPerHour );  
    interval = interval - (hours * msecPerHour );  

    var minutes = Math.floor(interval / msecPerMinute );  
    interval = interval - (minutes * msecPerMinute );  

    var seconds = Math.floor(interval / 1000 );  

    var duration = days + "d, " + hours + "h, " + minutes + "m, " + seconds + "s.";
    return duration;
}




// --- addHostModal ---

// 新增Host
$(document).ready(function(){
    $("#addHostBtn").click(function(){
      $('#loadingContent').show();
      add_HostFlag = $("#displayName").val();

      var contacts_arr = new Array();
      $(".select_contact").each(function(){
        contacts_arr.push($(this).val());
      });

      $.ajax({
        method: "POST",
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        url: "/api/hostManagement/addHost",
        data: JSON.stringify(
          { 
            displayName: $("#displayName").val(), 
            host: $("#host").val(), 
            status: "Unchecked", 
            statusStartTime: Date(), 
            lastCheckTime: Date(),
            checkServiceOption: $("#checkService").val(),
            contactsId: contacts_arr
          }
        )
      });

      $('#addHostModal').modal('toggle');
      $("#displayName").val('');
      $("#host").val('');
    });

    $("td").css("vertical-align","middle");
});

// 取得最新Contact名單
var contact_options;
$('#addHostModal').on('show.bs.modal', function (event) {
    $("#contact_box").empty();
    $.get( "/api/contactManagement/getContacts", function(data) {
        console.log(data);

        contact_options = '';
        for (c in data) {
            contact_options += '<option value="'+data[c].id+'">'+data[c].name+'</option>';
        }
    });
});

// 移除Contact
function removeContact(e){
    $(e).parents(".item").remove();
}

// 加入Contact
function joinContact(){
    $("#contact_box").append(`
        <div class="item form-group">
            <label class="control-label col-md-3 col-sm-3 col-xs-12" for="host">Contact <span class="required">*</span>
            </label>
            <div class="col-md-5 col-sm-5 col-xs-12">
                <select class="form-control col-md-7 col-xs-12 select_contact" required="required">`+ contact_options +`</select>
            </div>
            <div class="col-md-1 col-sm-1 col-xs-12">
                <button type="button" class="btn btn-danger" onclick="removeContact(this)"><i class="fa fa-close"></i></button>
            </div>
        </div>
    `);
}


// --- addContactModal ---

// 新增Contact
$("#addContactBtn").click(function(){
    var notifyAddresses_arr = new Array({
            notifyType: 'email',
            address: $("#c_email").val()
    });
    $(".c_address_type").each(function(){
        if($(this).val() != 'None'){
        notifyAddresses_arr.push({
            notifyType: $(this).val(),
            address: $(this).parents('.item').find('.c_address_content').val()
        });
        }
    });

    $.ajax({
        method: "POST",
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        url: "/api/contactManagement/addContact",
        data: JSON.stringify(
                { 
                name: $("#c_name").val(),
                notifyAddresses: notifyAddresses_arr
                }
            )
    });

    $('#addContactModal').modal('toggle');
    $("#c_name").val('');
    $("#c_email").val('');
    $(".c_address_type").each(function(){
        $(this).val('');
        $(this).parents('.item').find('.c_address_content').val('');
    });
});




// --- Other ---

// 刪除Host
$(document).on('click', '.deleteHostBtn', function(){
    $('#loadingContent').show();
    delete_HostFlag = $(this).val();
    $.post("/api/hostManagement/deleteHost",
    { 
      hostId: $(this).val()
    });
});

// 顯示Host Contacts
$('#viewModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var h_name = button.data('h_name');
    var h_id = button.data('h_id');

    $.get( "/api/hostManagement/getHostContacts/" + h_id, function( data ) {
        var viewModal_html = '';

        if(data.length > 0){
        for (c in data) {
            console.log(data[c]);
            viewModal_html += '<div class="well"><form class="form-horizontal"><div class="form-group"><label class="col-sm-2 control-label">Name</label><div class="col-sm-10"><p class="form-control-static">'+ data[c].name +'</p></div></div>';
            for (a in data[c].notifyAddresses) {
            viewModal_html += '<div class="form-group"><label class="col-sm-2 control-label">'+ data[c].notifyAddresses[a].notifyType +'</label><div class="col-sm-10"><p class="form-control-static">'+ data[c].notifyAddresses[a].address +'</p></div></div>';
            }
            viewModal_html += '</form></div>';
        }
        }
        else{
        viewModal_html = '<div class="well"><p style="margin:  0;">No contact</p></div>';
        }

        $('#viewModal').find('.modal-title').text(h_name);
        $('#view_contact_box').html(viewModal_html);
    });
});