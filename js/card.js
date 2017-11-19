function Card(description) {
  'use strict';
  var _this = this;

  this.id = randomString();
  this.description = description;
  this.$element = createCard();

  function createCard() {
    // CREATING THE BLOCKS
    var $card = $('<li>').addClass('card alert alert-warning');
    var $cardDescription = $('<p>').addClass('card-description').text(_this.description);
    var $cardDelete = $('<button>').addClass('btn-delete close').html('&times;');

    // BINDING TO CLICK EVENT
    $cardDelete.click(function () {
      _this.removeCard();
    });

    // COMBINING BLOCKS AND RETURNING THE CARD
    $card
      .append($cardDelete)
      .append($cardDescription);

    return $card;
  }
}

Card.prototype = {
  removeCard: function () {
    this.$element.remove();
  },
};
