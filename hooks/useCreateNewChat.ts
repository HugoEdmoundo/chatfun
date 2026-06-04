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
        if (members.length < 2) {
            throw new Error("At least 2 members are required to start a chat");
        }

        const isGroupChat = members.length > 2;
        const sortedMembers = [...members].sort();

        if (!isGroupChat) {
            try {
                const existingChannel = await streamClient.queryChannels(
                    { type: "messaging", members: { $in: sortedMembers }, member_count: 2 },
                    { created_at: -1 },
                    { limit: 1, state: true }
                );

                if (existingChannel.length > 0) {
                    const channel = existingChannel[0];
                    const channelMembers = Object.keys(channel.state.members).sort();

                    if (
                        channelMembers.length === 2 &&
                        sortedMembers.every((member) => channelMembers.includes(member))
                    ) {
                        return channel;
                    }
                }
            } catch (error) {
                console.error("Error checking existing chat:", error);
            }
        }

        const channelId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        const channelData: {
            members: string[];
            createdBy: string;
            name?: string;
            description?: string;
        } = {
            members: sortedMembers,
            createdBy,
        };

        if (isGroupChat) {
            channelData.name = groupName || `Group Chat (${members.length}) members`;
            if (groupDescription) channelData.description = groupDescription;
        }

        const channel = streamClient.channel(
            isGroupChat ? "team" : "messaging",
            channelId,
            channelData
        );
        await channel.watch({ presence: true });

        return channel;
    };
    return createNewChat;
};
