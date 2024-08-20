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
            subtotal = 0;

        for(var i = 0; i < allInputs.length; i++) {
            if(parseFloat(allInputs[i].value)) {
                subtotal += parseFloat(allInputs[i].value) * parseFloat(allInputs[i].parentElement.nextElementSibling.firstElementChild.innerHTML);
            }
        }

        if (isNaN(subtotal)) {
            $(".subtotal-number .number").text("Enter a valid Quantity");
            $(".currency-sign").fadeOut();
            $("input").not($(this)).attr("disabled", "disabled");
        } else {
            $("input").removeAttr("disabled");
            $(".currency-sign").fadeIn();
            $(".subtotal-number .number").text(subtotal.toFixed(2));

            var vat = subtotal * 0.23;
            $(".vat-number .number").text(vat.toFixed(2));

            var total = subtotal + vat;
            $(".total-number .number").text(total.toFixed(2));
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
