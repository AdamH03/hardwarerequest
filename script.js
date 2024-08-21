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

    // Enable/Disable Submit Button Based on PO Number Input
    $('#po-number').on('input', function() {
        var poNumber = $(this).val();
        var submitButton = $('#submit-order');

        if (poNumber.trim() === '') {
            submitButton.prop('disabled', true);
            submitButton.css({
                'background-color': '#ccc',
                'cursor': 'not-allowed'
            });
        } else {
            submitButton.prop('disabled', false);
            submitButton.css({
                'background-color': '#1d3557',
                'cursor': 'pointer'
            });
        }
    });

    $('#submit-order').on('click', function() {
        var poNumber = $('#po-number').val();
        var orderDetails = ``;

        // Collect order details from the table
        var rows = $('table tr');
        rows.each(function(index, row) {
            var cells = $(row).find('td');
            if (cells.length > 0 && index < rows.length - 3) { // Skip the last three rows (Subtotal, VAT, Total)
                var item = cells.eq(0).text();
                var quantityInput = cells.eq(1).find('input');
                var quantity = quantityInput && quantityInput.val() ? quantityInput.val() : 0;
                var price = cells.eq(2).text();

                orderDetails += `${item}, Quantity: ${quantity}\n`;
            }
        });

        var subtotal = $('.subtotal-number .number').text();
        var vat = $('.vat-number .number').text();
        var total = $('.total-number .number').text();

        orderDetails += `\nSubtotal: €${subtotal}\nVAT (23%): €${vat}\nTotal: €${total}`;

        var mailtoLink = `mailto:aherron@clarecoco.ie?subject=Computer Hardware Order Request&body=PO Number: ${poNumber}%0A%0AOrder Details:%0A${orderDetails.replace(/\n/g, '%0A')}`;
        window.location.href = mailtoLink;
    });
});
