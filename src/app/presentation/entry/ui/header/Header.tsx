import {ColorModeButton} from '@/app/presentation/shared/ui/base/color-mode';
import {Button, Icon, Stack, Text} from '@chakra-ui/react';
import {
    DrawerContent,
    DrawerRoot,
    DrawerTrigger,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
    DrawerFooter,
    DrawerCloseTrigger,
} from '@/app/presentation/shared/ui/base/drawer';
import {LuAlignJustify} from 'react-icons/lu';

export const Header = () => {
    return (
        <Stack
            paddingY={'15px'}
            paddingX={'10px'}
            direction={'row'}
            justifyContent={'space-between'}
        >
            <Text>Admin panel</Text>
            <Stack direction={'row'} gap={'6px'}>
                <ColorModeButton />
                <DrawerRoot>
                    <DrawerTrigger asChild>
                        <Button variant='outline' size='sm'>
                            <Icon size={'lg'}>
                                <LuAlignJustify />
                            </Icon>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent background={'green.300'}>
                        <DrawerHeader>
                            <DrawerTitle>Drawer Title</DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant='outline'>Cancel</Button>
                            <Button>Save</Button>
                        </DrawerFooter>
                        <DrawerCloseTrigger />
                    </DrawerContent>
                </DrawerRoot>
            </Stack>
        </Stack>
    );
};
