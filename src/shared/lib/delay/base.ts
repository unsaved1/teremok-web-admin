import type {Timeout} from '@/shared/types';

export class Delay {
    private static debounceTimeout: Timeout;

    static async debounce(fn: () => void, delay = 200) {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(fn, delay);
    }

    static throttle<T extends Array<any>>(
        timer: Timeout | null,
        callback: (...args: T) => void,
        delay = 200,
    ) {
        return (...args: T) => {
            if (timer) {
                return;
            }
            timer = setTimeout(() => {
                callback.apply(this, args);
                timer = null;
            }, delay);
        };
    }

    static run(ms = 1000) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
