app.get("/users", async (req, res) => {
  const users = await User.find({}).exec();
  res.json({
    result: "ok",
    data: users,
  });
});
