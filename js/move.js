
function move(obj,attr,step,end){
    clearInterval(obj.timer)
    var step=end>parseInt(getStyle(obj,attr))?step:-step
    obj.timer=setInterval(function(){
        var value=parseInt(getStyle(obj,attr))+step
        if((value>end&&step>0)||(value<end&&step<0)){
            value=end
        }
        if(value==end){
            clearInterval(obj.timer)
        }
        obj.style[attr]=value+'px'
    },100)
}
function getStyle(obj,attr){
    if(getComputedStyle){
        return getComputedStyle(obj)[attr]
    }else{
        return obj.currentStyle[attr]
    }
}