import { getChallenge } from "@/actions/challengeActions";
import { InviteDetails } from "@/components/invite";
import { Metadata } from "next";

interface Request {
    params: Promise<{ id: string }>
}

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { searchParams }: Props
): Promise<Metadata> {
    // read route params
    const test = searchParams?.['test']

    return {
        title: "Globetrotter - Online Quiz",
        description: "An online quiz app to test your knowledge",
        metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
        openGraph: {
            images: (test?.length || 0) > 0 ? '/og-image.jpg' : '/api/og',
            title: 'Globetrotter - Explore the World Through Trivia',
            description: 'Expand your global knowledge with our fun and engaging trivia app. Learn interesting facts about cities and countries while challenging your friends.'
        }
    }
}


export default async function Invite(request: Request) {

    const { id } = await request.params

    const challengerDetails = await getChallenge(id as string)

    return (
        <InviteDetails
            {...challengerDetails}
        />
    );
}