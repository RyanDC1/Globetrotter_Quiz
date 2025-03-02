import { getChallenge } from "@/actions/challengeActions";
import { InviteDetails } from "@/components/invite";
import { Challenge } from "@/models/challenge";
import { notFound } from "next/navigation";

interface Request {
    params: Promise<{ id: string }>
}

export default async function Invite(request: Request) {

    const { id } = await request.params

    let challengerDetails: Challenge | null = null
    try {
        challengerDetails = await getChallenge(id as string)
    } catch (error) {
        return notFound()
    }

    return (
        challengerDetails &&
        <InviteDetails
            {...challengerDetails}
        />
    );
}