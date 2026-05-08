import {ColorModeButton} from '@/app/presentation/shared/ui/base/color-mode';
import {Box, Button, Center, HStack, Icon, Stack, Text} from '@chakra-ui/react';
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
import {Link} from '@tanstack/react-router';

const navItems = [
    {label: 'Дашборд', to: '/'},
    {label: 'Домики', to: '/houses'},
] as const;

export const Header = () => {
    return (
        <Center
            paddingY={'12px'}
            paddingX={'12px'}
            background='header.bg'
            border='1px solid'
            borderColor='whiteAlpha.300'
        >
            <HStack w={'full'} maxW='lg' justifyContent={'space-between'} alignItems='center'>
                <HStack gap='2.5'>
                    <Box boxSize='8px' borderRadius='full' background='header.dot' />
                    <Text asChild color='white' fontWeight='500'>
                        <Link to='/'>Teremok Admin</Link>
                    </Text>
                </HStack>
                <HStack gap={'6px'}>
                    <ColorModeButton />
                    <DrawerRoot>
                        <DrawerTrigger asChild>
                            <Button size='sm'>
                                <Icon size={'lg'}>
                                    <LuAlignJustify />
                                </Icon>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent background='surface.page'>
                            <DrawerHeader>
                                <DrawerTitle>Навигация</DrawerTitle>
                            </DrawerHeader>
                            <DrawerBody>
                                <Stack gap='2'>
                                    {navItems.map(item => (
                                        <Button
                                            key={item.to}
                                            asChild
                                            justifyContent='flex-start'
                                            variant='ghost'
                                        >
                                            <Link to={item.to}>{item.label}</Link>
                                        </Button>
                                    ))}
                                    <Stack gap='1' pt='2'>
                                        <Text px='3' py='1' fontSize='sm' color='fg.muted'>
                                            Контент
                                        </Text>
                                        <Button asChild justifyContent='flex-start' variant='ghost' pl='6'>
                                            <Link to='/content'>Услуги</Link>
                                        </Button>
                                        <Button asChild justifyContent='flex-start' variant='ghost' pl='6'>
                                            <Link to='/content/info-sections'>
                                                Информационный раздел
                                            </Link>
                                        </Button>
                                        <Button asChild justifyContent='flex-start' variant='ghost' pl='6'>
                                            <Link to='/content/contacts'>Контакты</Link>
                                        </Button>
                                    </Stack>
                                </Stack>
                            </DrawerBody>
                            <DrawerFooter>
                                <Text fontSize='sm' color='blackAlpha.700'>
                                    Админ-панель
                                </Text>
                            </DrawerFooter>
                            <DrawerCloseTrigger />
                        </DrawerContent>
                    </DrawerRoot>
                </HStack>
            </HStack>
        </Center>
    );
};
