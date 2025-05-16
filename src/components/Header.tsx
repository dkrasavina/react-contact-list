export default function Header() {
  const link = "https://github.com/dkrasavina";

  return (
    <>
      <h1 className="text-6xl text-pink-500">Contact List on JS</h1>
      <a href={link} className="text-blue-500 hover:underline">GitHub Repository link</a>
    </>
  );
}
