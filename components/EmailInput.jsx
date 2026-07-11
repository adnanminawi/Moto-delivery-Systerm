export default function EmailInput({ email, setEmail }) {
  return (
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
  );
}
