'use client';

import {ChakraProvider, createSystem, defaultConfig, defineConfig} from '@chakra-ui/react';
import {ColorModeProvider, type ColorModeProviderProps} from './color-mode';

const config = defineConfig({
    disableLayers: true,
    cssVarsRoot: ':where(:root, :host)',
    cssVarsPrefix: 'trmk',
    theme: {
        breakpoints: {
            sm: '320px',
            md: '768px',
            lg: '960px',
            xl: '1200px',
        },
        tokens: {
            fonts: {
                body: {value: 'Roboto, sans-serif'},
                heading: {value: 'Poppins, sans-serif'},
                mono: {value: 'Fira Code, monospace'},
            },
        },
        semanticTokens: {
            colors: {
                bg: {
                    value: {_light: '{colors.green}', _dark: '{colors.black}'},
                },
                accent: {value: '{colors.green}'},
                textColor: {value: '{colors.black}'},
            },
        },
    },
    globalCss: {
        'html, body': {
            margin: 0,
            padding: 0,
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
        },
        '#root': {
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
        },
    },
});

const system = createSystem(defaultConfig, config);

export function UiProvider(props: ColorModeProviderProps) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    );
}
