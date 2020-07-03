$(document).ready(function(){
    $("#navbartoggler").click(function(){
   if( $("#navbartoggler").children('span').hasClass('fa-bars'))
   {
    $("#navbartoggler").children('span').removeClass('fa-bars');
    $("#navbartoggler").children('span').addClass('fa-times');
   }
   else
   {
    $("#navbartoggler").children('span').removeClass('fa-times');
    $("#navbartoggler").children('span').addClass('fa-bars');
   }
})
})