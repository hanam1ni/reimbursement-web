import Input from "@/components/Input";

export default async function Login() {
  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold">Login</h1>
      <form className="flex flex-col gap-4">
        <div>
          <label className="block mb-2 text-gray-500">Email</label>
          <Input placeholder="john@mail.com" className="w-full" />
        </div>
        <div>
          <label className="block mb-2 text-gray-500">Password</label>
          <Input
            type="password"
            placeholder="Secure Password"
            className="w-full"
          />
        </div>
        <button className="btn btn-primary">Log In</button>
      </form>
    </section>
  );
}
