(function($) {
  $(function() {
    function toggle(v, o) {
      v === "1" ? o.show() : o.hide();
    }

    //************************************************************************//
    //******************************* FIELDS *********************************//
    //************************************************************************//

    // Spouse Field //
    var hasSpouse = $("#id_demographic_set-0-has_spouse");
    var spouseName = $('#id_demographic_set-0-spouse_name, label[for="id_demographic_set-0-spouse_name"]');

    toggle(hasSpouse.val(), spouseName); //pre-set fields to match default..

    hasSpouse.change(function() {
      toggle($(this).val(), spouseName);
    });

    // Sibling Field //
    var hasSiblings = $("#id_demographic_set-0-has_siblings");
    var siblingCount = $('#id_demographic_set-0-sibling_count, label[for="id_demographic_set-0-sibling_count"]');
    var siblingOrder = $(
      '#id_demographic_set-0-sibling_birth_order, label[for="id_demographic_set-0-sibling_birth_order"]'
    );

    toggle(hasSiblings.val(), siblingCount);
    toggle(hasSiblings.val(), siblingOrder);

    hasSiblings.change(function() {
      toggle($(this).val(), siblingCount);
      toggle($(this).val(), siblingOrder);
    });

    // Children Field //
    var hasChildren = $("#id_demographic_set-0-has_children");
    var childrenCount = $('#id_demographic_set-0-children_count, label[for="id_demographic_set-0-children_count"]');
    var childrenNames = $('#id_demographic_set-0-children_names, label[for="id_demographic_set-0-children_names"]');

    toggle(hasChildren.val(), childrenCount);
    toggle(hasChildren.val(), childrenNames);

    hasChildren.change(function() {
      toggle($(this).val(), childrenCount);
      toggle($(this).val(), childrenNames);
    });
  });
})(django.jQuery);
