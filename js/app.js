$.ajaxSetup({
  headers: myHeaders,
  cache: false,
});

$.ajax({
  url: baseUrl + '/board',
  method: 'GET',
  success: function (response) {
    setupColumns(response.columns);
  },
});

function setupColumns(columnsData) {
  'use strict';
  columnsData.forEach(function (columnData) {
    var col = new Column(columnData.id, columnData.name);
    board.addColumn(col);
    setupCards(col, columnData.cards);
  });

  function setupCards(col, cardsData) {
    cardsData.forEach(function (cardData) {
      var card = new Card(cardData.id, cardData.name);
      card.$element.attr('data-idColumn', cardData.bootcamp_kanban_column_id);
      col.addCard(card);
    });
  }
}
