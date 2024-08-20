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

    document.getElementById('order-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        var poNumber = document.getElementById('po-number').value;
        var orderDetails = ``;

        // Collect order details from the table
        var rows = document.querySelectorAll('table tr');
        rows.forEach(function(row, index) {
            var cells = row.querySelectorAll('td');
            if (cells.length > 0 && index < rows.length - 3) { // Skip the last three rows (Subtotal, VAT, Total)
                var item = cells[0].innerText;
                var quantityInput = cells[1].querySelector('input');
                var quantity = quantityInput ? quantityInput.value : 0;
                var price = cells[2] ? cells[2].innerText : '';

                orderDetails += `${item}, Quantity: ${quantity}\n`;
            }
        });

        var subtotalElement = document.querySelector('.subtotal-number .number');
        var vatElement = document.querySelector('.vat-number .number');
        var totalElement = document.querySelector('.total-number .number');

        var subtotal = subtotalElement ? subtotalElement.innerText : '0';
        var vat = vatElement ? vatElement.innerText : '0';
        var total = totalElement ? totalElement.innerText : '0';

        orderDetails += `\nSubtotal: €${subtotal}\nVAT (23%): €${vat}\nTotal: €${total}`;

        document.getElementById('order-details').value = orderDetails;

        // Log the values to ensure they are set correctly
        console.log('PO Number:', poNumber);
        console.log('Order Details:', orderDetails);
        console.log('Subtotal:', subtotal);
        console.log('VAT:', vat);
        console.log('Total:', total);

        // Submit the form programmatically after setting the values
        event.target.submit();
    });
});
