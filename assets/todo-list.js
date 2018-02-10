// controll ajax request when we want to add to delete request

$(document).ready(function(){

  // when we have a sumbit event for the form
  $('form').on('submit', function(){

      var item = $('form input');
      var todo = {item: item.val()};

      // make ajax request here and handler in todoController.js
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
