import { useRef, useState } from "react";
import Response from "./Response";

export default function AiInput() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = ref.current;

    if (input) {
      const question = input.value;
      input.value = ""; // Safely access the ref's value
      const url = new URL("http://localhost:5000/ai");

      url.searchParams.append("question", question);
      setLoading(true);
      try {
        const data = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!data.ok) {
          throw new Error(data.statusText);
        }

        const result = await data.json();
        setResponse(result.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="text-green-500 p-4 flex gap-4 flex-col justify-center "
      >
        <label htmlFor="inputai" className="text-2xl">
          Ask here :
        </label>
        <input
          ref={ref}
          type="text"
          id="inputai"
          className="text-black  rounded-md p-4 border border-blue-400 max-w-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 border border-blue-600 p-2 rounded-md hover:bg-blue-700 max-w-[100px]  text-white "
        >
          submit
        </button>
      </form>
      {loading ? (
        <p className="text-2xl font-mono text-center bg-slate-500 p-4 rounded-md">
          Loading...
        </p>
      ) : (
        <Response response={response} />
      )}
    </div>
  );
}
