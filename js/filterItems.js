document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    document.querySelectorAll(".filters li").forEach(function (filter) {
        filter.addEventListener("click", function () {
            document.querySelector("#menu-dish").classList.remove("bydefault_show");
            var filter = this.getAttribute("data-filter").split(', ');

            filterItems(filter);
        });
    });

    var filterList = {
        init: function () {
            var container = document.querySelector("#menu-dish");
            var items = container.querySelectorAll(".dish-box-wp");

            var filterItems = function (filters) {
                items.forEach(function (item) {
                    var itemMatches = filters.some(filter => item.classList.contains(filter.substring(1)));
                    if (filters.includes('.all') || itemMatches) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            };

            // Show all items initially
            filterItems([".all"]);

            // Add click event listeners to filter buttons
            document.querySelectorAll(".filter").forEach(function (filterButton) {
                filterButton.addEventListener("click", function () {
                    var filters = this.getAttribute("data-filter").split(', ');
                    filterItems(filters);
                });
            });
        }
    };
    filterList.init();
});
