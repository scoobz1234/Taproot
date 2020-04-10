(function($) {
    $(function() {

        var rName = $('#id_resident_name');
        var verb = $("#id_verb");
        var subject = $("#id_subject");
        var subject_detail = $("#id_subject_detail");
        var details = $("#id_intervention_details");
        var name = $("#id_intervention_name");

        
        verb.change(function() {
            $(details).val($(this).val());
            $(name).val($(this).val() + '_' + $(subject).val());
        });

        subject.change(function(){
            $(details).val($(verb).val() + ' ' + $(rName).val() + ' with ' + $(subject_detail).val());
            $(name).val($(rName).val().toLowerCase() + '_' + $(verb).val().toLowerCase() + '_' + $(this).val().toLowerCase());
        });

        subject_detail.change(function(){
            $(details).val($(verb).val() + ' ' + $(rName).val() + ' with ' + $(this).val());
        })

    });
  })(django.jQuery);
  