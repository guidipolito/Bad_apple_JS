var canv = document.getElementById("video");
var ctx = canv.getContext("2d");
var video = document.getElementById("videoBase");
var main = document.getElementById("mainPlayer");
var btn = document.getElementById("btn");
var pause = false, played=false; //verificações para os botões

//cria as checkboxs
for( i=0; i<56; i++){
	for(i2=0; i2<75; i2++){
		main.innerHTML+='<input type="checkbox" id="'+i+'-'+i2+'"/>';
	}
	main.innerHTML+='<br>';
}


function desenhar(){
	ctx.drawImage(video, 0, 0, canv.width, canv.height);//Desenha o frame do video no canvas
	var x=0, y=0;
		for(i=0; i<56; i++){
			for(i2=0; i2<75; i2++){
				image = ctx.getImageData(x,y,1,1);//pega o valor do frame(a cada 2 frames)
				x+=2;
				if(image.data[0]<=80 && image.data[1]<=80 && image.data[2]<=80){//verifica se é proximo a preto e se for marca a checkbox respectiva
					document.getElementById(i+'-'+i2).checked = true;
				}else{

					document.getElementById(i+'-'+i2).checked = false;
				}
			}
			x=0;
			y+=2;
		}
	if(pause==false){
	setTimeout(desenhar, 1000 / 30);//define a taxa que vai atualizar, muito embora eu não tenha conseguido executar nesse time
	}
}
function btn_active(){
	if(played==false){//se não tiver rodado já, bota pra rodar
		btn.innerHTML="Pause";
		desenhar();
		video.play();
		played=true;
	}else if(pause==false){//se ja tá rodando mas n pausado ele pausa
		pause=true;
		video.pause();
		btn.innerHTML="Resume";
	}else{//se ta pausado ele volta
		pause=false;
		video.play();
		btn.innerHTML="Pause";
		desenhar();
	}
}//simples
