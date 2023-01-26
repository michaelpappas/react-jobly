/**
 * Errors component
 * Props:
 * - errors - an array of strings to display error msgs
 */
function Errors({ errors }) {
  return (
    <div className="alert alert-danger" role="alert">
      {errors.map(error => <div>{error}</div>)}
    </div>
  );
}

export default Errors;