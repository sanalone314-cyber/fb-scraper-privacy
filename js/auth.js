window.fbAsyncInit = function () {
  FB.init({
    appId: "2328948191213332",
    cookie: true,
    xfbml: true,
    version: "v26.0",
  });

  FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      saveFacebookToken(response.authResponse);
    }
  });
};

(function (d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function loginWithFacebook() {
  FB.login(function (response) {
    if (response.authResponse) {
      saveFacebookToken(response.authResponse);

      FB.api("/me", {
        fields: "id,name,email,picture"
      }, function (response) {
        console.log("Profile:", response);

        if (document.getElementById("userName"))
          document.getElementById("userName").innerText = response.name;

        if (document.getElementById("userEmail"))
          document.getElementById("userEmail").innerText =
            response.email || "No Email";

        if (document.getElementById("userPhoto"))
          document.getElementById("userPhoto").src =
            response.picture.data.url;
      });

    } else {
      alert("Facebook Login Cancelled");
    }
  }, {
    scope: "public_profile,email,user_posts"
  });
}
  
function saveFacebookToken(auth) {
  const token = auth.accessToken;
  const userId = auth.userID;

  // Save Token & User ID
  localStorage.setItem("fb_access_token", token);
  localStorage.setItem("fb_user_id", userId);

  // Show token in input box
  const tokenInput = document.getElementById("accessToken");
  if (tokenInput) tokenInput.value = token;

  // Show connected status
  const status = document.getElementById("loginStatus");
  if (status) status.innerHTML = "✅ Connected";

  console.log("Token Saved:", token);
  console.log("User ID:", userId);
}

function logoutFacebook() {
  FB.logout(function () {
    localStorage.clear();
    location.reload();
  });
}
