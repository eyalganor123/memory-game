var state = {
  selectedCards: [],
  matches: 0,
  isWorking: false
};

render ();

function render () {
  var grid = document.querySelector ('.grid');
  grid.innerHTML = '';

  // Iterate through all the cards in the data
  cards.forEach (function (card) {
    // Create an <img> element for each card
    var container = document.createElement ('div');
    container.className = 'image-container';
    var img = document.createElement ('img');

    // Set it's source and click event listener
    img.src = card.src;
    container.onclick = function (e) {
      onCardClick (card, e.target);
    };
    container.appendChild (img);

    // Add the image element to the parent element
    grid.appendChild (container);
  });
}

function onCardClick (card, element) {
  if (!isSelected(card) && !state.isWorking) {
    element.classList.add('selected');
    state.selectedCards.push({...card, element});
  }

  if (state.selectedCards.length === 2) {
    if(isMatch()) {
      onMatch();
    } else {
      if(!state.isWorking) {
        onRetry();
      }      
    }
  }
}

function onMatch () {
  state.matches++;
  if (state.matches === cards.length / 2) {
    onWin();
  }
  state.selectedCards = [];
}

function onWin() {
  Swal.fire ({
    title: 'Game OVER!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool',
  }).then (() => reset());
}

function reset() {  
  document.querySelectorAll('.image-container').forEach(element => {
    element.classList.remove('selected');
  });
  shuffle(cards);
  state.matches = 0;
  render();
}

function onRetry() {
  if(!state.isWorking) {
    state.isWorking = true;
    setTimeout (() => {
      state.selectedCards.forEach (card => {
        card.element.classList.remove('selected');
      });
      state.selectedCards = [];
      state.isWorking = false;
    }, 1000);
  }
  
}

function isSelected (card) {
  var selected = null;
  state.selectedCards.forEach (eachCard => {
    if (eachCard.id === card.id) {
      selected = eachCard;
    }
  });
  return selected;
}

function isMatch () {
  return state.selectedCards[0].key === state.selectedCards[1].key;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}
