import { useState } from "react";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export default function PollResults() {
  const [pollId, setPollId] = useState<number>(-1);

  const { data } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getResults",
    args: [BigInt(pollId)],
  });

  return (
    <div className="p-6 bg-purple-400 text-white shadow-lg mx-auto w-full max-w-3xl">
      <h3 className="text-2xl font-bold mb-4">Результаты голосования</h3>
      <input
        type="number"
        placeholder="ID голосования"
        onChange={e => setPollId(e.target.value ? Number(e.target.value) : -1)}
        className="w-full p-2 mb-4 text-white rounded-lg bg-gray-800"
      />
      {data && (
        <div className="p-6 bg-gradient-to-r from-purple-600 text-white rounded-lg shadow-lg mx-auto w-full max-w-3xl">
          <ul>
            {data[0].map((option: string, idx: number) => (
              <li key={idx} className="text-lg mb-2">
                {option}: {Number(data[1][idx])} голосов
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
