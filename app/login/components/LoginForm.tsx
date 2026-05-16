import Link from "next/link";

export default function SignUpForm() {
  return (
    <div className="bg-muted p-8 px-12 text-lg my-8 md:text-2xl flex mx-8">
      <form className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          className="form-input"
          type="text"
          id="username"
          name="username"
        />

        <label htmlFor="password">Password</label>
        <input
          className="form-input green-text"
          type="password"
          id="password"
          name="password"
        />
        <div className="flex justify-center items-center w-full">
          <button
            className="bg-brand p-2 text-brand-foreground flex w-fit justify-center mt-4"
            type="submit"
          >
            Login
          </button>
        </div>
        <div className="text-sm flex justify-center items-center font-semibold">
          <p className="mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/signup">
              <span className="text-brand">Signup</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
