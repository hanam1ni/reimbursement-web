import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function BackNavigation({ href }: { href: string }) {
  return (
    <Link href={href} className="flex items-center text-gray-600 font-medium">
      <FontAwesomeIcon className="w-4 h-4 mr-1" icon={faChevronLeft} />
      <span className="text-sm">Back</span>
    </Link>
  );
}
