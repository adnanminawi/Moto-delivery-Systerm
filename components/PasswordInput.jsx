export default function PasswordInput({ password, setPassword }) {
  return (
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />
  );
}
