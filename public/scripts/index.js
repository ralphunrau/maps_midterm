$(document).ready(function () {
  $.get(`/api/index`)
    .then(data => {
      //ADDS ALL THE MAPS
      for (const map of data) {

        const mapsItem = function (map) {

          const article = $("<article></article>").addClass('content');
          $(".container").append(article);

          const itemContent = `
          <div>
            <img src=${map.map_pic_url}>
            <a href="/maps/${map.id}"><h3>${map.map_title}</h3></a>
          </div>
          <div class='descr'>
            <a href="/maps/${map.id}">
               ${map.map_description}
            </a>
          </div>`;

          const newItem = article.append(itemContent);
          return newItem;
        };
        mapsItem(map);
      }
    });
});
