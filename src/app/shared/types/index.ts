import type {DetailedHTMLProps, HTMLAttributes, JSX, MouseEvent} from 'react';

export type TElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export type TDivProps = JSX.IntrinsicElements['div'];
export type TSpanProps = JSX.IntrinsicElements['span'];
export type TImgProps = JSX.IntrinsicElements['img'];
export type TFormProps = JSX.IntrinsicElements['form'];
export type TLabelProps = JSX.IntrinsicElements['label'];
export type TParagraphProps = JSX.IntrinsicElements['p'];
export type TUlProps = JSX.IntrinsicElements['ul'];
export type TNavProps = JSX.IntrinsicElements['nav'];
export type TLiProps = JSX.IntrinsicElements['li'];
export type TBtnProps = JSX.IntrinsicElements['button'];
export type TInputProps = JSX.IntrinsicElements['input'];

export type TBtnEvent = MouseEvent<HTMLButtonElement, globalThis.MouseEvent>;
