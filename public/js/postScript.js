const createBlogPost = async (event) => {
  event.preventDefault();

  const title = document.getElementById("postTitle").value;
  const body = document.getElementById("postBody").value;

  if (title && body) {
    const response = await fetch("/blog/", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("post successful");
      document.getElementById("postTitle").value = "";
      document.getElementById("postBody").value = "";
      document.location.replace("/");
    } else {
      alert("Failed to post.");
    }
  }
};

const submit = document.getElementById("submitPostButton");
submit.addEventListener("click", createBlogPost);
