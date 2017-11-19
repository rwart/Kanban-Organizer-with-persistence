var board = {
  name: 'Kanban Board',
  addColumn: function (column) {
    this.$element.append(column.$element);
    initSortable();
  },

  $element: $('#board .column-container'),
};

function initSortable() {
  'use strict';
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
