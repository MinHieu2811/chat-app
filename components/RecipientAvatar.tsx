import Avatar from "@mui/material/Avatar"
import styled from "styled-components"
import { useRecipients } from "../hooks/useRecipients"

type Props = ReturnType<typeof useRecipients>

const StyledAvatar = styled(Avatar)`
  margin: 5px 15px 5px 5px;
`

const RecipientAvatar = ({ recipient, recipientEmail} : Props) => {
  return recipient?.photoURL ? <StyledAvatar src={recipient.photoURL} /> : <StyledAvatar>
    {recipientEmail && recipientEmail[0].toUpperCase()}
  </StyledAvatar>
}

export default RecipientAvatar