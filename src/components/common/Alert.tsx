import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type props = {
  title: string;
  description: string;
};

const AlertDemo = ({ title, description }: props) => {
  return (
    <Alert className="bg-red-600 w-96 h-20">
      <Terminal className='h-4 w-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default AlertDemo;