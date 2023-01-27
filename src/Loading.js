import "./Loading.css";
/**
 * Shows loading spinner
 */
function Loading() {
  return (
    <div className="Loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
