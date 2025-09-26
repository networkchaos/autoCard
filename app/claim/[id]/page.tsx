import { ClaimLink } from "@/components/claim-link"

interface ClaimPageProps {
  params: {
    id: string
  }
}

export default function ClaimPage({ params }: ClaimPageProps) {
  return <ClaimLink linkId={params.id} />
}
