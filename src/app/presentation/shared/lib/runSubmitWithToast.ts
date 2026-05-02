import {Delay} from '@/shared/lib/delay';
import {toaster} from '../ui/base/toaster';

interface IRunSubmitWithToastOptions {
    successTitle: string;
    successDescription?: string;
    errorTitle: string;
    errorDescription?: string;
    delayMs?: number;
}

export const runSubmitWithToast = async (
    submit: () => Promise<unknown>,
    {
        successTitle,
        successDescription,
        errorTitle,
        errorDescription,
        delayMs = 400,
    }: IRunSubmitWithToastOptions,
) => {
    try {
        await Promise.all([submit(), Delay.run(delayMs)]);

        toaster.create({
            type: 'success',
            title: successTitle,
            description: successDescription,
            closable: true,
        });

        return true;
    } catch {
        toaster.create({
            type: 'error',
            title: errorTitle,
            description: errorDescription,
            closable: true,
        });

        return false;
    }
};
