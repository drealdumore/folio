import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8">The page you are looking for does not exist.</p>
      <a 
        href="/" 
        className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
      >
        Go Home
      </a>
    </div>
  );
}