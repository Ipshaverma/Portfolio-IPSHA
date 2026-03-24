import data from "@/lib/data/data.json";

export function Footer() {
  return (
    <footer className="w-full py-8 text-center text-sm text-zinc-500 border-t border-zinc-900 bg-black">
      <p>&copy; {new Date().getFullYear()} {data.personal.footerName}. All rights reserved.</p>
    </footer>
  );
}
