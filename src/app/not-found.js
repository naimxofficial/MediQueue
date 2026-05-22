'use client';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content flex flex-col items-center justify-center px-4 transition-colors duration-200">
      <div className="text-center max-w-md">
        {/* Visual Badge / Status */}
        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-2">
          404 Error
        </p>
        
        {/* Main Heading */}
        <h1 className="text-4xl font-extrabold sm:text-5xl mb-4 tracking-tight">
          Page not found
        </h1>
        
        {/* Description */}
        <p className="text-base text-base-content/70 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or perhaps it never existed.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/" 
            className="btn btn-primary text-primary-content shadow-lg shadow-primary/20 hover:shadow-none transition-all"
          >
            Go Back Home
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="btn btn-ghost border border-base-300 hover:bg-base-200"
          >
            Previous Page
          </button>
        </div>
      </div>
    </div>
  );
}