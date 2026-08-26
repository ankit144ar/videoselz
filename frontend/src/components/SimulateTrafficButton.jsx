function SimulateTrafficButton({
  onClick,
  loading
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Simulating...' : 'Simulate Traffic'}
    </button>
  );
}

export default SimulateTrafficButton;