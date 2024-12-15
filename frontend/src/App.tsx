import { useRef, useState } from "react";
import AiInput from "./components/AiInput";
import Bot from "./components/Bot";
import "./index.css";
function App() {
  const [showQR, setShowQR] = useState(false);
  const ref = useRef(null);
  console.log(ref);
  // function handleClickOutside(event: Event) {
  //   if (ref.current && event.target !== ref.current) {
  //     console.log("clicked outside");
  //     setShowQR(false);
  //   }
  // }
  return (
    <div
      className="bg-slate-900 h-screen overflow-hidden"
      // onMouseUp={handleClickOutside}
      // onMouseDown={handleClickOutside}
    >
      <nav>
        <ul className="flex justify-between px-12 py-4 items-center  bg-slate-700 ">
          <li className=" text-center  text-white text-2xl font-mono">
            AI demo
          </li>
          <Bot setShowQR={setShowQR} />
        </ul>
      </nav>
      {showQR && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-blue-900 bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-10">
          <div className="relative max-w-full max-h-full flex justify-center items-center ">
            <img
              ref={ref}
              src="bot.png"
              alt="QR Code"
              className="max-w-xl max-h-xl rounded-lg "
            />
          </div>
        </div>
      )}
      <AiInput />
    </div>
  );
}
export default App;
