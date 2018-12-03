console.log("QuickLaunch navigation dropdowns provisioning.")
_spBodyOnLoadFunctionNames.push("skinClassicQL");
 console.log("QuickLaunch override loaded.")

function skinClassicQL(){
  function basicStyle() {
    $("div[id$=_V4QuickLaunchMenu]").addClass("base");
    $("div[id^=zz][id$=_V4QuickLaunchMenu] li").addClass("baseBorder");
    $("div[id^=zz][id$=_V4QuickLaunchMenu] span").addClass("baseText");
    $("div[id^=zz][id$=_V4QuickLaunchMenu] ul li").has('ul').addClass('Office365Icon');
    $("[id^=zz][id$=_RootAspMenu] li").children('ul').hide();
  }

  //nested function toggles menu
  function openClose(e) {
    $(this).children('ul').slideToggle(300).removeClass("baseText").addClass("subMenu subMenuText");
    $(this).siblings('li').children('ul').hide();
    console.log(e + "You activated the toggle.");
  }
 
  //nested function stores target URL when navigating to new page, and restores state after navigation
  function storeUrl(e) {
    //var anchor = $(this);
    console.log(this.getAttribute("href") + " Using plain this.currentTarget.getattribute..");
    if (e) {
      localStorage.setItem('selectedItem', this.getAttribute("href"));
      console.log("Local storage value for selectedItem is: " + window.localStorage.getItem('selectedItem'));
      console.log("Congratulations! You triggered the click event to populate the local storage");
    }
  }

basicStyle();
$("[id^=zz][id$=_RootAspMenu] li").on("click", openClose);
$("[id^=zz][id$=_RootAspMenu]").on("click", "a", storeUrl);

  /* for the if stmt something like if window.location === to selectedItem
  if (window.localStorage.getItem('selectedItem')) {
    $("[id^=zz][id$=_RootAspMenu] li ul").children.removeClass("baseText").addClass("subMenu subMenuText").show();
    $("[id^=zz][id$=_RootAspMenu] li ul").siblings('li').children('ul').hide(); 
  }
  else {
    $("[id^=zz][id$=_RootAspMenu] li ul").hide();
  }*/ 

  //Hide the ability to modify QL navigation
  $("span[id^=zz][id$=_V4QuickLaunchMenu_NavMenu_Edit]").hide();
  }