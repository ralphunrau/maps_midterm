$(document).ready(function () {
  $.get(`/api/index`)
  .then(data => {
    for (const map of data) {
      console.log(map);
      const mapsItem = function (map) {
        const article = $("<article></article>").addClass('content');
        $(".container").append(article);
        const itemContent = `
          <img src=../images/jpg.png>
          <div>
            <a href="maps/${map.id}"><h3>${map.map_title}</h3></a>
            <p>
              Description: ${map.description}
              Other:
            </p>
          </div>`
        const newItem = article.append(itemContent);
        return newItem;
      }
      mapsItem(map);
    }
  })
});
