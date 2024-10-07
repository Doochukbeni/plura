import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Unauthorized = () => {
  return (
    <div className="p-4 text-center h-screen w-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl md:text-6xl">Unauthorized access</h1>
      <p className="">
        Please contact support or your agency owner to get access
      </p>
      <Link href="/" className={buttonVariants()}>
        Back to home
      </Link>
    </div>
  );
};

export default Unauthorized;