function ForgotPassword() {
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div
        className="glass-card"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4">
          Reset Password
        </h2>

        <p className="text-center feature-desc mb-4">
          Enter your registered email address
        </p>

        <input
          type="email"
          className="form-control mb-4"
          placeholder="Email Address"
        />

        <button className="btn glow-btn w-100">
          Send Reset Link
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;