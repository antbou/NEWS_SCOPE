import { Spinner } from '@/components/ui/Spinner';
import React from 'react';

export default function loading() {
  return (
    <div className="flex items-center justify-center">
      <Spinner size={8}></Spinner>
    </div>
  );
}
