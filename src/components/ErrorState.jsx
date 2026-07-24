export default function ErrorState({ message }) {
  return (
    <div className="error-state">
      <svg className="error-state-icon" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cloud shape */}
        <path d="M95 65H25C14 65 5 56 5 45C5 34 14 25 25 25C25 25 26 15 36 10C46 5 56 10 60 18C64 8 78 5 88 12C98 19 98 32 95 38C108 38 115 48 115 57C115 66 106 65 95 65Z" stroke="currentColor" strokeWidth="3" fill="none" />
        {/* Question mark */}
        <text x="55" y="55" textAnchor="middle" fontSize="28" fontWeight="700" fill="currentColor">?</text>
      </svg>
      <p className="error-state-message">{message}</p>
      <p className="error-state-hint">Try searching for another city or check the spelling.</p>
    </div>
  );
}
