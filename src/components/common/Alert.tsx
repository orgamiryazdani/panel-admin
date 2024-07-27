import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type props = {
  title: string;
  description: string;
};

const AlertMessage = ({ title, description }: props) => {
  return (
    <Alert className="">
      <Terminal className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertMessage;