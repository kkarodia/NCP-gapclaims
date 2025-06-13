// File 1: app/claim/[id]/page.tsx (Server Component)
import ClaimDetailsClient from './client';

// This runs on the server at build time
export async function generateStaticParams() {
  const claimIds = [
    'claim-1',
    'claim-2', 
    'claim-3',
    'claim-4',
    'claim-5'
  ];
  
  return claimIds.map((id) => ({
    id: id,
  }));
}

interface ClaimDetailsProps {
  params: {
    id: string;
  };
}

// Server component that passes data to client component
export default function ClaimDetailsPage({ params }: ClaimDetailsProps) {
  return <ClaimDetailsClient params={params} />;
}