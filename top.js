const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d")


const cizimAlanı = (x,y,w,h,color) => {
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)

}

const daireCizimi = (x,y,r,color)=>{
ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x,y,r,0,2*Math.PI,false)
    ctx.closePath()
    ctx.fill();
}  

const daireCizimiS = (x,y,r,color)=>{
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = '7'
    ctx.arc(x,y,r,0,2*Math.PI)
    ctx.closePath()
    ctx.stroke();
}   
const yaziCizim = (text,x,y,color)=>{
    ctx.fillStyle=color
    ctx.font = '50px sans-serif'
    ctx.fillText(text,x,y)

}

const User = {
x:canvas.width/2 -50,
y:canvas.height -30,

w:100,
h:10,
color: '#fff',
score:0


} 

const com = {
x:canvas.width/2 -50,
y: 20,
w:100,
h:10,
color: '#fff',
score:0


} 


const ball={
x:canvas.width/2,
y:canvas.height/2,
r:13,
color:'#537b35',
speed:5,
velocityX:3,
velocityY:4,
stop:true,





}



const movePaddle= (e) => {

let rect = canvas.getBoundingClientRect()
User.x = e.clientX - rect.x - User.w/2



}
canvas.addEventListener("mousemove",movePaddle)



const collision = (b,p) => {

    b.top = b.y - b.r
    b.bottom = b.y +b.r
    b.left = b.x- b.r
    b.right = b.x + b.r


    p.top = p.y 
    p.bottom = p.y + p.h
    p.left = p.x 
    p.right = p.x + p.w
    

/*
b.top = b.x - b.r
    b.bottom = b.x +b.r
    b.left = b.y - b.r
    b.right = b.y + b.r


    p.top = p.x 
    p.bottom = p.x + p.h
    p.left = p.y
    p.right = p.y +p.w
*/
    return (b.top < p.bottom && b.top > p.bottom && b.left < p.right && b.left > p.right )
     
}


const update = ()=>{

    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;


if(ball.y + ball.r  > canvas.height|| ball.y - ball.r  < 0 ){
    ball.velocityY =-ball.velocityY
}
 if(ball.x + ball.r  > canvas.width || ball.x - ball.r  < 0){
            ball.velocityX =- ball.velocityX
}




let comLvl = 0.1
com.x+=(ball.x-(com.x+com.w/2)) * comLvl;

let player = (ball.y < canvas.height/2) ? User : com;
if ( collision(ball,player))
ball.velocityY = -ball.velocityY


}




const render= ()=>{

cizimAlanı(0,0,canvas.width,canvas.height,'#33FFBD');
cizimAlanı(0 ,canvas.height/2 -2,canvas.height,4,'#fff');
daireCizimi(canvas.width/2,canvas.height/2,7,'#fff');
daireCizimiS(canvas.width/2,canvas.height/2,50,'#fff');
yaziCizim(User.score,canvas.width/10 ,canvas.height -15,'#fff');
yaziCizim(com.score,canvas.width/10 ,60,'#fff');

cizimAlanı(com.x,com.y,com.w,com.h,com.color);
cizimAlanı(User.x,User.y,User.w,User.h,User.color);
daireCizimi(ball.x,ball.y,ball.r,ball.color);



}




const _game=()=>{
render();
update();
 



}


const fps=50;

setInterval(_game,1000/fps) 
