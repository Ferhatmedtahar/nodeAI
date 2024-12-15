import { marked } from "marked";
import { useEffect, useState } from "react";

export default function Response({ response }: { response: string }) {
  const [readableRes, setReadableRes] = useState<string>("");

  useEffect(() => {
    // Convert the markdown to readable text using marked when the response changes
    const markdownToHtml = async () => {
      const html = await marked(response);
      setReadableRes(html);
    };

    markdownToHtml();
  }, [response]);

  return (
    <div className="text-2xl font-mono  bg-blue-900 text-green-50 p-4 rounded-md">
      <div dangerouslySetInnerHTML={{ __html: readableRes }} />
    </div>
  );
}
