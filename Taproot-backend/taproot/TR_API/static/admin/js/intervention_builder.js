// This script is a string builder for the Intervention form
// Created By Stephen R Ouellette 2020. //
(function($) {
    $(function() {
        // Variables //
        var rName = $('#id_resident_name');
        var verb = $("#id_verb");
        var subject = $("#id_subject");
        var subject_detail = $("#id_subject_detail");
        var details = $("#id_intervention_details");
        var name = $("#id_intervention_name");

        // When the verb field changes, we take the value of the other fields and concatenate
        verb.change(function() {
            $(details).val($(this).val());
            $(name).val($(this).val() + '_' + $(subject).val());
        });
        // When the subject field changes, we tak the value of other fields and concatenate
        subject.change(function(){
            $(details).val($(verb).val() + ' ' + $(rName).val() + ' with ' + $(subject_detail).val());
            $(name).val($(rName).val().toLowerCase() + '_' + $(verb).val().toLowerCase() + '_' + $(this).val().toLowerCase());
        });
        // Subject change = concatenate details, rname, and subject.
        subject_detail.change(function(){
            $(details).val($(verb).val() + ' ' + $(rName).val() + ' with ' + $(this).val());
        })

    });
  })(django.jQuery);
  