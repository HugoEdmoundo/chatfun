import streamClient from "@/lib/stream";

export const useCreateNewChat = () => {
    const createNewChat = async ({
        members,
        createdBy,
        groupName,
        groupDescription,
    }: {
        members: string[];
        createdBy: string;
        groupName?: string;
        groupDescription?: string;
    }) => {
        const isGroupChat = members.length > 2;
        if (!isGroupChat) {
            const sortedMembers = [...members].sort();
            const existingChannel = await streamClient.queryChannels(
                { type: "messaging", members: { $eq: sortedMembers } },
                { created_at: -1 }, { limit: 1 }
            )

            if (existingChannel.length > 0) {
                const channel = existingChannel[0];
                await channel.watch();
                const channelMembers = Object.keys(channel.state.members).sort();

                if (channelMembers.length === 2 &&
                    sortedMembers.length === 2 &&
                    sortedMembers.every((member) => channelMembers.includes(member))
                ) {
                    return channel;
                }
            }

        }

        const sortedMembers = [...members].sort();
        const channelId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        try {
            const channelData: {
                members: string[];
                createdBy: string;
                name?: string;
                description?: string;
            } = {
                members: sortedMembers,
                createdBy,
            }

            if (isGroupChat) {
                channelData.name = groupName || `Group Chat (${members.length}) members`;
                if (groupDescription) channelData.description = groupDescription;
            }

            const channel = streamClient.channel(
                isGroupChat ? "team" : "messaging",
                channelId,
                channelData
            );
            await channel.watch({
                presence: true,
            });

            return channel;

        } catch (error) {
            throw error;
        }
    }
    return createNewChat;
}
