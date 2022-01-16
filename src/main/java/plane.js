;window.onload=function(){
    //��ȡ��ǩԪ�صķ���
    function $(idName) {
        return document.getElementById(idName);
    }

    var game = $("game")
    //��Ϸ��ʼ�Ľ���
    , gameStart = $("gameStart")
    ,gameEnter = $("gameEnter")
    ,myPlane = $("myPlane")
    ,bulletsP = $("bullets")
    ,enemysP = $("enemys")

function getStyle(ele, attr) {
    var res = null;
    if(ele.currentStyle) {
        res = ele.currentStyle[attr];
    } else {
        res = window.getComputedStyle(ele, null)[attr];
    }
    return parseFloat(res);
}

    var gameW = getStyle(game, "width")
    ,gameH = getStyle(game, "height")

    var gameML = getStyle(game, "marginLeft");
    var gameMT  = getStyle(game, "marginTop");


    var myPlaneW = getStyle(myPlane, "width")
    , myPlaneH  = getStyle(myPlane, "height");

    var bulletW = 6
    , bulletH = 14;
    var gameStatus = false,
    a = null,
    b = null,
    c = null,
    backgroundPY = 0, //����ͼY���ֵ
    bullets=[],
    enemys=[];
    //��ʼ��Ϸ
    gameStart.firstElementChild.onclick = function() {
        gameStart.style.display = "none";
        gameEnter.style.display = "block";
        document.onkeyup = function(evt) {
        var e = evt || window.event;
        var keyVal = e.keyCode;
        if(keyVal == 32) {
            if(!gameStatus) {
                this.onmousemove = myPlaneMove;

                bgMove();
                //ʵ�����
                shot();
                //
                appearEnemy();

                if(bullets.length !=0) restart(bullets, 1);
                if(enemys.length != 0) restart(enemys);
            } else {
                this.onmousemove = null;
                //����diji
                clearInterval(a);
                clearInterval(b);
                clearInterval(c);
                a = null;
                b = null;
                c = null;
                clear(bullets);
                clear(enemys);
            }
            gameStatus = !gameStatus;
        }
        }
    }



        function myPlaneMove(evt) {
        var e = evt || window.event;
        var mouse_x = e.x || e.pagex
        , mouse_y = e.y || e.pageY;

        var last_myPlane_left =  mouse_x - gameML - myPlaneW/2;
        var last_myPlane_top =  mouse_y - gameMT - myPlaneH/2;

        if(last_myPlane_left <= 0) {
            last_myPlane_left = 0;
        } else if (last_myPlane_left >= gameW -myPlaneW ) {
            last_myPlane_left = gameW - myPlaneW;
        }


		if(last_myPlane_top <= 0){
			last_myPlane_top = 0;
		}else if(last_myPlane_top >= gameH - myPlaneH){
			last_myPlane_top = gameH - myPlaneH;
		}

        myPlane.style.left = last_myPlane_left + "px";
        myPlane.style.top = last_myPlane_top + "px";
        }

    function shot() {
        if(a) return;
        a = setInterval(function() {
        //�����ӵ�
        createBullet();
        },100)
    }
    function createBullet() {
        var bullet = new Image(bulletW, bulletH);
        bullet.src = "image/bullet1.png";
        bullet.className = "b";
        //ȷ�������ӵ���λ��
        //c����ÿһ���ӵ�������Ҫȷ�������ɻ���λ��
        var myPlaneL = getStyle(myPlane, "left")
        , myPlaneT = getStyle(myPlane, "top");

        var bulletL = myPlaneL + myPlaneW/2 - bulletW/2;
        var bulletT = myPlaneT - bulletH;
        bullet.style.left = bulletL + "px";
        bullet.style.top = bulletT + "px";

        bulletsP.appendChild(bullet);
        bullets.push(bullet);
        move(bullet, "top");
    }
    //�ӵ����˶� �˶�����
    function move(ele, attr) {
        var speed = -8;
        ele.timer = setInterval(function() {
            var moveVal = getStyle(ele, attr);
            // �ӵ��˶�����Ϸ���棺����ӵ��Ķ�ʱ����ɾ���ӵ�Ԫ��
            if(moveVal <= -bulletH) {
                clearInterval(ele.timer)
                ele.parentNode.removeChild(ele);
                bullets.splice(0,1);
            } else {
                ele.style[attr] = moveVal + speed + "px";
            }
        }, 10);
    }

    var enemysObj = {
    enemy1: {
        width: 34,
        height: 24,
        score: 100,
        hp: 100
    },
    enemy2: {
        width: 46,
        height: 60,
        score: 500,
        hp: 500
    },
    enemy3: {
            width: 110,
            height: 164,
            score: 1000,
            hp: 1000
        }
    }

    function appearEnemy() {
        if(b) return;
        b = setInterval(function() {
        //����л�
            createEnemy()
        }, 1000)
    }

    function createEnemy() {
        var percentData = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,3];
        var enemyType = percentData[Math.floor(Math.random() * percentData.length)];
        var enemyData = enemysObj["enemy" + enemyType]
        var enemy = new Image(enemyData.width, enemyData.height );
        enemy.src = "image/enemy" + enemyType + ".png";
        enemy.t = enemyType;
        enemy.score = enemyData.score;
        enemy.hp = enemyData.hp;
        enemy.className = "e";

        //ȷ��diji���ֵ�λ��

        var enemyL = Math.floor(Math.random() * (gameW - enemyData.width +1))
        , enemyT = -enemyData.height;
        enemy.style.left = enemyL + "px";
        enemy.style.top = enemyT + "px";
        enemysP.appendChild(enemy);
        enemys.push(enemy);
        enemyMove(enemy, "marginTop")
    }

    //diji���˶�
    function enemyMove(ele, attr) {
        var speed = null;
        if(ele.t == 1) {
            speed = 1.5;
        } else if (ele.t ==2 ) {
            speed = 1;
        } else if (ele.t == 3) {
            speed = 0.5;
        }
        ele.timer = setInterval(function() {
            var moveVal = getStyle(ele, attr);
            if(moveVal >= gameH) {
                clearInterval(ele.timer);
                enemysP.removeChild(ele);
                enemys.unshift();
            } else {
                ele.style[attr] = moveVal + speed + "px";
                danger(ele);
            }
        }, 10);
    }

    //������еͼ����ӵ��ϵ��˶���ʱ��
    function clear(childs) {
        for(var i=0; i< childs.length; i ++) {
            clearInterval(childs[i].timer);
        }
    }

    //��֮ͣ�����¿�ʼ
    function restart(childs, type) {
        for(var i=0; i< childs.length; i ++) {
            type == 1 ? move(childs[i], "top"): enemyMove(childs[i], "top");
        }
    }

    function bgMove() {

        c = setInterval(function() {
        //�����ӵ�
            backgroundPY += 1;
            if(backgroundPY >= gameH) {
                backgroundPY = 0;
            }
            gameEnter.style.backgroundPositionY = backgroundPY + "px";
        },10)
    }

    //����ӵ���diji����ײ
    function danger(enemy) {
        for(var i=0;i<bullets.length;i++){
        			// �õ��ӵ������ϱ߾�
        			var bulletL = getStyle(bullets[i],"left")
        			,	bulletT = getStyle(bullets[i],"top");
        			// �õ��л������ϱ߾�
        			var enemyL = getStyle(enemy,"left")
        			,	enemyT = getStyle(enemy,"top");
        			// �õ��л��Ŀ��
        			var enemyW = getStyle(enemy,"width")
        			,	enemyH = getStyle(enemy,"height");

            var condition = bulletL + bulletW >= enemyL && bulletL <= enemyL + enemyW && bulletT <= enemyT + enemyH && bulletT + bulletH >= enemyT;

            if(condition) {
            //��ʱ��
                clearInterval(bullets[i].timer);
            //ɾ��Ԫ��
                bulletsP.removeChild(bullets[i]);
            //ɾ���ӵ�
                bullets.splice(i, 1);
            //��ײ��
            enemy.hp -= 100;
            if(enemy.hp <= 0) {
                clearInterval(enemy.timer);
                enemysP.removeChild(enemy);
            }

            }
        }
    }
 }

