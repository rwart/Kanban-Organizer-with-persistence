function Column(name) {
  'use strict';
  var _this = this;

  this.id = randomString();
  this.name = name;
  this.$element = createColumn();

  function createColumn() {
    // CREATING COMPONENTS OF COLUMNS
    var $column = $('<div>').addClass('column alert alert-info');
    var $columnTitle = $('<h2>').addClass('column-title').text(_this.name);
    var $columnCardList = $('<ul>').addClass('column-card-list list-unstyled');
    var $columnDelete = $('<button>').addClass('btn-delete close').html('&times;');
    var $columnAddCard = $('<button>')
      .addClass('add-card btn btn-success btn-sm').text('Add card');

    // ADDING EVENTS
    $columnDelete.click(function () {
      _this.removeColumn();
    });

    $columnAddCard.click(function () {
      var name = prompt('Enter the name of the card');
      if (name) {
        _this.addCard(new Card(name));
      }
    });

    // CONSTRUCTION COLUMN ELEMENT
    $column
      .append($columnDelete)
      .append($columnTitle)
      .append($columnCardList)
      .append($columnAddCard);

    // RETURN OF CREATED COLUMN
    return $column;
  }
}

Column.prototype = {
  addCard: function (card) {
    this.$element.children('ul').append(card.$element);
  },

  removeColumn: function () {
    this.$element.remove();
  },
};
