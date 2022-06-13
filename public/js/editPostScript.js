const postView = document.getElementById("postView");
const userButtons = document.getElementById("userButtons");

const editPostEl = document.getElementById("editPostEl");

const editPostButton = document.getElementById("editPostButton");
const cancelEditButton = document.getElementById("cancelEdit");
const commentBodyInput = document.getElementById("commentBodyInput");
const postId = commentBodyInput.dataset.id;

const submitEditButton = document.getElementById("submitEditButton");

editPostEl.style.display = "none";

function toggleEditView() {
  postView.style.display = "none";
  userButtons.style.display = "none";
  editPostEl.style.display = "block";
}

const editPostFunc = async (event) => {
  event.preventDefault();

  const title = document.getElementById("postTitle").value;
  const body = document.getElementById("postBody").value;

  if (title && body) {
    const response = await fetch(`/blog/${postId}`, {
      method: "PUT",
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

function cancelEdit() {
  postView.style.display = "block";
  userButtons.style.display = "block";
  editPostEl.style.display = "none";
}

editPostButton.addEventListener("click", toggleEditView);
cancelEditButton.addEventListener("click", cancelEdit);
submitEditButton.addEventListener("click", editPostFunc);
