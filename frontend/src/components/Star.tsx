import { useState } from "react";

const StarRepoButton = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const starRepo = async () => {
    const owner = "Ferhatmedtahar"; // Replace with the repo owner
    const repo = "nodeAI"; // Replace with the repo name
    const token = import.meta.env.STAR_TOKEN; // Replace with a valid token

    setLoading(true);
    setError("");
    setSuccess(false);
    console.log(token);
    try {
      const response = await fetch(
        `https://api.github.com/user/starred/${owner}/${repo}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        }
      );

      if (response.status === 204) {
        setSuccess(true);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to star the repository");
      }
    } catch (error) {
      setError(`error${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={starRepo}
        disabled={loading}
        className={`px-4 py-2 text-white rounded-lg ${
          loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Starring..." : "Star Repo"}
      </button>
      {success && (
        <p className="text-green-600 mt-2">Repository starred successfully!</p>
      )}
      {error && <p className="text-red-600 mt-2">Error: {error}</p>}
    </div>
  );
};

export default StarRepoButton;
