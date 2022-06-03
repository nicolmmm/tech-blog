const createBlogPost = async (event) => {
  event.preventDefault();

  const title = document.getElementById("postTitle").value.trim();
  const body = document.getElementById("postBody").value.trim();

  if (title && body) {
    const response = await fetch("/blog/", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("post successful");
    } else {
      alert("Failed to post.");
    }
  }
};

const submit = document.getElementById("submitPostButton");
submit.addEventListener("click", createBlogPost);
