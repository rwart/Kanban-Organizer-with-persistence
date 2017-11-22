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

    stop: function (event, ui) {
      var $card = ui.item;
      var idCard = $card.prop('id');
      var nameCard = $card.children('.card-name').text();
      var idColumn = $card.attr('data-idColumn');
      var $column = $card.parent().parent();
      var columnID = $column.prop('id');

      if (idColumn != columnID) {
        $.ajax({
          url: baseUrl + '/card/' + idCard,
          method: 'PUT',
          data: {
            id: idCard,
            name: nameCard,
            bootcamp_kanban_column_id: columnID,
          },

          success: function () {
            $card.attr('data-idColumn', columnID);
          },

          error: function () {
            $('#' + idColumn).children('ul').append($card);
          },
        });
      }
    },
  }).disableSelection();
}

$('.create-column')
  .click(function () {
    'use strict';
    var columnName = prompt('Enter a column name');
    if (columnName) {
      $.ajax({
        url: baseUrl + '/column',
        method: 'POST',
        data: {
          name: columnName,
        },
        success: function (response) {
          var column = new Column(response.id, columnName);
          board.addColumn(column);
        },
      });
    }
  });
