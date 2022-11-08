import { Spacer } from "@nextui-org/react"
import DiscussionsChatScreen from "../../../components/Discussions/ChatScreen"
import DiscussionsSendWidget from "../../../components/Discussions/SendWidget"
import ViewDoubtsView from "../../../components/Doubts/View/info"
import ViewDoubtsResponse from "../../../components/Doubts/View/Response"

export default function DoubtsViewContainer(params) {
  return(
    <>
    <ViewDoubtsView />
    <Spacer y={0.5} /> 
    <ViewDoubtsResponse/>
    </>
  )
}
