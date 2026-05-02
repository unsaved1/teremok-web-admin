import {signinInputDto, type TSigninInputDto} from '@/data/entity/auth/dto';
import {Box, Button, Field, Input, Show, Stack, type BoxProps} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';

const signinSchema = signinInputDto;

export interface ISigninFormProps extends Omit<BoxProps, 'children' | 'onSubmit'> {
    formData?: TSigninInputDto;
    onSubmit: (data: TSigninInputDto) => Promise<void>;
}

export const SigninForm = ({formData, onSubmit, ...props}: ISigninFormProps) => {
    const form = useForm({
        defaultValues: formData,
        resolver: zodResolver(signinSchema),
    });

    return (
        <Box asChild padding={'12px'} width={'full'} {...props}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Stack>
                    <Controller
                        control={form.control}
                        name='email'
                        render={({field, fieldState}) => (
                            <Field.Root invalid={fieldState.invalid}>
                                <Field.Label>Email</Field.Label>
                                <Input {...field} />
                                <Show when={fieldState.error?.message}>
                                    {errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}
                                </Show>
                            </Field.Root>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='password'
                        render={({field, fieldState}) => (
                            <Field.Root invalid={fieldState.invalid}>
                                <Field.Label>Пароль</Field.Label>
                                <Input {...field} />
                                <Show when={fieldState.error?.message}>
                                    {errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}
                                </Show>
                            </Field.Root>
                        )}
                    />
                    <Button type='submit'>Войти</Button>
                </Stack>
            </form>
        </Box>
    );
};
