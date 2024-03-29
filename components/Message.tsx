import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth } from "../config/firebase"
import { IMessage } from "../types"

const StyledMessage = styled.p`
    width: fit-content;
    word-break: break-all;
    min-width: 30%;
    max-width: 90%;
    padding: 15px  15px 30px;
    margin: 10px;
    position: relative;
    border-radius: 8px;
`

const StyledSenderMessage = styled(StyledMessage)`
    margin-left: auto;
    background-color: #dcf8c6;
`

const StyledReceivedMessage = styled(StyledMessage)`
    background-color: whitesmoke;
`

const StyledTimestamp = styled.span`
    color: gray;
    padding: 10px;
    font-size: x-small;
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: right;
`

const Message = ({message} : {message: IMessage}) => {
    const [loggedInUser, _loading, _error] = useAuthState(auth)

    const MessageType = message.user === loggedInUser?.email ? StyledSenderMessage : StyledReceivedMessage
  return (
    <MessageType>{message.text}
        <StyledTimestamp>{message.sent_at}</StyledTimestamp>
    </MessageType>
  )
}

export default Message