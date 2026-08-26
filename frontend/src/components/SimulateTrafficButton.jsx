function SimulateTrafficButton({
  onClick,
  loading,
  disabled
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? 'Simulating...' : 'Simulate Traffic'}
    </button>
  );
}

export default SimulateTrafficButton;