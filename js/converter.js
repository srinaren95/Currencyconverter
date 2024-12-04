
var currencylist = {}


$(document).ready(function() {
    var table  = $('#currencyTable').DataTable({
        searching: true
    });

    // Function to append a row dynamically
    function addRow(currency, rate, flagUrl) {
        table.row.add([
            `<img src="${flagUrl}" alt="Flag" style="width: 20px; margin-right: 5px;"> ${currency}`,
            rate
        ]).draw();
    }

    var settings = {
        "url": "https://api.currencybeacon.com/v1/latest?api_key=1SMxQumaAcC996SUXGsnlBPW44t2RR82",
        "method": "GET",
        "timeout": 0,
        };
    
    $.ajax(settings).done(function (response) { 
        currencylist = response.rates 
        rateslist = response.rates 
        for (vals in rateslist){ 
            flagname = vals.slice(0, 2).toLowerCase();
            ratevals = rateslist[vals]
            ratevals = ratevals.toFixed(2);
            addRow( ` ${countrydata[flagname]} (${vals})` ,ratevals , `https://flagcdn.com/w40/${flagname}.png`);
            $('#currencyFrom').append(`<option value="${vals}"> ${vals} </option>`)
            $('#currencyTo').append(`<option value="${vals}">${vals} </option>`)  
        } 
        $('#currencyTo').val('AUD') 
        $('#currencyFrom').val('USD')
        $('#convertedAmount').val(rateslist['AUD'].toFixed(2))
    }); 

    
});

function updatecurrencyval(){  
    var fromamount = $('#fromamount').val()
    var toamount = $('#currencyTo').val()
    var currencyfrom = $('#currencyFrom').val()
    var currencyto = $('#currencyTo').val()
    if (currencyfrom=='USD'){ 
        conv_val = currencylist[currencyto] 
        
        finalval  = ( parseFloat(fromamount)*parseFloat(conv_val)).toFixed(2) 
        $('#convertedAmount').val(finalval)
        
    }else{

        conv_val_from = currencylist[currencyfrom]
        final_val_from =  ( parseFloat(fromamount)/parseFloat(conv_val_from)) 

        
        conv_val = currencylist[currencyto] 
        
        finalval  = ( parseFloat(final_val_from)*parseFloat(conv_val)).toFixed(2) 
        $('#convertedAmount').val(finalval)

    }
    
}

function swapval(){
     
    var cachecurrencyfrom = $('#currencyFrom').val()
    var cachecurrencyto = $('#currencyTo').val()

    $('#currencyFrom').val(cachecurrencyto)
    $('#currencyTo').val(cachecurrencyfrom)
    updatecurrencyval()

}
