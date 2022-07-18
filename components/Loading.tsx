import styled from "styled-components"
import WhatsApp from '../assets/images/whatsapplogo.png';
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const StyledImageWrapper = styled.div`
    margin-bottom: 50px;
`


const Loading = () => (
    <StyledContainer>
        <StyledImageWrapper>
            <Image src={WhatsApp} alt='logo' height='200px' width='200px' />
        </StyledImageWrapper>
        <CircularProgress />
    </StyledContainer>
)

export default Loading