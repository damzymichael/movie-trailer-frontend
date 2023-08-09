const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Working...");
  };
  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
      </form>
    </div>
  );
};

export default Signup;
