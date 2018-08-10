define(['jquery','template'],function($,setHand){
    var storage = window.localStorage;
    var count = 0;
    var data = JSON.parse(storage.getItem('users')) || {
        users:[]
    }
    //setHand('.text','tbody',data);
    pageRender();
    change(0);
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
            //setHand('.text','tbody',data);
            $('.form-control').each(function(i,v){
                $(v).val('');
            })
            //分页器
            pageRender();
            change(count);
        }
    })
    $('tbody').on('click','.btn-danger',function(){
        data.users.splice($(this).parents('tr').find('td').eq(0).html()*1,1);
        storage.setItem('users',JSON.stringify(data));
        //setHand('.text','tbody',data);
        count = $('.pagination li.active').attr('index');
        pageRender();
        change(count);
        if($('tbody tr td').eq(0).html().trim() == '暂无数据'){
            count = Math.ceil(data.users.length/5)-1;
            change(count);
        }
    })
    $('.pagination').on('click','li',function(){
        change($(this).attr('index'));
    })
    $('.box').on('click','#nextbtn',function(){
        count++;
        if(count>Math.ceil(data.users.length/5)-1){
            count = 0;
        }
        change(count);
    })
    $('.box').on('click','#prevbtn',function(){
        count--;
        if(count<0){
            count = Math.ceil(data.users.length/5)-1;
        }
        change(count);
    })
    function pageRender(){
        var pagenum = {
            pages:[]
        }
        var num = Math.ceil(data.users.length/5);
        for(var i=0;i<num;i++){
            pagenum.pages.push({num:i*5});
        }
        setHand('.page','.pagination',pagenum);
    }
    function change(curindex){
        var ind = $('.pagination li').eq(curindex).data('start');
        count = curindex;
        $('.pagination li').each(function(i,v){
            if($(v).attr('index') == curindex){
                $(v).addClass('active').siblings().removeClass('active');
            }
        })
        setHand('.text','tbody',setData(ind, 5));
    }
    function setData(start, limit) {
        var contdata = {
            users: data.users.slice(start, +start + limit)
        };
        return contdata;
    }
})