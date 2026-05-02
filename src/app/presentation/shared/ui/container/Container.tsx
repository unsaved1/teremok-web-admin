import {Container, type ContainerProps} from '@chakra-ui/react';

export const CustomContainer = ({children, ...props}: ContainerProps) => {
    return (
        <Container maxWidth={'xl'} {...props}>
            {children}
        </Container>
    );
};
