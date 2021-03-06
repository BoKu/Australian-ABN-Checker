function showNotice(textMsg){
    var $notice = $("<div>", {
        html: "<h2>" + textMsg + "<h2>"
    });
    $notice.appendTo('.small-container').delay(1000).fadeOut(1000, function(){
        $(this).remove();
    })
}
function validABN(abn){
    var char1 = (abn.substr(0,1) - 1) * 10;
    var char2 = abn.substr(1,1) * 1;
    var char3 = abn.substr(2,1) * 3;
    var char4 = abn.substr(3,1) * 5;
    var char5 = abn.substr(4,1) * 7;
    var char6 = abn.substr(5,1) * 9;
    var char7 = abn.substr(6,1) * 11;
    var char8 = abn.substr(7,1) * 13;
    var char9 = abn.substr(8,1) * 15;
    var char10 = abn.substr(9,1) * 17;
    var char11 = abn.substr(10,1) * 19;
    if( (((char1+char2+char3+char4+char5+char6+char7+char8+char9+char10+char11) / 89) % 1) == 0 ){
        return true;
    } else {
        return false;
    }
}
function checkABN(abn){
    if( abn.length == 11 && validABN(abn) ){
        $.when(
            $.ajax({
                url: "/getABN.php?abn=" + abn,
                success: function(output) {
                    response = output;
                }
            })
        ).then(function(){
            console.log(response);
            showNotice(response);
        });
    } else {
        showNotice("Invalid ABN");
    }
}
$('button').on('click', function(){
    checkABN( $('#abn').val() );
});
$('#abn').on('keydown', function(e){
    /* Allow: backspace, delete, tab, escape, enter and . */
    //if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
    var response;
    if ( e.keyCode == 13 ){
        checkABN( $('#abn').val() );
    } 
    else if ($.inArray(e.keyCode, [46, 8, 9, 27, 110, 190]) !== -1 ||
    /* Allow: Ctrl+A, Command+A */
    (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
    /* Allow: Ctrl+C, Command+C */
    (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) || 
    /* Allow: Ctrl+V, Command+V */
    (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) || 
    (e.keyCode === 116 ) ||
    /* Allow: home, end, left, right, down, up */
    (e.keyCode >= 35 && e.keyCode <= 40)) {
        /* let it happen, don't do anything */
        return;
    }
    /* Ensure that it is a number and stop the keypress */
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
