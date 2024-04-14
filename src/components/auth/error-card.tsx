import { CardWrapper } from "./card-wrapper";
import { BiError } from "react-icons/bi";

export function ErrorCard() {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <BiError className="text-destructive h-6 w-6" />
      </div>
    </CardWrapper>
  );
}
