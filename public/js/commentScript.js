//COMMENT FUNCTION
const createCommentPost = async (event) => {
  event.preventDefault();

  const commentElement = document.getElementById("commentBodyInput");
  const commentBody = commentElement.value.trim();
  const blogId = commentElement.dataset.id;
  console.log(commentElement.dataset.user);

  //makes post request for  new comments
  if (commentBody) {
    const response = await fetch("/comment/", {
      method: "POST",
      body: JSON.stringify({ blogId, commentBody }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("post successful");
      document.getElementById("commentBodyInput").value = "";
      window.location.reload();
    } else {
      alert("Failed to post.");
    }
  }
};

const submitCommentButton = document.getElementById("submitCommentButton");

submitCommentButton.addEventListener("click", createCommentPost);
