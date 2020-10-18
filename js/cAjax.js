// function createAjax(json){
//     if(window.XMLHttpRequest){
//         var ajax=new XMLHttpRequest()
//     }else{
//         var ajax=new ActiveXObject('Microsoft.XMLHTTP')
//     }
//     if(json.type=='get'){
//         var url=json.data?json.url+'?'+json.data:json.url
//         ajax.open('get',url)
//         ajax.send()
//     }else{
//         ajax.open('post',json.url)
//         ajax.setRequestHeader('content-type','application/x-www-form-urlencoded')
//         ajax.send(json.data)
//     }
//     ajax.onreadystatechange=function(){
//         if(ajax.readyState==4&&ajax.status==200){
//             json.success&&json.success(ajax.responseText)
//         }else{
//            json.err&&json.err()
//         }
//     }
//  }
 function createAjax(json){
    //2、创建ajax对象
    if(window.XMLHttpRequest){
        var ajax = new XMLHttpRequest();
    }else{
        var ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //3、打开请求并且发送请求
    if(json.type=='get'){
        //在向服务端来请求数据的同时也可以携带一些客户端的数据来请求
        //如果url地址中有参数表示需要在请求的时候将本地的数据一起发送
        //如果url没有参数，表示向服务端单纯的请求数据
        var url = json.data ? json.url+'?'+json.data : json.url;
        ajax.open('get',url,true)
        ajax.send();
    }else{
        ajax.open('post',json.url,true)
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(json.data);
    }
    //4、数据库省略
    //5、响应数据
    ajax.onreadystatechange = function(){
        if(ajax.readyState ==4 && ajax.status==200){
            //请求成功

            json.success && json.success(ajax.responseText);
        }else{
            //请求失败
            json.error && json.error();

        }
    }
}