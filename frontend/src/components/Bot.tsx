export default function Bot({
  setShowQR,
}: {
  setShowQR: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <li
      onClick={() => setShowQR((state) => !state)}
      className=" hover:bg-blue-400 p-2 rounded-md border border-white cursor-pointer transition-all duration-200 text-center text-2xl font-mono"
    >
      Bot
    </li>
  );
}
