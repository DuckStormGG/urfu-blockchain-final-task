import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function EndPoll({ pollId }: { pollId: bigint }) {
  const { writeContractAsync, isMining } = useScaffoldWriteContract("VotingContract");
  const handleEndPoll = async () => {
    try {
      await writeContractAsync({
        functionName: "endPoll",
        args: [pollId],
      });
      alert("Голосование завершено!");
    } catch (error) {
      console.error(error);
      alert("Ошибка при завершении голосования.");
    }
  };

  return (
    <div className="p-4 bg-red-500 text-white shadow-md mt-4 w-full max-w-3xl">
      <h3 className="text-xl font-bold">Завершить голосование</h3>
      <p>Вы уверены, что хотите завершить голосование?</p>
      <button
        onClick={handleEndPoll}
        disabled={isMining}
        className={`mt-4 px-6 py-2 ${isMining ? "bg-gray-500" : "bg-red-700 hover:bg-red-800"}`}
      >
        {isMining ? "Завершение..." : "Завершить голосование"}
      </button>
    </div>
  );
}
