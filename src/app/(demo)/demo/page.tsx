'use client';

import HeaderNavPublic from '@/components/layouts/public/HeaderNavPublic';
import '@/styles/demo.css';

export default function Demo() {
  return (
    <>
      <HeaderNavPublic className="bg-card shadow-md" />

      <div className="container mx-auto flex gap-4 py-4">
        <div className="lg:w-1/2 w-full">
          <div className="card min-h-full bg-red-500">
            <div className="card-body">
              <h2 className="text-lg font-bold">Pick a Button</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
