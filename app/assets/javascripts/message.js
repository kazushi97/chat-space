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
                  <p class="chat-contents__comment">
                    ${message.body}
                      ${imagehtml}
                  </p>
                </div>`
    return html;
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action') + '.json'
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
      $('.chat-main').append(html)
      $('.input-form__text').val('')
      $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error!');
    })
  return false;
  });
});
