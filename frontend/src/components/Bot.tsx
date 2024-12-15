export default function Bot({
  setShowQR,
}: {
  setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <li
      onClick={() => setShowQR((state) => !state)}
      className=" hover:bg-blue-700 p-2 rounded-md border border-blue-400 text-white cursor-pointer transition-all duration-200 text-center text-2xl font-mono"
    >
      Bot
    </li>
  );
}
