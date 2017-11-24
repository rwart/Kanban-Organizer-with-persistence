function Card(id, name) {
  'use strict';
  var _this = this;

  this.id = id;
  this.name = name || 'No description given';
  this.$element = createCard();

  function createCard() {
    // CREATING THE BLOCKS
    var $card = $('<li>')
      .prop('id', _this.id)
      .addClass('card alert alert-warning');
    var $cardName = $('<p>')
      .addClass('card-name')
      .text(_this.name);
    var $cardEdit = $('<button>')
      .addClass('close')
      .html('<span class="glyphicon glyphicon-edit"></span>');
    var $cardDelete = $('<button>')
      .addClass('close')
      .html('<span class="glyphicon glyphicon-remove"></span>');

    // BINDING TO CLICK EVENT
    $cardEdit.click(function () {
      _this.editCard();
    });

    $cardDelete.click(function () {
      _this.removeCard();
    });

    // COMBINING BLOCKS AND RETURNING THE CARD
    $card
      .append($cardDelete)
      .append($cardEdit)
      .append($cardName);

    return $card;
  }
}

Card.prototype = {

  editCard: function () {
    'use strict';
    var _this = this;
    var name = prompt('Edit card', _this.name);
    if (name) {
      $.ajax({
        url: baseUrl + '/card/' + _this.id,
        method: 'PUT',
        data: {
          id: _this.id,
          name: name,
          bootcamp_kanban_column_id: _this.$element.attr('data-idColumn'),
        },
        success: function () {
          _this.name = name;
          _this.$element.children('.card-name').text(_this.name);
        },
      });
    }
  },

  removeCard: function () {
    'use strict';
    var _this = this;
    $.ajax({
      url: baseUrl + '/card/' + _this.id,
      method: 'DELETE',
      success: function () {
        _this.$element.remove();
      },
    });
  },
};
