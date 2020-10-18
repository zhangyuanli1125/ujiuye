window.onload=function(){
    var content1_left=document.getElementsByClassName('content1_left')[0]
    var input=content1_left.getElementsByTagName('input')
    var p=content1_left.getElementsByTagName('p')
    var input=content1_left.getElementsByTagName('input') 
    var form=document.getElementsByTagName('form')[0]
    var reg=/^1[(3||5||8||7)]\d{9}/
    var reg1=/^[A-Z]([a-z]||[0-9]){5,11}/ 

    var name=form.username
    var pass=form.userpass
    var apass=form.apass 
    var yanzhengma=form.yanzhengma
    var duanxin=form.duanxin
    var btn=form.getElementsByTagName('button')[0]
    var img=content1_left.getElementsByTagName("img")[0]
    var input=form.getElementsByTagName('input')
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
    // 导航
    var str=''
    var str1=''
  var nav_left=document.getElementById('nav_left')
  var nav=document.getElementsByTagName('nav')[0]
  function navleft(data){
      var arr=JSON.parse(data)
       var html=template('navleft',arr.navdata)
        nav_left.innerHTML=html
        console.log(html)
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
    var suiji=null
    createAjax(
        {
            'type':'get',
            'url':'data.json',
            "success":function(data){
              showimg(data)             
            }
        }
    ) 
    // 验证码随机
    
    function showimg(data){ 
           var arr=JSON.parse(data) 
           if(window.onload ){
            suiji=arr.showimgsrc[Math.floor(Math.random()*(arr.showimgsrc.length))]
            img.src=suiji.imgsrc   
           }
        img.onclick=function(){
             suiji=arr.showimgsrc[Math.floor(Math.random()*(arr.showimgsrc.length))]
            img.src=suiji.imgsrc   
        }
    } 
    // 提交事件
      form.onsubmit=function(){
           for(var i=0;i<input.length;i++){
               if(input[i].value==''){
                   return false
               }
               if(name.value.match(reg)==null){
                return false
               }
               if(pass.value.match(reg1)==null){
                return false
               }
               if(apass.value!=pass.value){
                return false
               }
               if(yanzhengma.value.match(reg2)==null){
                return false
               }

           }


      }
   
       
       
    //   手机
        name.onblur=function(){
            var last= this.parentNode.lastElementChild|| this.parentNode.lastChild
            if(name.value==''){
                last.innerText= this.placeholder+'  !' 
                last.style.color='#999999' 
                return false
            }else  if(name.value.match(reg)==null){
                last.innerText='账号格式不正确 !'
                last.style.color='orange' 
                this.value=''
                return false
            }else{
                last.innerText='已在图书商城注册，请直接登录'
                last.style.color='orange'                    
            }
        }
       //    密码 
         pass.onblur=function(){
            var last= this.parentNode.lastElementChild|| this.parentNode.lastChild
            if(pass.value==''){
                last.innerText= this.placeholder+'  !' 
                last.style.color='#999999' 
                return false
            }else   if(pass.value.match(reg1)==null){
                last.innerText='密码格式错误 ！ '
                last.style.color='orange'
                this.value=''
            } else{
                last.innerText='√'
                last.style.color='orange'
            }
         }
        //  再次确认
         apass.onblur=function(){
            var last= this.parentNode.lastElementChild|| this.parentNode.lastChild
            if(apass.value==''){
                last.innerText= this.placeholder+'  !' 
                last.style.color='#999999' 
                return false
            }else  if(apass.value!=pass.value){
                last.innerText='两次密码不一致！ '
                last.style.color='orange'
                this.value=''
            } else  {
                last.innerText='√'
                last.style.color='orange'
            }
         }
        //  验证
         yanzhengma.onblur=function(){
            var last= this.parentNode.lastElementChild|| this.parentNode.lastChild
            if(yanzhengma.value==''){
                last.innerText= this.placeholder+'  !' 
                last.style.color='#999999' 
                return false
            }else if(yanzhengma.value !=suiji.num){
                alert('验证码错误')
                yanzhengma.value =''
                last.innerText=''
             }else{
                last.innerText='√'
                last.style.color='orange'
             }
         }
        //  短信
          duanxin.onblur=function(){
            var last= this.parentNode.lastElementChild|| this.parentNode.lastChild
            if(duanxin.value==''){
                last.innerText= this.placeholder+'  !' 
                last.style.color='#999999' 
                return false
            }else if(duanxin.value!=''){ 
                last.innerText='√'
                last.style.color='orange'
            }  
          } 
           
        }
     
       
  