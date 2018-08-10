define(['handlebars','jquery'],function(Handlebars,$){
    Handlebars.registerHelper('showpage',function(item){
        return item + 1;
    })
    Handlebars.registerHelper('showid',function(item){
        return item + $('.pagination li.active').data('start')*1;
    })
    return function(html,el,data){
        var template = Handlebars.compile($(html).html());
        $(el).html(template(data));
    }
})