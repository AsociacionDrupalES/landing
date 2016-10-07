/**
 * @file
 * Da Vinci Custom Code of the javascript behaviour.
 */

(function ($) {
  Drupal.behaviors.da_vinciTheme = {
    attach: function (context) {
      $(".burger-circle").click(function() {
        $(this).find('.burger').toggleClass('active');
        $(this).next('.menu').toggleClass('active');
      });
      $(".dropdown-button").click(function() {
        var $button, $menu;
        $button = $(this);
        $menu = $button.siblings(".dropdown-menu");
        $menu.toggleClass("show-menu");
        $menu.children("li").click(function() {
          $menu.removeClass("show-menu");
          $button.html($(this).html());
        });
      });
    }
  }
})(jQuery);
