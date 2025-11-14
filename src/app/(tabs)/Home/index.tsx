import { Avatar, XStack } from "tamagui";

export default function Dashboard() {
    return (
        <XStack>
            <Avatar circular size="$6" ai={"center"} jc={"center"}>
                <Avatar.Image src="http://picsum.photos/200/300" />
                <Avatar.Fallback bc="red" />
            </Avatar>
           
            
        </XStack>
    )
}