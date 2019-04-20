$(function() {
  function buildHTML(message){
    var imagehtml = message.image == null ? "" : `<img class="chat-contents__image" src="${message.image}"></img>`;
    var html = `<div class="chat-contents">
                  <div class="chat-contents__comment-user">
                    ${message.user_name}
                    <span class="chat-contents__comment-date-time">
                      ${message.created_at}
                    </span>
                  </div>
                  <p class="chat-contents__comment" data-id="${message.id}">
                    ${message.body}
                  </p>
                  ${imagehtml}
                </div>`
    return html;
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main').append(html);
      $('.input-form__text').val('');
      $('.file-send').val('');
      $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
      $('.input-form__send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert('error!');
    })
  });

  var reloadMessages = function() {
    last_message_id = $(".chat-contents__comment:last").data('id');
    $.ajax({
      url: '/groups/:group_id/api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      console.log('success');
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.chat-main').append(insertHTML);
        $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
      });
    })
    .fail(function(){
      console.log('auto_reload_error');
    });
  };
  setInterval(reloadMessages, 5000);
});
