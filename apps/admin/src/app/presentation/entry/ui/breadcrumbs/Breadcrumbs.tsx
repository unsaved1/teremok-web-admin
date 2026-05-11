import {Breadcrumb} from '@chakra-ui/react';
import {getRouteApi, useMatches} from '@tanstack/react-router';
import {Fragment} from 'react/jsx-runtime';

export const Breadcrumbs = () => {
    const matches = useMatches();

    return (
        <Breadcrumb.Root>
            <Breadcrumb.List gap='4'>
                {matches.map((m, i) => {
                    console.log(m);
                    let title;
                    if (m.routeId === '__root__') {
                        title = 'Главная';
                    }
                    if ('breadcrumbTitle' in m.staticData) {
                        title = m.staticData.breadcrumbTitle as string;
                    }
                    const spittedRouteId = m.routeId.split('/');
                    if (spittedRouteId.length > 1) {
                        if (spittedRouteId[spittedRouteId.length - 2].includes('edit')) {
                            title = 'Редактирование';
                        }
                        if (spittedRouteId[spittedRouteId.length - 1].includes('create')) {
                            title = 'Создание';
                        }
                    }
                    const next = i > 0 ? matches[i + 1] : null;
                    const isTheSameLastRoute =
                        i === matches.length - 2 &&
                        next &&
                        next.pathname.substring(0, next.pathname.length - 1) === m.pathname &&
                        next.pathname.length - m.pathname.length === 1;
                    if (i === matches.length - 1 || isTheSameLastRoute) {
                        if (!title) {
                            return null;
                        }
                        const r = getRouteApi(m.routeId);
                        console.log(r);
                        return <Breadcrumb.Item key={m.id}>{title}</Breadcrumb.Item>;
                    }
                    return (
                        <Fragment key={m.id}>
                            <Breadcrumb.Item>
                                <Breadcrumb.Link href={m.pathname}>{title}</Breadcrumb.Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Separator />
                        </Fragment>
                    );
                })}
            </Breadcrumb.List>
        </Breadcrumb.Root>
    );
};
