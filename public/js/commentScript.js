//COMMENT FUNCTION
const createCommentPost = async (event) => {
  event.preventDefault();

  const commentBody = document.getElementById("commentBodyInput").value.trim();

  if (commentBody) {
    const response = await fetch("/comment/", {
      method: "POST",
      body: JSON.stringify({ commentBody }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("post successful");
    } else {
      alert("Failed to post.");
    }
  }
};

const submitCommentButton = document.getElementById("submitCommentButton");

commentSubmit.addEventListener("click", createCommentPost);
