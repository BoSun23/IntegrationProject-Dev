import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection

const ThanksForFeedback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to redirect to the home page after 10 seconds
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to home page
    }, 5000); // 10000 milliseconds = 10 seconds

    // Clean up the timer if the component is unmounted before the time ends
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Thank you for your feedback!</h1>
      <p className="mt-4">You will be redirected to the home page in 5 seconds.</p>
    </div>
  );
};

export default ThanksForFeedback;
