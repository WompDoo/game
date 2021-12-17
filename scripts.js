
$(function () {
  turnExecuting = false;
  var player = {
    health: 100,
    id: "char"
  };
  var enemy = {
    health: 100,
    id: "enemy"
  };
  var playerAttacks = {
    attackOne: {
      name: "Fire arrow",
      type: "ranged",
      dmg: 10,
      special: "burn",
      chance: 50
    },
      attackTwo: {
        name: "Dagger stab",
        type: "melee",
        dmg: 15,
        special: "bleed",
        chance: 10
      },
      attackThree: {
        name: "Throw sand",
        type: "spell",
        dmg: 5,
        special: "stun"
      },
      attackFour: {
        name: "Block attack",
        type: "buff",
        dmg: 0,
        special: "defence"
      }
  };
  var enemyAttacks = {
    attackOne: {
      name: "Shank",
      type: "melee",
      dmg: 15,
      special: ""
    },
      attackTwo: {
        name: "Maul",
        type: "melee",
        dmg: 10,
        special: "stun",
        chance: 15
      },
      attackThree: {
        name: "Throw rock",
        type: "ranged",
        dmg: 5
      },
      attackFour: {
        name: "Block attack",
        type: "buff",
        dmg: 0,
        special: "defence"
      }
  };
  function init() {
    if (turnExecuting) {
      $("#attacks").hide();
    } else {
      $("#attacks").show();
    }
    i = 1;
    attackArray = [];
    for (const attack in enemyAttacks) {
      attackArray.push(attack)
    }
    for (const attack in playerAttacks) {
      $("#" + i).text(playerAttacks[attack].name)
      $("#" + i).click(function () {
        playTurn(playerAttacks[attack])
      });
      i++;
    }
  }

  init();

  function playTurn(attack) {
    turnExecuting = true;
    executeAttack(attack, player, enemy);
    setTimeout(() => {
      enemyAttackCalc();
    }, 2000)
    turnExecuting = false;
  }

  function executeAttack(attack, attacker, target) {
    switch(attack.type) {
      case "melee":
        animation = "melee";
        break;
      case "ranged":
        animation = "melee"
        break;
      case "spell":
        animation = "melee"
        break;
      case "buff":
        animation = "melee"
        break;
      default:
        animation = "melee"
    }
    playAnimation(attacker, target, animation);
    cleanAnims(attacker, target);
    dmgCalc(attack.dmg, target);
  }

  function enemyAttackCalc() {
    rndNumber = (Math.floor(Math.random() * 4));
    rndAttack = attackArray[rndNumber];
    attackChosen = enemyAttacks[rndAttack];
    executeAttack(attackChosen, enemy, player)
  }

  function dmgCalc(dmg, target) {
    target.health = target.health - dmg;
    $("#" + target.id + "-hp > .hp").css("width", target.health);
  }

  function playAnimation(attacker, target, animation) {
    console.log(attacker, "atk")
    console.log(target, "tgt")
    console.log(animation)
    $("#" + attacker.id).addClass(animation + "-" + attacker.id)
    $("#" + target.id).addClass("dmg-" + target.id)
  }

  function cleanAnims(attacker, target) {
    setTimeout(() => {
      $("#" + attacker.id).removeClass();
      $("#" + target.id).removeClass();
    },1500)
  } 
});




