window.onload=function(){
    var form=document.getElementsByTagName('form')[0]
  
    var reg=/^1[(3||5||8||7)]\d{9}/
    var reg1=/^[A-Z]([a-z]||[0-9]){5,11}/ 
    var tel=form.tel
    var pass=form.pass
    var btn=form.getElementsByTagName('button')[0]
    createAjax(
        {
            'type':'get',
            'url':'data.json',
            "success":function(data){
                var arr=JSON.parse(data)
                navleft(data)
                navright(data)
                hover()
            }
        }
    )
    var str=''
    var str1=''
  var nav_left=document.getElementById('nav_left')
var nav=document.getElementsByTagName('nav')[0]
  function navleft(data){
      var arr=JSON.parse(data)
       var html=template('navleft',arr.navdata)
        nav_left.innerHTML=html
        var li=nav_left.getElementsByTagName('li')  
        for(var i=0;i<arr.navdata.data.length;i++){
                    (function(index){
                    if(arr.navdata.data[index].child){
                            var div=document.createElement('div')
                            var child=arr.navdata.data[index].child
                            for(var j=0;j<child.length;j++){ 
                                if(child[j].imgsrc){
                                    var img=document.createElement('img')
                                    img.src=child[j].imgsrc
                                    div.appendChild(img)
                                        }
                                    if(child[j].title){
                                        var span=document.createElement('span')
                                            span.innerText=child[j].title
                                            div.className='div1'
                                            div.appendChild(span)
                                        }

                                li[index].appendChild(div)      
                        }  
                    }
                    })(i)
                }
}
var right=document.getElementsByClassName('right')[0]
function navright(data){
     var arr=JSON.parse(data)
     var html=template("nright",arr.navdata1)
     right.innerHTML=html
     var li=right.getElementsByTagName('li')  
     var data=arr.navdata1.data
     for(var i=0;i<data.length;i++){
         data[i].index=i
        if(data[i].name){
          var span=document.createElement('span')
          span.className=data[i].name
          var li=document.createElement('li')
         
          li.appendChild(span)
          right.appendChild(li)
        }
        if(data[i].title){
            var span=document.createElement('span')
            span.innerHTML=data[i].title
            var li=document.createElement('li')
            li.appendChild(span)
            right.appendChild(li)
          }
          if(data[i].child){
              var div=document.createElement('div')
              for(var j=0;j<data[i].child.length;j++){
                if( data[i].child[j]){
                    var div1=document.createElement('div')
                    if( data[i].child[j].imgsrc){
                        var img=document.createElement('img')
                        img.src=data[i].child[j].imgsrc
                        div1.appendChild(img)
                    }
                    if( data[i].child[j].title){
                        var span1=document.createElement('span')
                        span1.innerText=data[i].child[j].title
                        div1.appendChild(span1)
                    }
                }
                div.className='div1'
                div.appendChild(div1)
              }
               li.appendChild(div)
          } 
     }
}

function hover(){
    var li=nav.getElementsByTagName('li')  
for(var i=0;i<li.length;i++){
     (function(index){
                li[i].onmouseover=function(){
                    for(var j=0;j<li.length;j++){
                        li[j].className='none'
                    }
                this.className='hover'
                 var last=this.lastElementChild||this.lastChild
                 if(last.className=='div1'){
                     last.style.display='flex'
                 }
             }
            })(i)
            li[i].onmouseleave=function(){
                var last=this.lastElementChild||this.lastChild
                if(last.className=='div1'){
                    last.style.display='none'
                }
            }
}
}
    // 表单提交
    btn.onclick=function(){
        var last= tel.parentNode.lastElementChild|| tel.parentNode.lastChild
        if(tel.value.match(reg)==null || tel.value==''){
            last.innerText='账号格式错误' 
            last.style.color='orange' 
            tel.value=''
           
        }else if(pass.value==''){  
            last.innerText='请输入密码！' 
            last.style.color='orange' 
          
        }else   if(pass.value.match(reg1)==null){  
            last.innerText='密码格式错误！' 
            last.style.color='orange' 
            pass.value=''
        }else{
              createAjax({
            "type":"get",
            "url":"data.json",
            "success":function(data){
              show(data)
            }
        })
       function show(data){
        var arr=JSON.parse(data)
        var str=JSON.stringify(arr.yanzheng)
        localStorage.arr=str 
        var data=JSON.parse(localStorage.arr)
        var tag=false 
         for(var i=0;i<data.length;i++){ 
             if(data[i].tel==tel.value && data[i].pass==pass.value){
                 tag=true 
                 break
             }
             }
         if(tag==true){
             form.submit()
             alert('登录成功')
         }else{
            var last= tel.parentNode.lastElementChild|| this.parentNode.lastChild
            last.innerText='账号或密码错误' 
            last.style.color='orange' 
            pass.value=''
            tel.value=''
         }
   
      }
 
          
        }
        
    // 账号密码匹配   
    
            

      
    }   
        
}
