import {MappingExc} from '@/shared/config';

function isObj(input: unknown): input is Record<string, unknown> {
    return typeof input === 'object' && input !== null;
}

export function wrapMappingFn<T, Y>(mappingFn: (input: Y) => T) {
    return (input: Y) => {
        try {
            return mappingFn(input);
        } catch (err) {
            throw new MappingExc(err as Error);
        }
    };
}

export function createTypeGuard<T>(data: unknown, needle: keyof T): T {
    if (!(isObj(data) && needle in data)) {
        throw new MappingExc();
    }
    return data as T;
}
