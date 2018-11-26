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

  //Removed classes since they don't have href attr [selected][ms-quicklaunch-dropNode][ms-core-listMenu-selected] 

    //Because the link is dynamic bind to the document? $(document).on(click, "a", function(){} ); - except don't want to bind to clicks anywhere on the page - only the QL so 
    $("div[id$=_V4QuickLaunchMenu]").on($("a").click(function(e) {
    var targetLink2 = $(this.currentTarget).getAttribute("href");
    console.log(targetLink2 + " is the href attribute of the anchor tag.");
    window.localStorage.setItem('selectedItem', $(this).targetLink2);
  }));

  $("span[id^=zz][id$=_V4QuickLaunchMenu_NavMenu_Edit]").hide();
  }