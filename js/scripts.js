
$(function () {
  'use strict';

  function randomString() {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }

    return str;
  }

  function Column(name) {
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
  function Card(description) {
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

  var board = {
    name: 'Kanban Board',
    addColumn: function (column) {
      this.$element.append(column.$element);
      initSortable();
    },

    $element: $('#board .column-container'),
  };

  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder',
      forcePlaceholderSize: true,
      dropOnEmpty: true,
      activate: function (event, ui) {
        var height = ui.item.css('height');
        ui.placeholder.css('height', height);
      },
    }).disableSelection();
  }

  $('.create-column')
    .click(function () {
      var name = prompt('Enter a column name');
      if (name) {
        var column = new Column(name);
        board.addColumn(column);
      }
    });

  // CREATING COLUMNS
  var todoColumn = new Column('To do');
  var doingColumn = new Column('Doing');
  var doneColumn = new Column('Done');

  // ADDING COLUMNS TO THE BOARD
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);

  // CREATING CARDS
  var card1 = new Card('New task');
  var card2 = new Card('Create kanban boards');

  // ADDING CARDS TO COLUMNS
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
});
