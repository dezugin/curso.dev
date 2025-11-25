function status(request, response) {
  response
    .status(200)
    .json({ status: "Students in curso.dev are above average" });
}

export default status;
