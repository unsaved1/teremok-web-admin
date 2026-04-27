import {createHouseInputDto, type TCreateHouseInputDto} from '@/data/entity/house/dto';
import type {ICreateHouseInput} from '@/domain/entity/house/interfaces';
import {Button, Field, Input, Show, Stack, type StackProps} from '@chakra-ui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import type {ChangeEvent} from 'react';
import {Controller, useForm, type FieldValues, type Control, type FieldPath} from 'react-hook-form';

const schema = createHouseInputDto;

export interface IHouseFormProps extends Omit<StackProps, 'children' | 'onSubmit'> {
    formData?: ICreateHouseInput;
    onSubmit: (data: TCreateHouseInputDto) => Promise<void>;
}

export const HouseForm = ({formData, onSubmit, ...props}: IHouseFormProps) => {
    const form = useForm({
        defaultValues: formData,
        resolver: zodResolver(schema),
    });

    return (
        <Stack asChild {...props}>
            <form
                onSubmit={form.handleSubmit(data => {
                    console.log(data);
                    onSubmit(data);
                })}
            >
                <Controller
                    control={form.control}
                    name='name'
                    render={({field, fieldState}) => (
                        <Field.Root>
                            <Field.Label>Название</Field.Label>
                            <Input {...field} />
                            <Show when={fieldState.error?.message}>
                                {errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}
                            </Show>
                        </Field.Root>
                    )}
                />
                <Controller
                    control={form.control}
                    name='description'
                    render={({field, fieldState}) => (
                        <Field.Root>
                            <Field.Label>Описание</Field.Label>
                            <Input {...field} value={field.value ?? ''} />
                            <Show when={fieldState.error?.message}>
                                {errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}
                            </Show>
                        </Field.Root>
                    )}
                />
                <ControllerNumber control={form.control} name='beds' label='Кол-во спальных мест' />
                <ControllerNumber control={form.control} name='price' label='Цена' />
                <Button type='submit'>{formData ? 'Сохранить' : 'Создать'} </Button>
            </form>
        </Stack>
    );
};

interface IControllerNumber<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label: string;
}

function ControllerNumber<T extends FieldValues>({control, name, label}: IControllerNumber<T>) {
    const handleTransformInput = (value: number) =>
        isNaN(value) || value === 0 ? '' : value.toString();
    const handleTransformOutput = (e: ChangeEvent<HTMLInputElement>) => {
        const output = parseInt(e.target.value, 10);
        return isNaN(output) ? 0 : output;
    };
    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState}) => (
                <Field.Root>
                    <Field.Label>{label}</Field.Label>
                    <Input
                        {...field}
                        value={handleTransformInput(field.value)}
                        onChange={e => field.onChange(handleTransformOutput(e))}
                    />
                    <Show when={fieldState.error?.message}>
                        {errMsg => <Field.ErrorText>{errMsg}</Field.ErrorText>}
                    </Show>
                </Field.Root>
            )}
        />
    );
}
