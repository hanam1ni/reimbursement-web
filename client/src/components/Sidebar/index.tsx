import Navigation from "../Navigation";

export default function Sidebar() {
  return (
    <aside className="fixed w-[200px] h-screen pt-6 shadow-md bg-white ">
      <div className="w-full pl-4 mb-12 flex items-center">
        <div className="px-4 py-3 mr-2 rounded-md bg-black text-xl text-white">
          C
        </div>{" "}
        <div className="font-semibold">Criclabs</div>
      </div>
      <Navigation />
    </aside>
  );
}
