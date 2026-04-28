'use client';

import {
    ChakraProvider,
    createSystem,
    defaultConfig,
    defineConfig,
    defineRecipe,
} from '@chakra-ui/react';
import {ColorModeProvider, type ColorModeProviderProps} from './color-mode';
import {Toaster} from './toaster';

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
                body: {value: 'Geist, sans-serif'},
                heading: {value: 'Poppins, sans-serif'},
                mono: {value: 'Fira Code, monospace'},
            },
            colors: {
                green: {
                    50: {value: '#eef5f1'},
                    100: {value: '#d7e5db'},
                    200: {value: '#b8d0c1'},
                    300: {value: '#91b59e'},
                    400: {value: '#6f9f82'},
                    500: {value: '#4f8368'},
                    600: {value: '#35634c'},
                    700: {value: '#245238'},
                    800: {value: '#1e3d2b'},
                    900: {value: '#173022'},
                    950: {value: '#102219'},
                },
            },
        },
        semanticTokens: {
            colors: {
                bg: {
                    value: {_light: '#f0ece4', _dark: '#151515'},
                },
                'surface.page': {
                    value: {_light: '#f0ece4', _dark: '#1b1b1b'},
                },
                'surface.card': {
                    value: {_light: '#ffffff', _dark: '#262626'},
                },
                'header.bg': {
                    value: {_light: '#1e3d2b', _dark: '#173022'},
                },
                'header.dot': {
                    value: {_light: '#6dbf7d', _dark: '#79cd88'},
                },
                'brand.forest': {
                    value: {_light: '#1e3d2b', _dark: '#245238'},
                },
                'brand.forestHover': {
                    value: {_light: '#245238', _dark: '#2b6244'},
                },
                'status.active.bg': {
                    value: {_light: '#d7e5db', _dark: '#2a4234'},
                },
                'status.active.fg': {
                    value: {_light: '#355f46', _dark: '#b8d6c0'},
                },
                'status.warning.bg': {
                    value: {_light: '#efece6', _dark: '#3b3935'},
                },
                'status.warning.fg': {
                    value: {_light: '#7a746c', _dark: '#d0cbc3'},
                },
            },
        },
        recipes: {
            button: defineRecipe({
                defaultVariants: {
                    colorPalette: 'green',
                },
            }),
        },
    },
    globalCss: {
        'html, body': {
            margin: 0,
            padding: 0,
        },
        html: {
            colorPalette: 'green',
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
            <Toaster />
        </ChakraProvider>
    );
}
