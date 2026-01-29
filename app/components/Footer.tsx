import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 md:px-0 text-center border-t border-dotted border-[#374151] mt-auto">
      <p className="text-sm font-mono text-black/60 mb-2">
        Made with <span className="text-[#ce0000]">&lt;3</span> by{" "}
        <Link
          href="https://harshiyer.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#037a68] hover:underline"
        >
          h0i5
        </Link>{" "}
        •{" "}
        <Link
          href="https://github.com/h0i5/foursight"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#037a68] hover:underline"
        >
          GitHub
        </Link>
      </p>
      <p className="text-xs font-mono text-black/50">
        &copy; {currentYear} Harsh Iyer. All rights reserved.
      </p>
    </footer>
  );
}
