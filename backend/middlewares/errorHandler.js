function errorHandler(err, req, res, next) {
  console.error("🔥 ERROR:", err.message);

  res.status(500).json({
    message: "Lỗi hệ thống",
  });
}

module.exports = errorHandler;
