$(document).ready(function() {
    $('.js-load-posts').on('click', function() {
       $.get('/api/blog').done(function(data){
         data.forEach( function(el) {
             $('#posts').append(`<div><h1 data-id=${el.id} class='post'>${el.title}</h1>`);
             $('#posts').append(`<h6>${el.author}</h6><hr></div>`);

         });
            $('.post').on('click', function(){
                var id = $(this).data('id');
                $.get('/api/blog/'+id).done(function(data){
                    $('.modal-title').html(data.title)
                    $('.js-author').html(`${data.first_name} ${data.last_name}`)
                    $('.js-date').html(data.date)
                    $('.js-content').html(data.content)
                    $('.modal').modal();
                })
            })
       })
    })

    $('.js-new-post-form').on('submit', function(e) {
        e.preventDefault();
        var formData = $(this).serialize();
        $.post('/api/new', formData)
        
        
    })
})
