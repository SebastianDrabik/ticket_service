import { AuthHeaderButton } from "./AuthHeaderButton";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-zinc-900 p-4 flex items-center gap-4">
      <Logo size="lg"/>
      <AuthHeaderButton className="ml-auto"/>
    </header>
  )
}
