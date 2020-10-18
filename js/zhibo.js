window.onload=function(){
 

  // 视频
  var cont_left=document.getElementsByClassName('cont_left')[0]
  var section=document.getElementsByTagName('section')[0]

 var imgsrc= ["./image/zg_shipin01.png","./image/zg_shipin01_h.png"]
 createAjax({
   "type":"get",
   "url":"data.json",
   "success":function(data){
     show(data)
       show1(data)
      navleft(data)
      navright(data)
      hover()
      showimg(data)
   }
 })
//  导航
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
 function show(data){
   var arr=JSON.parse(data)
   // arr.videodata.data.sort(function(a,b){
   //    var a1=a.time.substring(1,6).split(':').join('')
   //    var b1= b.time.substring(1,6).split(':').join('')
   //    return a1-b1
   // })
   var html=template("video",arr.videodata)
   section.innerHTML=html
  var right_sec=section.getElementsByClassName("right_sec")[0]
 var left_sec=section.getElementsByClassName('left_sec')[0]
 var kejian=left_sec.getElementsByClassName('kejian')[0]
 var li=right_sec.getElementsByTagName('li')
 var img=right_sec.getElementsByTagName('img')
 var a=right_sec.getElementsByClassName('biaoti')
 kejian.innerText= arr.videodata.data[0].title
var span=right_sec.getElementsByClassName('xu')
for(var i=0;i<span.length;i++){
   span[i].index=i
    span[i].innerHTML='0'+(i+1)
}
// 视频点击 

var video=document.getElementsByTagName("video")[0]
var play=document.getElementsByClassName('play')[0]
var contr=document.getElementsByClassName('contorls')[0]
var start=document.getElementById('start')
var cur=document.getElementsByClassName('cur')[0]
var bg=document.getElementsByClassName('bg')[0]
var huadong=document.getElementsByClassName('huadong')[0]
var tiao=document.getElementsByClassName('tiao')[0]
var time=document.getElementsByClassName('time')[0]
var quanping=document.getElementsByClassName('quanping')[0]
var btn=document.getElementsByClassName('btn')[0]
var box1=document.getElementsByClassName('box1')[0]
var str2=''
 for(var i=0;i<li.length;i++){
    li[i].index=i
   li[i].onclick=function(){
        for(var j=0;j<li.length;j++){
         img[j].src=imgsrc[0]
         a[j].style.color='#9e9e9e'
         li[j].style.color="#9e9e9e"
        
        }
        kejian.innerText="课件"+(this.index+1)+arr.videodata.data[this.index].title
        this.style.color="orangered"
        a[this.index].style.color="orangered"
        img[this.index].src=imgsrc[1]
        box1.style.display='block'
        video.src=arr.videoData[this.index]

        quanping.onclick=function(){
          if(video.requestFullscreen){
            video.requestFullscreen()
          }
        }
        video.oncanplay=function(){
          time.innerText=Time(this.duration)
        }
        function Time(date){
          var hours=padtime(parseInt(date/3600))
          var min=padtime(parseInt(date%3600/60))
          var s=padtime(parseInt(date%60))
          str2=hours+":"+min+":"+s
          return str2
        }
        function padtime(value){
          return value<10?"0"+value:value
       
        }
        var tag=true
         start.onclick=function(){
           if(tag){
             video.play()
             start.className="zan"
             tag=false
           }else{
             video.pause()
             start.className="bo"
             tag=true
           }
        
         }
         video.ontimeupdate=function(){
           huadong.style.width='0px'
           btn.style.left='0px'
           cur.innerText=Time(video.currentTime)
           btn.style.left=video.currentTime*460/video.duration+'px'
           huadong.style.width=video.currentTime*460/video.duration+'px'
         }
   }
 }


    



}
// 图文部分
function show1(data){
  var arr=JSON.parse(data)
  var html=template("tuwen",arr.tuwendata)
  cont_left.innerHTML=html
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
//  评论
var fabu=document.getElementsByClassName('fabu')[0]
var text=document.getElementsByTagName('textarea')[0]
var wu=document.getElementsByClassName('wu')[0]
var bao=document.getElementsByClassName('bao')[0]
var shu=document.getElementsByClassName('shu')[0]
var zs=document.getElementsByClassName('zs')[0]
var reg=/\w{1,200}/
var str=''
var n=0
var str1=''
fabu.onclick=function(){
    if(text.value.length>0 && text.value.length<200){
      wu.style.display='none'   
      str ="<div class='nei'><div class='left_p'><img src='./image/nim2.jpg' alt=''><div></p><span>珂Jessica</span><span class='xin'></span></p><p>"+text.value+"<span class='nowt'></span></p></div></div><button><a href='#'></a>删除</button></div>"
      shu.innerText=parseInt(shu.innerText)+1
      zs.innerText=parseInt(zs.innerText)+1
      
    }else{
      alert("评论字数不能超过200字")
    }
   bao.innerHTML+=str 
//    var nowt=document.getElementsByTagName('nowt')[0]
// var now=new Date()
// var year=now.getFullYear()
// var mou=now.getMonth()+1
// var ri=now.getDate()
//  str1=year+'-'+mou+'-'+ri
//  nowt.innerHTML=str1
//  console.log(nowt)
   text.value=''
    var btn=bao.getElementsByTagName('button')
   for(var i=0;i<btn.length;i++){ 
      btn[i].onclick=function(){
       this.parentNode.remove()
       shu.innerText=parseInt(shu.innerText)-1
       zs.innerText=parseInt(zs.innerText)-1
   }
   }
  
}



 

}