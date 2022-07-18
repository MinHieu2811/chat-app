import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import Tooltip from "@mui/material/Tooltip"
import styled from "styled-components"
import ChatIcon from '@mui/icons-material/Chat'
import MoreVerticalIcon from '@mui/icons-material/MoreVert'
import LogoutIcon from '@mui/icons-material/Logout'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { signOut } from "firebase/auth"
import { auth, db } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState } from "react"
import * as EmailValidator from 'email-validator'
import { addDoc, collection, query, where } from "firebase/firestore"
import { useCollection } from 'react-firebase-hooks/firestore'
import { Conversation } from "../types"
import ConversationSelect from './CoversationSelect'

const StyledContainer = styled.div`
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    border-right: 1px solid whitesmoke;

    ::-webkit-scrollbar{
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
`

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
`

const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    border-radius: 2px;
`

const StyledUserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`

const StyledSearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
`

const StyledSidebarButton = styled(Button)`
    width: 100%;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
`

const Sidebar = () => {
    const [loggedInUser, _loading, _error] = useAuthState(auth)

    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const [recipientEmail, setRecipientEmail] = useState('')

    const toggleNewDialog = (isOpenDialog: boolean) => {
        setIsOpenDialog(isOpenDialog)

        if (!isOpenDialog) setRecipientEmail('')
    }

    const isInvitingSelf = recipientEmail === loggedInUser?.email

    const queryGetConversationForCurrentUser = query(collection(db, 'conversations'), where('users', 'array-contains', loggedInUser?.email))

    const [conversationSnapshot, __loading, __error] = useCollection(queryGetConversationForCurrentUser)

    const isConversationExists = (recipientEmail: string) => {
        return conversationSnapshot?.docs.find(conversation => (conversation.data() as Conversation).users.includes(recipientEmail))
    }

    const createConversation = async () => {
        if (!recipientEmail) return

        if (EmailValidator.validate(recipientEmail) && !isInvitingSelf && !isConversationExists(recipientEmail)) {
            // Add conversation user to db "conversations" collection
            // A conversation is between the currently logged in user and the user invited

            await addDoc(collection(db, 'conversations'), {
                users: [loggedInUser?.email, recipientEmail]
            })
        }

        toggleNewDialog(false)
    }

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (err) {
            console.log(err)
        }
    }

    // 1:43:42

    return (
        <StyledContainer>
            <StyledHeader>
                <Tooltip title={loggedInUser?.email as string} placement="right">
                    <StyledUserAvatar src={loggedInUser?.photoURL || ''} />
                </Tooltip>

                <div>
                    <IconButton>
                        <Tooltip title="Messages" placement="bottom">
                            <ChatIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton>
                        <Tooltip title="More Options" placement="bottom">
                            <MoreVerticalIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton onClick={logOut}>
                        <Tooltip title="Logout" placement="bottom">
                            <LogoutIcon />
                        </Tooltip>
                    </IconButton>
                </div>
            </StyledHeader>
            <StyledSearch>
                <SearchIcon />
                <StyledSearchInput placeholder='Search in conversation' />
            </StyledSearch>
            <StyledSidebarButton onClick={() => toggleNewDialog(true)}>
                Start a new conversation
            </StyledSidebarButton>

            {/* list of conversation */}
            {conversationSnapshot?.docs.map(conversation => <ConversationSelect key={conversation.id} id={conversation.id} conversationUsers={(conversation.data() as Conversation).users }/>)}

            <Dialog open={isOpenDialog} onClose={() => toggleNewDialog(false)}>
                <DialogTitle>New Conversation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a Google email address for the user you wish to chat with
                    </DialogContentText>
                    <TextField
                        autoFocus
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleNewDialog(false)}>Cancel</Button>
                    <Button disabled={!recipientEmail} onClick={createConversation}>Create</Button>
                </DialogActions>
            </Dialog>
        </StyledContainer>
    )
}

export default Sidebar