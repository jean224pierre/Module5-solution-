(function (global) {

  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/{{short_name}}.json";

  var insertHtml = function (selector, html) {
    document.querySelector(selector).innerHTML = html;
  };

  var showLoading = function (selector) {
    var html = "<div class='text-center'><img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    return string.replace(new RegExp(propToReplace, "g"), propValue);
  };

  // STEP 1: Load home HTML and insert random category short_name
  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      function (categories) {
        // STEP 2: Pick a random category
        var randomCategory = chooseRandomCategory(categories);

        // STEP 3: Insert into home snippet
        $ajaxUtils.sendGetRequest(homeHtmlUrl, function (homeHtml) {
          var finalHtml = insertProperty(homeHtml, "randomCategoryShortName", randomCategory.short_name);
          insertHtml("#main-content", finalHtml);
        }, false);
      },
      true
    );
  });

  // STEP 4: Random category function
  function chooseRandomCategory(categories) {
    var randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  }

  global.$dc = dc;

})(window);
