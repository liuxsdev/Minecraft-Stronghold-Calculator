

// p1={'x':100,'y':100,'theta':40}
// p2={'x':120,'y':110,'theta':50}
// p3={'x':130,'y':120,'theta':60}
// p4={'x':140,'y':130,'theta':70}

//The final result is:   x=41.897,z=175.536   r=23.290
//

function calc(P1,P2){
    x1=P1.x;x2=P2.x
    y1=P1.y;y2=P2.y
    theta1=P1.theta*Math.PI/180     //转化为弧度
    theta2=P2.theta*Math.PI/180     //转化为弧度
    s2c1=Math.sin(theta2)*Math.cos(theta1)
    s1c2=Math.sin(theta1)*Math.cos(theta2)
    s1s2=Math.sin(theta1)*Math.sin(theta2)
    c1c2=Math.cos(theta1)*Math.cos(theta2)
    s2m1=Math.sin(theta2-theta1)
    x=(x1*s2c1-x2*s1c2+(y1-y2)*s1s2)/s2m1
    y=(y2*s2c1-y1*s1c2-(x1-x2)*c1c2)/s2m1
    return {"x":x,"y":y}
}

function sqr(x){return x*x;}


function dis(p1,p2){
    return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2))
}

function incircle(O,P,R){
    if(dis(O,P)<=R){return true}
    return false
}

function solve(a,b,c,d,e,f){
    y=(f*a-c*d)/(b*d-e*a);
    x=(f*b-c*e)/(a*e-b*d);
    return {"x":x,"y":y};
}

function minCircle(PL) {
    var O={"x":0,"y":0}
    var R=0
    n=PL.length
    //var i,j,k
    for(var i=0;i<n;i++){
        if(!incircle(O,PL[i],R)){
            O.x=PL[i].x;
            O.y=PL[i].y;
            R=0;
            for(var j=0;j<i;j++){
                if(!incircle(O,PL[j],R)){
                    O.x=(PL[i].x+PL[j].x)/2;
                    O.y=(PL[i].y+PL[j].y)/2;
                    R=dis(O,PL[i])
                    for(var k=0;k<j;k++){
                        if(!incircle(O,PL[k],R)){
                            a=PL[i].x-PL[j].x
                            b=PL[i].y-PL[j].y
                            c=(sqr(PL[j].x)+sqr(PL[j].y)-sqr(PL[i].x)-sqr(PL[i].y))/2,
                            d=PL[i].x-PL[k].x,
                            e=PL[i].y-PL[k].y,
                            f=(sqr(PL[k].x)+sqr(PL[k].y)-sqr(PL[i].x)-sqr(PL[i].y))/2 
                            O=solve(a,b,c,d,e,f)
                            R=dis(O,PL[i])
                        }
                    }
                }
            }

        }
    }
    O.r=R
    return O
    
}


function StrongholdFind(PontList){
    cp=[];
    for(var i = 0, len1 = PontList.length; i < len1; i++) {
        var a2 = PontList.concat();
        a2.splice(0, i + 1);
        for(var j = 0, len2 = a2.length; j < len2; j++) {
            cp.push(calc(PontList[i],a2[j]))
        }
    }
    return minCircle(cp)

}




