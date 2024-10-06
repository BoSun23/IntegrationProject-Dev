import { useLocation } from "react-router-dom";

const TestPage = () => {
  const location = useLocation();
  const { ratingValue, commentText } = location.state || {};

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p className="text-lg">
        <strong>Submitted Rating:</strong> {ratingValue ? `${ratingValue} Stars` : "No rating provided"}
      </p>
      <p className="text-lg">
        <strong>Submitted Comment:</strong> {commentText || "No comment provided"}
      </p>
    </div>
  );
};

export default TestPage;
