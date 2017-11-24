function Column(id, name) {
  'use strict';
  var _this = this;

  this.id = id;
  this.name = name || 'No name given';
  this.$element = createColumn();

  function createColumn() {
    // CREATING COMPONENTS OF COLUMNS
    var $column = $('<div>')
      .prop('id', _this.id)
      .addClass('column alert alert-info');
    var $columnName = $('<h2>')
      .addClass('column-name')
      .text(_this.name);
    var $columnCardList = $('<ul>')
      .addClass('column-card-list list-unstyled');
    var $columnEdit = $('<button>')
      .addClass('close')
      .html('<span class="glyphicon glyphicon-edit"></span>');
    var $columnDelete = $('<button>')
      .addClass('close')
      .html('<span class="glyphicon glyphicon-remove"></span>');
    var $columnAddCard = $('<button>')
      .addClass('add-card btn btn-success btn-sm')
      .text('Add card');

    // ADDING EVENTS
    $columnEdit.click(function () {
      _this.editColumn();
    });

    $columnDelete.click(function () {
      _this.removeColumn();
    });

    $columnAddCard.click(function (event) {
      var cardName = prompt('Enter the name of the card');
      event.preventDefault();
      if (cardName) {
        $.ajax({
          url: baseUrl + '/card',
          method: 'POST',
          data: {
            name: cardName,
            bootcamp_kanban_column_id: _this.id,
          },
          success: function (response) {
            var card = new Card(response.id, cardName);
            card.$element.attr('data-idColumn', _this.id);
            _this.addCard(card);
          },
        });
      }
    });

    // CONSTRUCTION COLUMN ELEMENT
    $column
      .append($columnDelete)
      .append($columnEdit)
      .append($columnName)
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

  editColumn: function () {
      'use strict';
      var _this = this;
      var name = prompt('Edit column', _this.name);
      if (name) {
        $.ajax({
          url: baseUrl + '/column/' + _this.id,
          method: 'PUT',
          data: {
            id: _this.id,
            name: name,
          },
          success: function () {
            _this.name = name;
            _this.$element.children('.column-name').text(_this.name);
          },
        });
      }
    },

  removeColumn: function () {
    'use strict';
    var _this = this;
    $.ajax({
      url: baseUrl + '/column/' + _this.id,
      method: 'DELETE',
      success: function (response) {
        _this.$element.remove();
      },
    });
  },
};
