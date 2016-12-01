<?php
$abn = $_REQUEST['abn'];
if( isset($abn) ){
    $abnpage = htmlentities(file_get_contents('http://abr.business.gov.au/SearchByAbn.aspx?SearchText=' . $abn));
    //echo $abnpage;
    $findTitleOpen = strpos($abnpage, htmlentities("<title>"));
    $findTitleClose = strpos($abnpage, htmlentities("</title>"));
    $title = trim(str_ireplace(' | ABN Lookup', '', substr($abnpage,($findTitleOpen+strlen(htmlentities("<title>"))),$findTitleClose-($findTitleOpen+strlen(htmlentities("<title>"))))));
    //echo $title;
    if($title == "Invalid ABN" || $title == "Error searching ABN Lookup"){
        echo "Invalid ABN";
    } else {
        echo "Valid ABN";
    }
} else {
    die( 'Error' );
}
