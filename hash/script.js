document.addEventListener("DOMContentLoaded", function() {
  const inputText = document.getElementById("inputText");
  const outputHash = document.getElementById("outputHash");
  const saveHashBtn = document.getElementById("saveHashBtn");
  const savedHashesContainer = document.getElementById("savedHashes");

  inputText.addEventListener("input", function() {
    generateHash();
  });

  inputText.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      generateHash();
    }
  });

  saveHashBtn.addEventListener("click", function() {
    const hash = outputHash.value;
    if (hash) {
      saveHash(hash);
    } else {
      alert("No hash to save. Generate a hash first.");
    }
  });

  function generateHash() {
    const text = inputText.value;
    sha256(text)
      .then(hash => {
        outputHash.value = hash;
      })
      .catch(error => {
        console.error("Error generating hash:", error);
      });
  }

  function sha256(input) {
    const buffer = new TextEncoder("utf-8").encode(input);
    return crypto.subtle.digest("SHA-256", buffer).then(function(hash) {
      return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    });
  }

  function saveHash(hash) {
    const hashElement = document.createElement("div");
    hashElement.textContent = hash;
    savedHashesContainer.appendChild(hashElement);
  }
});
