import {config} from '@/shared/config';

export class ImageLib {
    private static domain: string = config.apiDomain;

    static setDomain(domain: string) {
        this.domain = domain;
    }

    static createUrl(path: string) {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        return `${this.domain}/${path}`;
    }

    static generateQr(path: string) {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            return path;
        }
        return `${this.domain}/${path}`;
    }
}
