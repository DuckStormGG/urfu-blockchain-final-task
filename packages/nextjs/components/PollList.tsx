import EndPoll from "~~/components/EndPoll";
import HasUserVoted from "~~/components/HasUserVoted";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function PollList() {
  const { data: pollCount } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getPollCount",
  });
  const renderPolls = () => {
    if (!pollCount) return <p>Загрузка...</p>;
    const polls = [];
    for (let i: number = 0; i < pollCount; i++) {
      polls.push(<PollItem key={i} pollId={BigInt(i)} />);
    }
    return polls;
  };

  return (
    <div className="p-6 bg-purple-400 text-white shadow-lg mx-auto w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Список голосований</h2>
      {pollCount && pollCount > 0 ? renderPolls() : <p className="text-xl">Нет активных голосований</p>}
    </div>
  );
}

function PollItem({ pollId }: { pollId: bigint }) {
  const { data } = useScaffoldReadContract({
    contractName: "VotingContract",
    functionName: "getPollDetails",
    args: [BigInt(pollId)],
  });

  const { writeContractAsync } = useScaffoldWriteContract("VotingContract");
  if (!data) return <p>Загрузка...</p>;

  const [question, options, , isActive] = data;
  return (
    <div className="p-6 bg-yellow-400 text-white shadow-lg mx-auto w-full max-w-3xl">
      <h3 className="text-xl font-semibold text-black">{question}</h3>
      <ul className="mt-2 mb-4 ">
        {options.map((opt: string, idx: number) => (
          <li key={idx} className="flex justify-between items-center">
            <span className="text-black">{opt}</span>
            {isActive && (
              <button
                onClick={() =>
                  writeContractAsync({
                    functionName: "vote",
                    args: [BigInt(pollId), BigInt(idx)],
                  })
                }
                className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 my-1"
              >
                Голосовать
              </button>
            )}
          </li>
        ))}
      </ul>
      {!isActive && <p className="text-red-500">Голосование завершено</p>}
      {isActive && <EndPoll pollId={pollId} />}
      <HasUserVoted pollId={pollId} />
    </div>
  );
}
