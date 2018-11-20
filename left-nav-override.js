console.log("QuickLaunch navigation dropdowns provisioning.")
_spBodyOnLoadFunctionNames.push("skinClassicQL");
 console.log("QuickLaunch navigation dropdowns enabled.")

function skinClassicQL(){
  $("div[id$=_V4QuickLaunchMenu]").addClass("base");
  $("div[id^=zz][id$=_V4QuickLaunchMenu] li").addClass("baseBorder");
  $("div[id^=zz][id$=_V4QuickLaunchMenu] span").addClass("baseText");
  $("div[id^=zz][id$=_V4QuickLaunchMenu] ul li").has('ul').addClass('Office365Icon');
  $("[id^=zz][id$=_RootAspMenu] li").children('ul').hide();

  /* for the if stmt something like if window.location === to selectedItem
  if (window.localStorage.getItem('selectedItem')) {
    $("[id^=zz][id$=_RootAspMenu] li ul").children.removeClass("baseText").addClass("subMenu subMenuText").show();
    $("[id^=zz][id$=_RootAspMenu] li ul").siblings('li').children('ul').hide(); 
  }
  else {
    $("[id^=zz][id$=_RootAspMenu] li ul").hide();
  }*/ 
  $("[id^=zz][id$=_RootAspMenu] li").click(function(e) {
    $(this).children('ul').slideToggle(300).removeClass("baseText").addClass("subMenu subMenuText");
    $(this).siblings('li').children('ul').hide();
    console.log(e + "You activated the toggle.");
  });
  
  $(document).on('click', ".selected, .ms-quicklaunch-dropNode, .ms-core-listMenu-selected, .a", function(){

  //$("[selected][ms-quicklaunch-dropNode][ms-core-listMenu-selected] a").click(function(e) { //never hitting this even though class shows on element
    //var targetLink0 = $(e.currentTarget).attr("href")
    //console.log(targetLink0);
    //var targetLink1 = $(e.currentTarget).getAttribute("href") 
    //console.log(targetLink1);
    var targetLink2 = $(this).getAttribute("href");
    console.log(targetLink2);
    var targetLink3 = $(this).attr("href");
    console.log(targetLink3);
    window.localStorage.setItem('selectedItem', targetLink2);
    console.log("You hit the anchor tag.");
  });

  $("span[id^=zz][id$=_V4QuickLaunchMenu_NavMenu_Edit]").hide();
  }