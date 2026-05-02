import {Stack, type StackProps} from '@chakra-ui/react';

export const PageWrapperRoot = ({children, ...props}: StackProps) => {
    return (
        <Stack flex={'1'} pt={'6'} {...props}>
            {children}
        </Stack>
    );
};

export const PageWrapperContent = ({children, ...props}: StackProps) => {
    return (
        <Stack flex={'1'} {...props}>
            {children}
        </Stack>
    );
};
