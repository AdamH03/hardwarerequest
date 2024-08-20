$(function() {
    var place;
    $("input").focus(function() {
        place = $(this).attr("placeholder");
        $(this).attr("placeholder", "")
    }).blur(function() {
        $(this).attr("placeholder", place);
    });

    $(".quantity input").on("input", function() {
        var allInputs = document.getElementsByName('qty'),
            total = 0;

        for(var i = 0; i < allInputs.length; i++) {
            if(parseFloat(allInputs[i].value)) {
                total += parseFloat(allInputs[i].value) * parseFloat(allInputs[i].parentElement.nextElementSibling.firstElementChild.innerHTML);
            }
        }

        if (isNaN(total)) {
            $(".number").text("Enter a valid Quantity");
            $(".currency-sign").fadeOut();
            $("input").not($(this)).attr("disabled", "disabled");
        } else {
            $("input").removeAttr("disabled");
            $(".currency-sign").fadeIn();
            $(".number").text(total.toFixed(2));
        }
    });

    $(".quantity input").on("keydown", function(e) {
        if (e.keyCode == 40 && !isNaN($(this).val())) {
            e.preventDefault();
            $(this).parent().parent().next().find("input").focus();
        } else if (e.keyCode == 38 && !isNaN($(this).val())) {
            e.preventDefault();
            $(this).parent().parent().prev().find("input").focus();
        }
    });
});
