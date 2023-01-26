/**
 * Error component
 * Props:
 * - error - string to display error msg
 */
function Error({ error }) {
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
}

export default Error