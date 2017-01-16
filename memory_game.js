var cards;
var previousCard;
var cardsMatched;
var selectedDim;
var currentCards;
var firstClick;
var timer;
var _timerDisplay;
var username;
var result;
var start;
var player;
var currentUsersGlobal;
var homePage = document.getElementById("homePage");
var quit = document.createElement('button');
//poziva funkciju za inicijalizaciju na reload browsera. Ova funkcija je potrebna zbog quit buttona, jer se onamo poziva i sve promenljive se setuju na pocetak. 
window.onload = initGame();

function initGame () {
  cards = ["Guns'n'roses", "Guns'n'roses", "Led Zeppelin", "Led Zeppelin", "Black Sabbath", "Black Sabbath", "Deep Purple", "Deep Purple", "Danzig", "Danzig", "AC/DC", "AC/DC", "Whitesnake", "Whitesnake", "Eric Clapton", "Eric Clapton", "Oasis", "Oasis", "Pearl Jam", "Pearl Jam", "Pink Floyd", "Pink Floyd", "Scorpions", "Scorpions", "Ten Years After", "Ten Years After", "T Rex", "T Rex", "Thin Lizzy", "Thin Lizzy", "Dire Straits", "Dire Straits", "Queen", "Queen", "Alice in Chains", "Alice in Chains", "Rammstein", "Rammstein", "Iron Maiden", "Iron Maiden", "Jimi Hendrix", "Jimi Hendrix", "Rory Gallagher", "Rory Gallagher", "Johnny Cash", "Johnny Cash", "Judas Priest", "Judas Priest", "Motorhead", "Motorhead", "Fleetwood Mac", "Fleetwood Mac", "Billy Idol", "Billy Idol", "Rolling Stones", "Rolling Stones", "Beatles", "Beatles", "The Who", "The Who", "Van Halen", "Van Halen", "Doors", "Doors"]
  previousCard = null;
  cardsMatched = [];
  selectedDim = "";
  currentCards = [];
  firstClick = null;
  timer;
  _timerDisplay;
  username = null;
  result = 0;
  start = false;
  player = {
    _username: "",
    _result: ""
  };
  levelHide();
}

//Show buttons
function levelShow() {
  var level = document.getElementsByClassName("level");
  for(var i=0; i<level.length;i++) {
     level[i].classList.remove("hide");
  }
}

//Hide buttons
function levelHide() {
  var level = document.getElementsByClassName("level");
  for(var i = 0; i < level.length; i++) {
     level[i].classList.add("hide");
  }
}

//cuva username
function saveUsername () {
  username = document.getElementsByTagName("input")[0].value; 
  player["_username"] = username;
  //function button Show
  levelShow();
}
//radi komparaciju trenutnog usernamea sa postojecim usernameovima. Ukoliko postoji isti, azurira mu rezultat poslednjim rezultatom. Vrsi sortiranje rezultata.
function localStorageFunc (selectedLevel) {
  var currentUsers = JSON.parse(localStorage.getItem(selectedLevel));
    if (!currentUsers) {
      currentUsers = [];
    }
    var existing = false;
    for (var i = 0; i < currentUsers.length; i++) {
      if (currentUsers[i]["_username"] == player["_username"]) {
        currentUsers[i]["_result"] = player["_result"];
        existing = true;
        break;
      }
    }
  
    if (!existing) {
      currentUsers.push(player);
    }
    var currentUsersSort = currentUsers.sort(function (a,b) {
      return a._result-b._result
    });
    localStorage.setItem(selectedLevel, JSON.stringify(currentUsersSort));
    rankListPreview(selectedLevel, currentUsers);
}

function rangListButtonClick() {
  document.getElementById("secondPage").classList.add("hide");
  document.getElementById("board").classList.remove("hide");
  document.getElementById("board").style.color = "white";
}

