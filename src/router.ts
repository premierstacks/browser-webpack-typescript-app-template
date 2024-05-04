export type Render = () => HTMLElement;

export type Routes = Route[];

export interface Route {
  path: string;
  render: Render;
}

export function Fallback(): HTMLElement {
  const div: HTMLElement = document.createElement('div');

  div.innerHTML = 'Fallback';

  return div;
}

export class Router {
  constructor(
    public mount: HTMLElement,
    public routes: Routes,
  ) {}

  handle(): void {
    this.mount.innerHTML = '';

    const route: Route = this.routes.find((route: Route) => {
      return new RegExp(route.path).test(window.location.pathname);
    }) ?? { path: '.*', render: Fallback };

    this.mount.appendChild(route.render());
  }
}
