interface FormMessageProps {
  message: string;
  isError?: boolean;
}

export function FormMessage({ message, isError = true }: FormMessageProps) {
  return (
    <p
      className={`text-[12.5px] rounded-lg px-3 py-2 border ${
        isError
          ? "text-destructive bg-destructive/8 border-destructive/20"
          : "text-success-l bg-success-l/8 border-success-l/20"
      }`}
    >
      {message}
    </p>
  );
}
