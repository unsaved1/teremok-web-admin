import {Stack, type StackProps} from '@chakra-ui/react';

export const PageWrapperRoot = ({children, ...props}: StackProps) => {
    return (
        <Stack flex={'1'} {...props}>
            {children}
        </Stack>
    );
};

export const PageWrapperContent = ({children, ...props}: StackProps) => {
    return (
        <Stack flex={'1'} paddingX={'10px'} {...props}>
            {children}
        </Stack>
    );
};
