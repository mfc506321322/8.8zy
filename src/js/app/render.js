define(['jquery'],function($){
    var storage = window.localStorage;
    var template = Handlebars.compile($('.text').html());
    var data = {
        users:[]
    }
    if(data.users.length == 0 && JSON.parse(storage.getItem('users')).users.length != 0){
        data = JSON.parse(storage.getItem('users'));
        $('tbody').html(template(JSON.parse(storage.getItem('users'))));
    }
    $('#submit').click(function(){
        var flag = true;
        $.each(data.users,function(k,v){
            if($('.form-control').eq(1).val()==v.num){
                flag = false;
            }
        })
        if(!flag){
            alert('学号重复')
        }else if($('.form-control').eq(0).val().trim() == '' || $('.form-control').eq(1).val().trim() == '' || $('.form-control').eq(2).val().trim() == ''){
            alert('内容不能为空')
        }else{
            data.users.push({
                name:$('.form-control').eq(0).val(),
                num:$('.form-control').eq(1).val(),
                result:$('.form-control').eq(2).val()
            })
            storage.setItem('users',JSON.stringify(data));
            $('tbody').html(template(data));
        }
    })
    $('tbody').on('click','.btn-danger',function(){
        data.users.splice($(this).parents('tr').find('td').eq(0).html()*1,1);
        $(this).parents('tr').remove();
        storage.setItem('users',JSON.stringify(data));
    })
})