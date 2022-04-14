$(document).ready(function() {
  $.get(`/api/faves`)
    .then(data => {
      for (const map of data) {
        const mapsItem = function (map) {
          const article = $("<article></article>").addClass('content');
          $(".container").append(article);
          const itemContent = `
          <img src=${map.map_pic_url}>
          <div>
            <a href="/maps/${map.id}"><h3>${map.map_title}</h3></a>
            <p>
               ${map.map_description}

            </p>
          </div>`;
          const newItem = article.append(itemContent);
          return newItem;
        };
        mapsItem(map);
      }
    });
});
