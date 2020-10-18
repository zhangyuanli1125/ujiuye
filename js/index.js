window.onload=function(){
    // 轮播图
    var free=document.getElementsByClassName('free')[0]
    var online_wrap=document.getElementsByClassName('online_wrap')[0]
    var work=document.getElementsByClassName('work')[0]
    var lianjieData=document.getElementsByClassName('lianjieData')[0]
    var str=''
    var str1=''
    var timer=null
    var n=0
    createAjax(
        {
            'type':'get',
            'url':'data.json',
            "success":function(data){
                var arr=JSON.parse(data)
                show(data)
                showzhibo(data)
                showOnline("online",arr.onlineLesson,online_wrap)
                showOnline("free",arr.freeData,free)
                showOnline('work',arr.workData,work)
                showlink(data)
                showimg(data)
                navleft(data)
                navright(data)
                hover()
               showaside(data)
            }
        }
    )
    // 导航

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
    var li=right.getElementsByTagName('li') 
    function navright(data){
         var arr=JSON.parse(data)
         var html=template("nright",arr.navdata1)
         right.innerHTML=html
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
    var str=''
    function hover(){
        var li=nav.getElementsByTagName('li') 
        var li1=right.getElementsByTagName('li')
        var st=li1[5].innerHTML 
       
    for(var i=0;i<li.length;i++){
         (function(index){
                    li[i].onmouseenter=function(){
                        for(var j=0;j<li.length;j++){
                            li[j].className='none'
                        }
                    this.className='hover ac'
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
                    this.className=''
                }
        //   li1[5].onmouseover=function(){
        //   str="<input type='text' placeholder='搜索课程'>"
        //    li1[5].innerHTML=str
        //   }
     
    }
    // document.onclick=function(){ 
    //     li1[5].innerHTML="<li>"+st+"</li>"
       
    // }        
  
 }
     
    // 轮播
  
  var dian=document.getElementsByClassName('dian')[0]
  var jiantou=document.getElementsByClassName('jiantou')
  var span=dian.getElementsByTagName('span')
  var lunboul=document.getElementsByClassName('lunbo')[0]
  var box=document.getElementsByClassName('box')[0]
    function show(data){
        // 写入图片和小圆点
       var arr=JSON.parse(data)
      var html=template('lun',arr.banner)
      lunboul.innerHTML=html
     for(var i=0;i<arr.banner.data.length;i++){
            str1+="<span></span>"
            } 
            dian.innerHTML=str1 
            span[0].className='active'
            for(var i=0;i<span.length;i++){
                (function(index){
                    span[i].onclick=function(){
                        for(var j=0;j<span.length;j++){
                            span[j].className=''
                        }
                        this.className='active'
                        move(lunboul,'left',600,-1920*(index))
                        n=index
                     }
                })(i)
            }
            //  定时器自动轮播
            timer=setInterval(show1,3000)
            function show1(){
            fn()
            }
            //  鼠标移入
            box.onmouseover=function(){
                clearInterval(timer)
                jiantou[0].style.display='block'
                jiantou[1].style.display='block'
                //  点击左箭头图片显示上一张
                jiantou[0].onclick=function(){
                    n--
                    if(n<0){
                        n=arr.banner.data.length-1
                    }
                    for(var i=0;i<span.length;i++){
                        span[i].className=''
                    }
                    span[n].className='active'
                move(lunboul,'left',600,-1920*n)
        
                }
                    //  点击右箭头图片显示下一张
                jiantou[1].onclick=function(){
                    fn()
                }
            }
            function fn(){
                    n++
                    if(n==arr.banner.data.length){
                        n=0
                    }
                    for(var i=0;i<span.length;i++){
                    span[i].className=''
                }
                span[n].className='active'
                move(lunboul,'left',600,-1920*n)
            }
            //  鼠标移出
            box.onmouseout=function(){
                timer=setInterval(show1,3000)
                jiantou[0].style.display='none'
                jiantou[1].style.display='none'
              }
        } 
        // 直播
       var zhibo_box=document.getElementsByClassName("zhibo_box")[0]
       function showzhibo(data){
            var arr=JSON.parse(data) 
            var html=template('zhibo',arr.zhibo)
            zhibo_box.innerHTML=html
             var zhibo_left=document.getElementsByClassName('zhibo_left')[0]
            var zhibo_right=document.getElementsByClassName('zhibo_right')[0]
             var zhibo_div=zhibo_left.getElementsByClassName('div')
             var zhibo_right=zhibo_box.getElementsByClassName("zhibo_right")[0]
             var imgsrc1=["../image/ujyx_19.png","../image/ujyx_18.gif"]
            var li=zhibo_right.getElementsByTagName('li')
            var img1=zhibo_right.getElementsByTagName('img')
            zhibo_div[0].style.display='block'
             var time=zhibo_right.getElementsByClassName("time")
             var str=''
            // for(var i=0;i<time.length;i++){
            //     (function(index){
            //          var span=time[index].getElementsByTagName('span')
            //          var inner=li[index].getElementsByClassName('time')[0]
            //          str=inner.innerText
            //        timer=setInterval(showtime,1000)
            //            function showtime(){
            //         var  date=new Date(str)
            //         var time1=date.getTime()
            //             var now=new Date()
            //             var now1=now.getTime() 
            //             if(time1>=now1){
            //              img1[index].src=imgsrc1[0]
            //             }else if(time1<now1<time1+3600){
            //                 img1[index].src=imgsrc1[1]
            //                 time[index].innerHTML='正在直播'
            //                 time[index].style.color='orangered'
            //             } 
                                        
            //            }
                      
              
            //     })(i)
              
            // }
            for(var i=0;i<li.length;i++){
                  (function(index1){
                 li[index1].onmouseover=function(){
                     clearInterval(timer)
                 for(var j=0;j<zhibo_div.length;j++){
                            zhibo_div[j].style.display='none'
                         } 
                         zhibo_div[index1].style.display='block'
                         var wei=zhibo_div[index1].getElementsByClassName('wei')[0]
                         var span1=wei.getElementsByTagName('span')[0]
                         var inner=this.getElementsByClassName('time')[0]
                         str=inner.innerText
                       var img2=wei.getElementsByTagName('img')[0]
                      var  date=new Date(str)
                    var time1=date.getTime()
                         var now=new Date()
                         var now1=now.getTime() 
                       
                         if(time1>=now1){
                            img2.src=imgsrc1[0]
                              span1.innerText='未开始'
                         }else if(time1<now1 && now<(time1+3600)){
                             img2.src=imgsrc1[1]
                             span1.innerHTML='正在直播'
                            time[index1].innerHTML='正在直播'
                            time[index1].style.color='orangered'
                           
                         }else{
                            span1.innerText='已结束'
                             img2.src=imgsrc1[0]

                         }
                         
              
                }
                li[index1].onmouseout=function(){
        
                }
           
            })(i) 
           
        }
      
    }
        
     


    // 线上网课 免费课程 就业面授
    function showOnline(idname,dataAdress,who){
        // var html=template("online",arr.onlineLesson)
        var html=template(idname,dataAdress)
        who.innerHTML=html
        var online_box=who.getElementsByTagName('div')
        var online=who.getElementsByClassName('online')[0]
        var h2=online.getElementsByTagName('h2')[0]
        var li=online.getElementsByTagName('li')
        online_box[0].className = " active1";
        for(var i=0;i<li.length;i++){
            (function(index){
                 li[i].onmouseover=function(){
                     for(var j=0;j<li.length;j++){
                        online_box[j].className=''
                       online_box[j+1].className=''
                       li[j].className=''
                     }
                online_box[index+1].className =" active1"
                this.className='hover'
              }
            })(i)
        }
         h2.onmouseover=function(){
            for(var j=0;j<li.length;j++){
                online_box[j].className=''
                online_box[j+1].className=''
                li[j].className=''
             }
            online_box[0].className = " active1";
        }
    }
    // IT培训 友情链接
      function showlink(data){
          var arr=JSON.parse(data)
          var html=template("lianjie",arr.linkData)
          var li=lianjieData.getElementsByTagName('li')
          var div=lianjieData.getElementsByTagName('div')
        
          lianjieData.innerHTML=html
           div[0].style.display='block'
          for(var i=0;i<li.length;i++){
              (function(index){
                 li[i].onmouseover=function(){
                     for(var j=0;j<li.length;j++){
                         div[j].style.display='none'
                         li[j].className='none'
                     }
                      div[index].style.display='block'
                      this.className="active"
                }
              })(i)
                
          }
      }
    //   侧边 微信 qq 微博
    var showtu=document.getElementsByClassName('showtu')
    var img=document.getElementsByClassName('aside')[0].getElementsByTagName('div')[0].getElementsByClassName('tupian')
     function showimg(data){
         var arr=JSON.parse(data)
   for(var i=0;i<img.length;i++){
      (function(index){
       
            img[i].onmouseover=function(){
                var last=this.parentNode.lastElementChild||this.parentNode.lastChild
             if(last.className=='showtu'){
                 for(var j=0;j<showtu.length;j++){
                     showtu[j].style.display='none'
                 }
                      showtu[index].style.display='flex' 
             }
                for(var j=0;j<img.length;j++){
                    img[j].src=arr.img.data1[j]
                }
             this.src=arr.img.data[index]
           
         }
         img[i].onmouseout=function(){
            for(var j=0;j<img.length;j++){
                img[j].src=arr.img.data1[j]
            }
            var last=this.parentNode.lastElementChild||this.parentNode.lastChild
            if(last.className=='showtu'){
                for(var j=0;j<showtu.length;j++){
                    showtu[j].style.display='none'
                }
            }
     }   
       })(i)
        
     }
     
     }
    // 置顶
    window.onscroll=function(){
       var st=document.documentElement.scrollTop||document.body.scrollTop
        if(st>=800){
            img[3].style.display='block'
            img[3].onclick=function(){
                   document.documentElement.scrollTop=0
                   document.body.scrollTop=0
        }
        }else{
            img[3].style.display='none'
        }
        
      }

var asideD=document.getElementsByClassName('asideData')[0]
function showaside(data){
    var arr=JSON.parse(data)
    var html=template('aside',arr.sideData)
    asideD.innerHTML=html

}
// var asideD=document.getElementsByClassName('asideData')[0]
// var html=template('aside',sideData)
// asideD.innerHTML=html

    }
    
    