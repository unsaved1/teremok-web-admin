type Level = 'debug' | 'info' | 'warn' | 'error';
const sym = Symbol.for('LogCtxKeySym');
type LogCtx = {
    parentScope?: string;
    [sym]?: unknown;
};

const LEVELS: Record<Level, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

const MIN: Level = import.meta.env.DEV ? 'debug' : 'warn';

export class Logging {
    private scope: string;
    private ctx: LogCtx;

    constructor(scope?: string, ctx?: LogCtx) {
        this.scope = scope || '';
        this.ctx = ctx || {};
    }

    child(ctx: LogCtx) {
        return new Logging(this.scope, {...this.ctx, ...ctx});
    }

    private log(level: Level, msg: string, ctx?: LogCtx) {
        if (LEVELS[level] < LEVELS[MIN]) return;

        console[level]({
            level,
            msg,
            ts: new Date().toISOString(),
            ...(this.scope ? {scope: this.scope} : {}),
            ...this.ctx,
            ...ctx,
        });
    }
    debug(msg: string, ctx?: LogCtx) {
        this.log('debug', msg, ctx);
    }
    info(msg: string, ctx?: LogCtx) {
        this.log('info', msg, ctx);
    }
    warn(msg: string, ctx?: LogCtx) {
        this.log('warn', msg, ctx);
    }
    error(msg: string, ctx?: LogCtx) {
        this.log('error', msg, ctx);
    }
}
