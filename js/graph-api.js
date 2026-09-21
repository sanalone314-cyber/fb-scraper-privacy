const GRAPH_VERSION = "v24.0";
const GRAPH_URL = `https://graph.facebook.com/${GRAPH_VERSION}`;

function getToken() {
    return localStorage.getItem("fb_access_token");
}

async function graphRequest(endpoint) {
    const token = getToken();

    if (!token) {
        alert("Facebook Login Required");
        return null;
    }

    const url = `${GRAPH_URL}/${endpoint}?access_token=${token}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (data.error) {
            console.error(data.error);
            alert(data.error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error(err);
        alert("Graph API Error");
    }
}

async function loadProfile() {
    const data = await graphRequest(
        "me?fields=id,name,email,picture.width(300).height(300)"
    );

    if (!data) return;

    document.getElementById("userName").innerText = data.name;
    document.getElementById("userEmail").innerText = data.email || "Email Hidden";
    document.getElementById("userPhoto").src = data.picture.data.url;
}

async function loadPosts() {
    const data = await graphRequest(
        "me/posts?fields=message,created_time,permalink_url&limit=10"
    );

    if (!data || !data.data) return;

    const container = document.getElementById("postContainer");
    container.innerHTML = "";

    data.data.forEach(post => {
        container.innerHTML += `
        <div class="post-card">
            <p>${post.message || "No Text Post"}</p>
            <small>${new Date(post.created_time).toLocaleString()}</small><br>
            <a href="${post.permalink_url}" target="_blank">
                View Post
            </a>
        </div>`;
    });
}

window.addEventListener("load", () => {
    if (getToken()) {
        loadProfile();
        loadPosts();
    }
});
