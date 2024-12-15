import { useRef, useState } from "react";
import Response from "./Response";

export default function AiInput() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = ref.current;

    if (input) {
      const question = input.value;
      input.value = ""; // Safely access the ref's value
      const url = new URL("http://localhost:8000/ai");

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
        <textarea
          ref={ref}
          rows={4}
          cols={50}
          id="inputai"
          className="text-black  rounded-md p-4 border border-blue-400 max-w-2xl  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
      ) : response ? (
        <Response response={response} />
      ) : (
        <p className="text-sm text-gray-500 font-mono absolute bottom-4 left-4">
          check out how to setup Telegram Bot{" "}
          <a
            className="text-blue-500 underline underline-offset-2"
            href="https://github.com/Ferhatmedtahar/nodeAI"
            tabIndex={-1}
            target="_blank"
          >
            here
          </a>
        </p>
      )}
    </div>
  );
}
