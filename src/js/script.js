var state = {
  selectedCards: [],
  matches: 0
};

render();

function render() {
  var grid = document.querySelector('.grid');

  // Iterate through all the cards in the data
  cards.forEach(function(card) {
    // Create an <img> element for each card
    var container = document.createElement('div');
    container.className = "image-container";
    var img = document.createElement('img');
    
    // Set it's source and click event listener
    img.src = card.src;
    container.onclick = function(e) {
      onCardClick(card, e.target);
    }
    container.appendChild(img);

    // Add the image element to the parent element
    grid.appendChild(container);
  });
}

function onCardClick(card, element) {
  element.classList.add("selected");
  if(isSelected(card) === null) {
    state.selectedCards.push(card);
  }

  if(state.selectedCards.length === 2) {
    console.log('TURN OVER');
    if(isMatch()) {
      state.matches++;
      if(state.matches === cards.length / 2) {
        alert('GAME OVER !')
      }
      console.log('MATCH!!!');
    } else {
      console.log('NOT MATCH!!!'); 
    }
    state.selectedCards = [];
  }
}

function isSelected(card) {
  var selected = null;
  state.selectedCards.forEach(eachCard => {
    if(eachCard.id === card.id) {
      selected = eachCard;
    }
  });
  return selected;
}

function isMatch() {
  return state.selectedCards[0].key === state.selectedCards[1].key;
}
