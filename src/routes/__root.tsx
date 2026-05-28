import { HeadContent, Outlet, Scripts, createRootRouteWithContext, redirect } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import Footer from '../components/Footer'
import Header from '../components/Header'

import appCss from '../styles.css?url'
import { createServerFn } from '@tanstack/react-start'
import { TooltipProvider } from '#/components/ui/tooltip'
import { getSession } from '#/features/auth/auth.server'

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

type Session = typeof authClient.$Infer.Session

type RouterContext = {
  session: Session | null
}

import { authClient } from '#/features/auth/auth-client'

const getSessionData = createServerFn({ method: 'GET' }).handler(async () => {
  return await getSession()
})

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ matches }) => {
    const data = await getSessionData()

    const isAuthenticated = !!data?.user
    const requireAuth = [...matches]
      .map(match => match.staticData?.requireAuth)
      .find((value): value is 'user' | 'guest' => value === 'user' || value === 'guest')

    if (requireAuth === 'user' && !isAuthenticated) throw redirect({ to: '/user/login' })
    else if (requireAuth === 'guest' && isAuthenticated) throw redirect({ to: '/user/dashboard' })

    return { session: data }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  component: () => <Outlet />,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <TooltipProvider>
        <body className="font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)] min-h-screen flex flex-col">
          <Header />
          {children}
          <Footer />
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
          <Scripts />
        </body>
      </TooltipProvider>
    </html>
  )
}

export type { RouterContext }