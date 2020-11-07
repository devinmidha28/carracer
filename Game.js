class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    c1=createSprite(300,400);
    c2=createSprite(400,400);
    c3=createSprite(500,400);
    c4=createSprite(600,400);

    abc=[c1,c2,c3,c4]

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0, x=0,y;
      var display_position = 130;
      for(var plr in allPlayers){
        x=x+100;
        index=index+1
        y=displayHeight-allPlayers[plr].distance;
        abc[index-1].x=x
        abc[index-1].y=y
        if (index==player.index) {
          abc[index-1].shapeColor="red"
          camera.position.x=displayWidth/2
          camera.position.y=abc[index-1].y
        }
        if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
}