//smesta username u odgovarajuci property objekta LocalStorage
function rankList() {
  var selectedLevel;
  if (selectedDim == 16 ) {
    selectedLevel = "easy";
    localStorageFunc(selectedLevel);
  }
  
  else if (selectedDim == 36 ) {
    selectedLevel = "medium";
    localStorageFunc(selectedLevel);
  }

  else {
    selectedLevel = "hard";
    localStorageFunc(selectedLevel);
  }
}
//ispis rang liste
function rankListPreview (selectedLevel, currentUsers) {
  homePage.classList.add("hide");
  this.currentUsersGlobal = currentUsers; 
  board.innerHTML = "";

  var table = document.createElement('table');
  board.appendChild(table);
  for (var i = 0; i < currentUsers.length; i++) {
      var row = document.createElement('tr');
      row.innerHTML = '<td>' + (i+1) +'</td><td>' + currentUsers[i]._username + '</td><td>'+ currentUsers[i]._result+'</td>'
      table.appendChild(row);
  }
//ispis ranga za trenutnog usera
  for (var i = 0; currentUsers.length; i++) {
    if (currentUsers[i]._username == username) {
      var score = document.createElement('div');
      score.innerHTML = 'Your current rang for level ' + selectedLevel + ' is: ' + (i+1);
      board.appendChild(score);
      break;
    }
  }
}
//mesa kartice
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
  shuffledCards = array;
}
//pocetak igre
function startGame(currentDim) {
    if (start == false) {
        start = true;
        if (username === null) {
          alert("Please insert username");
        }

        else {
        //daje quit buttonu klasu level
        quit.classList.add("level");
        var quitDiv = document.querySelector('#quit');
        quit.innerHTML = 'Quit Game';
        quitDiv.appendChild(quit);
        //poziv funkcije koja daje event quit buttonu
        quitButtonEvent();
        this.selectedDim = currentDim;
        currentCards = cards.splice(0,selectedDim);
        shuffleArray(currentCards);
        var board = document.getElementById("board");
        board.innerHTML = "";
        var wrapper1 = document.createElement('div');
        wrapper1.innerHTML = '<div class="wrapper"><main><div class="section__content clearfix"></div></main></div>';
        board.appendChild(wrapper1);
        if (currentDim === 16) {
          document.getElementsByClassName("section__content")[0].style.width = "400px";
          document.getElementsByClassName("startdiv")[0].classList.add("hide");
          document.getElementById("board").classList.remove("hide");
          document.getElementById("quit").classList.remove("hide");
        } else if (currentDim === 36) {
          document.getElementsByClassName("section__content")[0].style.width = "600px";
          document.getElementsByClassName("startdiv")[0].classList.add("hide");
          document.getElementById("board").classList.remove("hide");
          document.getElementById("quit").classList.remove("hide");
        } else {
          document.getElementsByClassName("section__content")[0].style.width = "1000px";
          document.getElementsByClassName("startdiv")[0].classList.add("hide");
          document.getElementById("board").classList.remove("hide");
          document.getElementById("quit").classList.remove("hide");
        }
        for (var i = 0; i < selectedDim; i++) {
          var cardBoard = document.getElementsByClassName("section__content")[0];
          var wrapper2 = document.createElement('div');
          wrapper2.innerHTML = '<div class="card effect__click" id="' + i + '"><div class="card__front"></div><div class="card__back">' + currentCards[i] + '</div></div>';
          cardBoard.appendChild(wrapper2);
        }      
        addFlipEffect();
      }
    }
//ne dopusta promenu nivoa osim ako se ne klikne quit dugme
  else {
    alert("Quit game? Well, press quit game button. Goodbye quitter!");
  }
}
//dodaje flip efekat svim karticama
function addFlipEffect () { 
  var cardsFlip = document.querySelectorAll(".card.effect__click");
  for ( var i  = 0; i < cardsFlip.length; i++ ) {
    var card = cardsFlip[i]; 
    compareCards(card);
  }
}
//funkcija koja se poziva na klik svake kartice - komparacija
function compareCards(card) {
  card.addEventListener( "click", function() {
      var clickedCardClass = card.classList;
      if (firstClick === null) {
      	firstClick = 0;
        var timerDisplay = document.getElementById("timer");
        _timerDisplay = timerDisplay;
      	timer = setInterval(function() {
          timerDisplay.classList.remove("hide");
      		timerDisplay.innerHTML = 'Your time: ' + firstClick;
      		firstClick++;
      	}, 1000);
      }
      
      if (previousCard === null) {
      	previousCard = card.id;
        //ispitivanje da li je prva kartica vec uparena. Ukoliko jeste, resetuje se previousCard i ne radi nista sa tom karticom, ne uporedjuje je. 
        if (cardsMatched.indexOf(currentCards[previousCard]) > -1) {
            previousCard = null;
            return;
        }

        else {
      	clickedCardClass.add("flipped");
        }
      }
      else { 
          //ispitivanje da li je druga kartica vec uparena. Ukoliko jeste, ne uporedjuje se. 
          if (cardsMatched.indexOf(currentCards[card.id]) > -1) {
            return;
          }

          else {
                if (previousCard !== card.id) {
                    clickedCardClass.add("flipped");
                    var _this = this;
                    setTimeout(function() {
                      if (currentCards[previousCard] === currentCards[_this.id]) {
                                cardsMatched.push(currentCards[previousCard]);
                                cardsMatched.push(currentCards[_this.id]);
                  	   if (cardsMatched.length === currentCards.length) {
                                  result = firstClick;
                                  player["_result"] = result; 
                  			      		clearInterval(timer);
                                  start = false;
                                  quit.innerHTML = "Play Again";
                                  document.getElementById("board").classList.add("hide");
                                  document.getElementById("end_message").innerHTML = "You rocked it  " + username.toUpperCase() + " ! Your time result is " + firstClick + " seconds!";
                                  document.getElementById("end_message").classList.remove("hide");
                                  document.getElementById("share").innerHTML = '<div class="buttonShare" class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/dialog/feed?app_id=145634995501895&display=popup&amp;caption=An%20example%20caption&link=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https://developers.facebook.com/tools/explorer&caption=Developed by: Ana, Rastko, Nevena&description=%0A'+ username.toUpperCase() +' cleared board in '+ firstClick +' seconds. Rock on!!!&title=Rock Star Memory Game&picture=http://kingofwallpapers.com/rockstar/rockstar-002.jpg"><img src="images/facebook.png" style="width:80px; height:auto"/></a></div>';
                                  document.getElementById("share").classList.remove("hide");
                                  document.getElementById("twitter").innerHTML = '<span  class="buttonShare" ><a class="twitter-share-button" target="_blank" href="https://twitter.com/intent/tweet?text=Rock%20Star%20Memory%20Game!!!%0A'+ username.toUpperCase() +'%20cleared%20board%20in%20'+ firstClick +'%20seconds.%20Rock on!!!"><img src="images/twitter.png" style=" width: 80px; height:auto " alt=""></a><span>';
                                  document.getElementById("twitter").classList.remove("hide");
                                  document.getElementById("listButton").classList.remove("hide");
                                  document.getElementById("timer").classList.add("hide");
                                  rankList();
                  			}
                      }
                  	   else {
                  	      			document.getElementById(previousCard).classList.remove("flipped");
                  	      			clickedCardClass.remove("flipped");
                  	   }
                	     previousCard = null;
                    }, 300);
                }
          }
      } //else
  });
}

//fja koja dodeljuje event Quit dugmetu
 function quitButtonEvent () {
  quit.addEventListener("click", quitGame);
 }

//fja koja se poziva na klik quit dugmeta, resetuje sve pozivom initGame fje i plus prazni timer i board sa karticama i prikaz usernamea
 function quitGame () {
  initGame();
  document.getElementsByTagName("input")[0].value = "";
  document.getElementById("share").classList.add("hide");
  document.getElementById("twitter").classList.add("hide");
  document.getElementById("listButton").classList.add("hide");
  document.getElementById("end_message").classList.add("hide");
  document.getElementById("quit").classList.add("hide")
  document.getElementsByClassName("startdiv")[0].classList.remove("hide");
  board.innerHTML = "";
  clearInterval(timer);
  _timerDisplay.innerHTML = "";
  homePage.classList.remove("hide");
  quit.innerHTML = "";
 }



