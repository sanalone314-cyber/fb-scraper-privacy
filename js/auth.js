window.fbAsyncInit = function () {
  FB.init({
    appId: "2328948191213332", //
    cookie: true,
    xfbml: true,
    version: "v24.0"
  });

  FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      saveFacebookToken(response.authResponse);
    }
  });
};

// Facebook SDK Load
(function (d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;

  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";

  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// Login Button
function loginWithFacebook() {
  FB.login(
    function (response) {
      if (response.authResponse) {
        saveFacebookToken(response.authResponse);
      } else {
        alert("Facebook Login Cancelled");
      }
    },
    {
      scope:
        "public_profile,email,pages_show_list,pages_read_engagement,user_posts"
    }
  );
}

// Save Token
function saveFacebookToken(auth) {
  localStorage.setItem("fb_access_token", auth.accessToken);
  localStorage.setItem("fb_user_id", auth.userID);

  const tokenBox = document.getElementById("accessToken");
  if (tokenBox) tokenBox.value = auth.accessToken;

  const status = document.getElementById("loginStatus");
  if (status) status.innerHTML = "✅ Facebook Connected";

  console.log("Facebook Token Saved");
}

// Logout
function logoutFacebook() {
  FB.logout(function () {
    localStorage.removeItem("fb_access_token");
    localStorage.removeItem("fb_user_id");
    location.reload();
  });
[]\
