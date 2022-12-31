import db from "../firebase";
import { DocumentData, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";

type Props = {
  todo: DocumentData;
  id: string;
  index: number;
};

function Todo({ todo: { title, timestamp, completed }, id, index }: Props) {
  const removeTodo = async () => {
    await deleteDoc(doc(db, "todos", id)).catch((error) =>
      console.error("Error Removing DOCUMENT: ", error)
    );
  };
  const toggleTodoCompletion = async () => {
    updateDoc(doc(db, "todos", id), {
      completed: !completed,
    }).catch((error) => console.error("Error updating the TODO: ", error));
  };

  return (
    <div
      className={`p-5 h-64 items-center rounded-md hover:scale-105 transition-all duration-100 ease-out relative space-x-4 ${
        completed ? "bg-gray-200 text-gray-200" : "bg-yellow-200 shadow-md"
      }`}
    >
      <div className="flex space-x-3 justify-between items-center">
        <div>
          {completed ? (
            <CheckCircleIcon
              className="h-10 text-green-500 cursor-pointer"
              onClick={toggleTodoCompletion}
            />
          ) : (
            <CheckCircleIcon
              className="h-10 text-gray-300/50 cursor-pointer"
              onClick={toggleTodoCompletion}
            />
          )}
        </div>
        <div>
          <TrashIcon
            onClick={removeTodo}
            className="h-6 text-red-500/80 cursor-pointer"
          />
        </div>
      </div>
      <div className="overflow-y-scroll scrollbar-hide h-32">
        <p>{title}</p>
      </div>
      <p>{timestamp?.toDate().toLocaleString()}</p>
    </div>
  );
}

export default Todo;
