import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        {/* Badge Example */}
        <Badge variant={"default"} className="font-normal pointer-events-none">
        Badge Example
        </Badge>
        {/* Button Example */}
        <Button asChild size="sm" variant={"outline"} >
          {/* Link Example */}
          <Link href="/sign-in">Sign in</Link>
        </Button>
        {/* Disabled Button Example */}
        <Button asChild size="sm"  disabled className="opacity-75 cursor-none pointer-events-none" >
          <Link href="/sign-up">Sign up</Link>
        </Button>
        {/* Input */}
        <Input></Input>
        {/* Notice we have to import our components from ./ui/FILENAME  */}
      </div>
      <div className="flex gap-8 justify-center items-center">
        <h1>DnD Character Sheet</h1>
      </div>
      <div className="flex gap-8 justify-center items-center">
        <Label>Input Some Text About Character. (change this)</Label>
        <textarea>Box</textarea>
      </div>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
