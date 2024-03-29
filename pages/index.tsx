import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { FormEvent, useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import db from "../firebase";
import Todo from "../components/Todo";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<DocumentData[]>([]);

  useEffect(() => {
    // unsub to avoid multiple connection to your db...
    return onSnapshot(
      query(
        collection(db, "todos"),
        orderBy("completed", "asc"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => setTodos(snapshot.docs),
      (err) => console.error(err)
    );
    //return () => unsub();  const unsub //handle clenub
  }, [db]);
  // console.log(todos);

  const addTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const copiedInput = input;
    setInput("");
    await addDoc(collection(db, "todos"), {
      title: copiedInput,
      timestamp: serverTimestamp(),
      completed: false,
    }).catch((error) => console.error("Error addding Document: ", error));
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="py-10 px-5 md:p-10 bg-white h-screen overflow-y-scroll">
        {/* relative fill in parent containr */}
        <div className="relative h-32 mx-auto mb-5 md:h-48 lg:h-64 md:mb-8 lg:mb-10">
          <Image
            className="object-contain"
            src="https://links.papareact.com/qy0"
            alt=""
            fill
          />
        </div>
        <form
          onSubmit={addTodo}
          className="flex items-center space-x-2 max-w-lg mx-auto justify-center bg-slate-200/50 p-2 rounded-lg fixed bottom-10 left-0 right-0 z-50 shadow-xl "
        >
          <input
            type="text"
            placeholder="Enter a TODO..."
            value={input}
            className="flex-1 p-5 rounded-lg outline-none"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={!input} className="p-3 curs">
            <PlusCircleIcon className="h-12 w-12 text-[#35E2BC] disabled:cursor-not-allowed" />
          </button>
        </form>
        {/* rendering the todos */}
        <div className="p-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto pb-64">
          {todos?.map((todo, index) => (
            <Todo key={todo.id} id={todo.id} index={index} todo={todo.data()} />
          ))}
        </div>
      </main>
    </>
  );
}
