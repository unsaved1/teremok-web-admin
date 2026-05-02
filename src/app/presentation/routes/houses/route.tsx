import {Outlet, createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/houses')({
    component: RouteComponent,
    staticData: {
        breadcrumbTitle: 'Домики',
    },
});

function RouteComponent() {
    return <Outlet />;
}
