// Dashboard Logic

async function loadPosts() {
    const token = localStorage.getItem("fb_access_token");
    const list = document.getElementById("postList");

    if (!token) {
        list.innerHTML = "<li style='color:red;'>❌ Facebook Access Token not found. Please login first.</li>";
        return;
    }

    try {
        const res = await fetch(
            `https://graph.facebook.com/me/posts?fields=message,created_time&limit=5&access_token=${token}`
        );

        const posts = await res.json();
        console.log("Posts API Response:", posts);

        list.innerHTML = "";

        if (posts.error) {
            list.innerHTML = `<li style="color:red;">❌ ${posts.error.message}</li>`;
            return;
        }

        if (!posts.data || posts.data.length === 0) {
            list.innerHTML = "<li>⚠️ No posts available for this access token.</li>";
            return;
        }

        posts.data.forEach(post => {
            const li = document.createElement("li");
            li.innerHTML =
                `<b>${post.created_time.substring(0,10)}</b><br>${post.message || "No Text Post"}`;
            list.appendChild(li);
        });

    } catch (err) {
        console.error(err);
        list.innerHTML = "<li style='color:red;'>❌ Network Error</li>";
    }
}

// Page load hote hi posts load karo
window.onload = loadPosts;
