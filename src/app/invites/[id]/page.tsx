import { getChallenge } from "@/actions/challengeActions";
import { InviteDetails } from "@/components/invite";

interface Request {
    params: Promise<{ id: string }>
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