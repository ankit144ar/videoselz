function ErrorState({ message, onRetry }) {
  return (
    <div className="state-container">
      <h2>Unable to load analytics</h2>

      <p>{message}</p>

      <button type="button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;