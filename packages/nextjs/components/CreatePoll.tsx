import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function CreatePoll() {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [optionInput, setOptionInput] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);

  const { writeContractAsync, isMining } = useScaffoldWriteContract("VotingContract");

  const addOption = () => {
    if (optionInput.trim()) {
      setOptions([...options, optionInput.trim()]);
      setOptionInput("");
    }
  };

  const createPoll = async () => {
    if (question && options.length > 1 && duration > 0) {
      await writeContractAsync({
        functionName: "createPoll",
        args: [question, options, BigInt(duration)],
      });
    } else {
      alert("Пожалуйста, заполните все поля корректно.");
    }
  };

  return (
    <div className="p-6 bg-purple-400 text-white shadow-lg mx-auto w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Создать голосование</h2>
      <input
        type="text"
        placeholder="Тема голосования"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        className="w-full p-2 mb-4 text-white bg-gray-800"
      />
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={optionInput}
          onChange={e => setOptionInput(e.target.value)}
          className="flex-1 p-2 mr-2 text-white bg-gray-800"
        />
        <button onClick={addOption} className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600">
          Добавить вариант
        </button>
      </div>
      <ul className="mb-4">
        {options.map((opt, idx) => (
          <li key={idx} className="text-lg">
            {opt}
          </li>
        ))}
      </ul>
      <input
        type="number"
        placeholder="Длительность (в секундах)"
        value={duration}
        onChange={e => setDuration(Number(e.target.value))}
        className="w-full p-2 mb-4 text-white  bg-gray-800"
      />
      <button
        onClick={createPoll}
        disabled={isMining}
        className={`w-full py-2 text-white ${isMining ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {isMining ? "Создание..." : "Создать голосование"}
      </button>
    </div>
  );
}
