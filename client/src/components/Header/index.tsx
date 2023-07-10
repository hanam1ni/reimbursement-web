import { authenticate } from "@/service/userService";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Header() {
  const user = await authenticate();

  return (
    <header className="flex justify-between items-baseline pt-12 pb-2 mb-6 border-b border-b-gray-300">
      <div className="text-xl font-bold">
        {user.firstName} {user.lastName}
      </div>
      <div>
        <div className="h-8 w-8 flex justify-center items-center text-white bg-black rounded-full">
          <FontAwesomeIcon icon={faUser} />
        </div>
      </div>
    </header>
  );
}
