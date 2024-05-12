const themeConfig = {
    docsRepositoryBase: 'https://github.com/leandroercoli/SaasterKit',
    logo: (
        <>
            <img
                src="/favicon.ico"
                style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '8px',
                    marginRight: '8px',
                }}
                alt="favicon"
            />
            <span>SaasterKit</span>
        </>
    ),
    project: {
        link: 'https://github.com/leandroercoli/SaasterKit',
    },
    editLink: {
        component: null,
    },
    head: (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta property="og:title" content="SaasterKit" />
            <meta
                property="og:description"
                content="A Next.js Boilerplate Kit for SaaS apps"
            />
            <meta
                name="keywords"
                content="nextjs, saas, boilerplate, kit, starter, template, prisma, postgresql, supabase, clerk, resend, shadcn, tailwindcss, typescript"
            />
            <meta name="author" content="Leandro Ercoli" />
        </>
    ),
    footer: {
        text: (
            <span>
                Leandro Ercoli {new Date().getFullYear()} ©{' '}
                <a href="#" target="_blank">
                    SaasterKit
                </a>
                .
            </span>
        ),
    },
    useNextSeoProps() {
        return {
            titleTemplate: '%s – SaasterKit',
        };
    },
};

export default themeConfig;
