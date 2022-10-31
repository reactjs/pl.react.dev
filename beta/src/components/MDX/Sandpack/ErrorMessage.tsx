/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

interface ErrorType {
  title?: string;
  message: string;
  column?: number;
  line?: number;
  path?: string;
}

export function ErrorMessage({error, ...props}: {error: ErrorType}) {
  const {message, title} = error;

  return (
<<<<<<< HEAD:beta/src/components/MDX/Sandpack/Error.tsx
    <div className={'bg-white border-2 border-red-40 rounded-lg p-6'}>
      <h2 className="text-red-40 text-xl mb-4">{title || 'Błąd'}</h2>
      <pre className="text-secondary whitespace-pre-wrap break-words">
=======
    <div className="bg-white border-2 border-red-40 rounded-lg p-6" {...props}>
      <h2 className="text-red-40 text-xl mb-4">{title || 'Error'}</h2>
      <pre className="text-secondary whitespace-pre-wrap break-words leading-tight">
>>>>>>> e21b37c8cc8b4e308015ea87659f13aa26bd6356:beta/src/components/MDX/Sandpack/ErrorMessage.tsx
        {message}
      </pre>
    </div>
  );
}
