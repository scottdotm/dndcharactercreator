import { Label } from "./ui/label";
import { SubmitButton } from "@/components/submit-button";
import { FormMessage, Message } from "@/components/form-message";
import { signInAction } from "@/app/actions";

export default function Header() {
  return (
    <>
    <div className="flex gap-8 justify-center items-center">
      <h1>DnD Character Sheet</h1>
    </div>
    <div className="flex gap-8 justify-center items-center">
      <Label>Input Some Text About Character. (change this)</Label>
      <textarea>Box</textarea>
      <SubmitButton pendingText="Saving Character Data..." formAction={submitCharacterSheet}>
        Save Character Data.
      </SubmitButton>
    </div>
    </>
  )
}