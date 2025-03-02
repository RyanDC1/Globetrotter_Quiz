import { getChallenge } from "@/actions/challengeActions";
import { InviteDetails } from "@/components/invite";
import { Challenge } from "@/models/challenge";
import { appRoutes } from "@/utils/Constants";
import { Metadata } from "next";
import { notFound, redirect } from 'next/navigation'

interface Request {
    params: Promise<{ id: string }>
}

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Globetrotter - Online Quiz",
        description: "An online quiz app to test your knowledge",
        metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
        openGraph: {
            images: '/og-image-whatsapp.png',
            title: 'Globetrotter - Explore the World Through Trivia',
            description: 'Expand your global knowledge with our fun and engaging trivia app. Learn interesting facts about cities and countries while challenging your friends.'
        }
    }
}


export default async function Invite(request: Request) {

    const { id } = await request.params

    return redirect(appRoutes.invite.replace('{id}', id))

    // let challengerDetails: Challenge | null = null
    // try {
    //     challengerDetails = await getChallenge(id as string)
    // } catch (error) {
    //     return notFound()
    // }

    // return (
    //     challengerDetails != null &&
    //     <InviteDetails
    //         {...challengerDetails}
    //     />
    // );
}