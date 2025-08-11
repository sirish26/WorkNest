import Header from "@/components/header";


export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to WorkNest</h1>
        <p className="mt-2 text-gray-600">Your workspace for productivity.</p>
      </main>
    </div>
  );
}