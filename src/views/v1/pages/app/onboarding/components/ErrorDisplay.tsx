interface ErrorDisplayProps {
  message: string | null | undefined;
}

function ErrorDisplay(props: ErrorDisplayProps) {
  if (!props.message) {
    return null;
  }

  return (
    <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-300 px-4 py-3 rounded-md relative mt-4 w-full">
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline ml-2">{props.message}</span>
    </div>
  );
}

export default ErrorDisplay;
