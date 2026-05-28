import { AuthHeaderButton } from "./AuthHeaderButton";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-zinc-900 p-4 text-center text-2xl font-bold text-white flex">
      <Logo />
      <AuthHeaderButton className="ml-auto"/>
    </header>
  )
}
