//名前
let plyName=prompt("名前を入力してください。");
plySt0.textContent=plyName;

let flag=true;

//プレイヤーデータ
let plyLv=1;
let plyHp=6;
let plyHpMax=6;
let plyAtt=1;
let plyHeel=1;
let plyExp=0;
let plyExpNext=5;
let plyExpNeed=[5,15,30,50,100,125,150,200,250,300,400,500,600,650,700,800,1000];
let plyImg=document.getElementById("plyImg");
let pS=new Array(7);
pS[plySt0,plySt1,plySt2,plySt3,plySt4,plySt5,plySt6];

//プレイヤー回復
plyImg.addEventListener("mousedown",()=> {
  if(flag){
    plyImg.src="img/playerC.png";
  }
});
plyImg.addEventListener("mouseup",()=> {
  if(flag){
    plyImg.src="img/playerA.png";
    plyHp+=plyHeel;
    if(plyHp>plyHpMax){
      plyHp=plyHpMax;
    }
    plySt2.textContent="HP:"+plyHp;
  }
});

//敵データ
let levCnt=0;
let eneLv=new Array(10);
eneLv=["1","5","15","30","40","50","60","70","80","100"];
let eneHp=10;
let eneCnt=5;
let eneName=new Array(10);
eneName=["スライム","コウモリ","ネズミ","ヘビ","イヌ","ゴブリン","おばけ","ゾンビ","火の玉","クマ"];
let eneHpMax=new Array(10);
eneHpMax=["10","15","30","40","80","100","130","150","100","500"];
let eneAtt=new Array(10);
eneAtt=["1","2","4","5","8","10","8","12","15","20"];
let eneKill=new Array(10);
let eneExp=new Array(10);
eneExp=[1,2,3,5,10,12,15,20,20,30];
let eneCntMax=new Array(10);
eneCntMax=["5","4","7","7","8","8","8","9","4","10"];
for(let i=0; i<10; i++){
  eneKill[i]=0;
}
let eneImg=document.getElementById("eneImg");
let eS=new Array(5);
eS[eneSt0,eneSt1,eneSt2,eneSt3,eneSt4];

//敵を攻撃
eneImg.addEventListener("mousedown",()=> {
  if(flag){
    eneImg.src="img/enemyB"+ levCnt +".png";
  }
});
eneImg.addEventListener("mouseup",()=> {
if(flag){
  eneImg.src="img/enemyA"+ levCnt +".png";
  if(eneHp>0){
    eneHp-=plyAtt;
    if(eneHp<0){
      eneHp=0;
    }
  }else{
    eneHp=eneHpMax[levCnt];
    eneKill[levCnt]++;
    eneSt4.textContent="倒した回数:"+eneKill[levCnt];

    //経験値の処理
    plyExp+=eneExp[levCnt];
    plySt5.textContent="経験値:"+plyExp;
    plyExpNext-=eneExp[levCnt];

    //レベルアップの処理
      if(plyExpNext==0){
        plyExpNext=plyExpNeed[plyLv];
        plyLv++;
        plySt1.textContent="レベル:"+plyLv;
        plyHpMax=plyLv*3+6;
        plyHp=plyHpMax;
        plySt2.textContent="HP:"+plyHp;
        plyAtt=plyLv*2;
        plySt3.textContent="攻撃力:"+plyAtt;
        plyHeel++;
        plySt4.textContent="回復魔法:"+plyHeel;
      }
    plySt6.textContent="次のレベルまでの経験値"+plyExpNext+"ポイント";
  }
  if(eneKill[9]==1){
    clearInterval(loop);
    flag=false;
    eneSec.textContent="ゲームクリア！！";
  }
  eneSt2.textContent="HP:"+eneHp;
}
});

//敵が時間ごとに攻撃
let eneSec=document.getElementById("eneSec");
let loop=setInterval(()=> {
  if(eneCnt > 0){
    eneCnt--;
    eneSec.textContent="モンスターの攻撃まで"+ eneCnt +"秒";
  }else{
    plyImg.src="img/playerB.png";
    plyHp-=eneAtt[levCnt];
    if(plyHp>0){
      plySt2.textContent="HP:"+plyHp;
      eneSec.textContent="モンスターの攻撃まで"+ eneCnt +"秒";
    }else{
    plyHp=0;
    clearInterval(loop);
    flag=false;
    plySt2.textContent="HP:"+plyHp;
    eneSec.textContent="ゲームオーバー"
    }
    setTimeout(()=> {
      if(flag){
        eneCnt=eneCntMax[levCnt];
         plyImg.src="img/playerA.png";
         eneSec.textContent="モンスターの攻撃まで"+ eneCnt +"秒";
      }
    },500);
  }
},1000);

//次のモンスター
let right=document.getElementById("right");
right.addEventListener("click",()=> {
  if(levCnt<9){
    levCnt++;
    eneSt0.textContent=eneName[levCnt];
    eneSt1.textContent="レベル:"+eneLv[levCnt];
    eneSt2.textContent="HP:"+eneHpMax[levCnt];
    eneSt3.textContent="攻撃力:"+eneAtt[levCnt];
    eneSt4.textContent="倒した回数:"+eneKill[levCnt];
    eneImg.src="img/enemyA"+ levCnt +".png";
    eneCnt=eneCntMax[levCnt];
  }else{
    flag=false;
  }
});

//逃げる
let left=document.getElementById("left");
left.addEventListener("click",()=> {
   if(levCnt>0){
    levCnt--;
    eneSt0.textContent=eneName[levCnt];
    eneSt2.textContent="HP:"+eneHpMax[levCnt];
    eneSt3.textContent="攻撃力:"+eneAtt[levCnt];
    eneSt4.textContent="倒した回数:"+eneKill[levCnt];
    eneImg.src="img/enemyA"+ levCnt +".png";
    eneCnt=eneCntMax[levCnt];
   }else{
     flag=false;
   }
});

//ゲームクリア
if(eneKill[levCnt]==1){
  clearInterval(loop);
  flag=false;
  eneSec.textContent="ゲームクリア";
}
