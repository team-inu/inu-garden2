'use client';

// Error components must be Client Components
import Image from 'next/image';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <h2 className="text-xl font-bold">Something went wrong! </h2>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
        <Image
          className=""
          src="https://media.tenor.com/O_x4UCmt5p0AAAAi/among-us-twerk.gif"
          alt={''}
          width={160}
          height={160}
        />
      </div>
    </div>
  );
}