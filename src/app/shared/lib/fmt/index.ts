import {config} from '@/shared/config';

export class Fmt {
    private static priceIntl = new Intl.NumberFormat('ru-RU', {minimumFractionDigits: 0});
    private static dateIntl = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    private static dateTimeIntl = new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });
    static price(value: number) {
        const res = Fmt.priceIntl.format(value / config.app.shared.fmt.currencyDevisor);
        if (res.includes('число') || res === '0') {
            return '';
        }
        return res;
    }

    static date(value: Date) {
        return Fmt.dateIntl.format(value);
    }

    static dateTime(value: Date) {
        return Fmt.dateTimeIntl.format(value);
    }

    static byQt(qt: number, variants: [string, string, string]): string {
        const [fisrt, second, last] = variants;
        const fmtQt = qt.toString();
        if (
            fmtQt.endsWith('11') ||
            fmtQt.endsWith('12') ||
            fmtQt.endsWith('13') ||
            fmtQt.endsWith('14')
        ) {
            return last;
        }
        if (fmtQt.endsWith('1')) {
            return fisrt;
        }
        if (fmtQt.endsWith('2') || fmtQt.endsWith('3') || fmtQt.endsWith('4')) {
            return second;
        }
        return last;
    }
}
