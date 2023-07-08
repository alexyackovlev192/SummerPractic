async function postData(url = "", req = "GET") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: req, // *GET, POST, PUT, DELETE, etc.

  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export default postData;