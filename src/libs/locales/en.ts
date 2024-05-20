export default {
    // Not found page
    not_found: {
        title: 'Page not found',
        description: 'The page you are looking for does not exist.',
        back_to_home: 'Back to home',
    },
    // Error page
    error: {
        title: 'Something went wrong!',
    },
    // Theme related translations
    theme: {
        toggle_theme: 'Toggle theme',
        dark: 'Dark',
        light: 'Light',
        system: 'System',
    },
    // Alert dialog translations
    alert_dialog: {
        delete_element: {
            title: 'Are you absolutely sure?',
            description: 'This action cannot be undone.',
            pending: 'Deleting...',
            success: 'Deleted successfully',
            error: 'Failed to delete.',
        },
        save_element: {
            pending: 'Saving...',
            success: 'Saved successfully',
            error: 'Failed to save.',
        },
        cancel: 'Cancel',
        continue: 'Continue',
    },
    // Literal translations used across the app
    literals: {
        all: 'All',
        download: 'Download',
        coming_soon: 'Coming Soon',
        pick_a_date: 'Pick a date',
    },
    // Dashboard app translations
    dashboard: {
        // Routes and breadcrumbs
        nav: {
            dashboard: 'Dashboard',
            todo: 'Todo',
            my_account: 'My Account',
            settings: 'Settings',
            settings_nav: {
                general: 'General',
                account: 'Account',
                premium: 'Premium',
            },
            subscribe_now: 'Subscribe Now',
        },
        todo: {
            title: 'Todo Items',
            description: 'Your todo items.',
            recent_title: 'Recent Todo Items',
            recent_description: 'Your recent todo items.',
            upcoming_title: 'Upcoming Todo Items',
            upcoming_description: 'Your upcoming todo items.',
            no_todo_items: 'No todo items',
            no_more_items: 'No more todo items',
            load_more: 'Load more',
            view_all: 'View All',
            item: {
                item: 'Item',
                title: 'Title',
                description: 'Description',
                category: 'Category',
                due_date: 'Due Date',
                created_at: 'Created at',
                status: 'Status',
                done: 'Done',
                pending: 'Pending',
            },
            stats: {
                completed: 'Completed',
                pending: 'Pending',
                total: 'Total',
                items_from_to: 'Items from {from} to {to}',
                difference_from_last_month: '{value}% from last month',
            },
            cta_card: {
                title: 'Your todo items.',
                description: 'Start by adding your first todo item.',
                new: 'New',
            },
            form: {
                new: 'New Todo Item',
                edit: 'Edit',
                new_description: 'Create a new todo item.',
                select_category: 'Select Category',
                delete: 'Delete',
                discard: 'Discard',
                save: 'Save',
            },
            categories: {
                WORK: 'Work',
                PERSONAL: 'Personal',
                SHOPPING: 'Shopping',
                UNSPECIFIED: 'Unspecified',
            },
        },
        settings: {
            title: 'Settings',
            general: {
                notifications: 'Notifications',
                notifications_description: 'Your notification settings.',
                send_notifications_to_email: 'Send notifications to email',
                send_deals_and_offers: 'Send deals and offers',
                goals: 'Goals',
                goals_description: 'Set your weekly and monthly goals.',
                weekly_goal: 'Weekly Goal',
                monthly_goal: 'Monthly Goal',
                delete_account: 'Delete Account',
                delete_account_description:
                    'This action cannot be undone. This will permanently delete your account.',
            },
        },
        my_account: {
            no_subscriptions:
                ' It appears that you do not have any subscriptions. Please sign up for a plan below.',
            billing: 'Billing',
            billing_description: 'View and manage your billing information.',
            renews_on: 'Renews on {date}',
            change_plan: 'Change Plans',
            change_plan_description: 'Choose a plan that works for you.',
            billing_actions: {
                pause_payments: 'Pause Payments',
                unpause_payments: 'Unpause Payments',
                customer_portal: 'Customer Portal',
                update_payment_method: 'Update Payment Method',
                cancel_subscription: 'Cancel Subscription',
                cancel_subscription_confirm:
                    'Are you sure you want to cancel your subscription?',
            },
            no_plans_available: 'No plans available',
            demo_only: 'Demo only',
            demo_description:
                'This feature is for demo purposes only. The store is in "test mode" and no real transactions will be processed. Never use real credit card information on this demo site. You can use the following test card numbers:',
        },
    },
    // Landing page translations
    landing: {
        hero: {
            slash: 'Slash',
            dev_time: 'Dev Time',
            fast_track: 'Fast-Track to',
            launch: 'Launch',
            description:
                'Avoid the grind of setting up foundational code. SaasterKit handles the heavy lifting and lets you jump straight to what really matters - ',
            business: 'your business',
            get_started: 'Get Started',
            view_demo: 'View Demo',
        },
        features: {
            title: 'Features',
            description:
                'SaasterKit provides ready-to-use integrations with popular technologies and services, enabling you to create dynamic and interactive user experiences.',
            next_description:
                'Leverage the latest features and enhancements of Next.js 14 to create fast, scalable, and optimized web applications.',
            tailwind_description:
                'Design beautiful user interfaces with Tailwind CSS. Create responsive and customizable designs that look great on any device.',
            prisma_description:
                'Streamline your database operations and manage your data efficiently with Prisma ORM. We provide a out-of-the-box integration with Supabase, but you can easily switch to your preferred database provider.',
            clerk_description:
                'Secure user authentication and authorization with Clerk. Get your API keys and you are ready to go!',
            resend_description:
                'Empower your business with the ability to send transactional emails, track deliveries, and monitor engagement.',
            sentry_description:
                'Monitor and fix errors in real-time with Sentry. Get detailed insights into the health of your application and improve the user experience.',
            openai_description:
                'Harness the potential of AI to generate content, analyze data, and make predictions.',
            mdx_description:
                'Create interactive and engaging documentation with MDX. Write markdown files with embedded JSX components to create rich content.',
            lemon_description:
                'Accept online payments, manage subscriptions, and handle invoices with Lemon Squeezy.',
            coming_soon: 'Coming soon!',
        },
        pricing: {
            title: 'Pricing',
            description:
                'Choose the plan that best suits your needs. All plans come with a set of pre-configured features to help you get started quickly.',
            get_started: 'Get Started',
            sign_up: 'Sign Up to Get Started',
            your_plan: 'Your Plan',
            switch_to_plan: 'Switch to this plan',
            features: 'Features',
            coming_soon: 'Coming soon!',
            most_popular: 'Most Popular',
            checkout_error:
                'Error creating a checkout. Please try again later.',
            starter: {
                title: 'Starter',
                price: 'Free',
                description:
                    'Pre-configured boilerplate code for common features to jump-start your app.',
            },
            pro: {
                title: 'Pro',
                description: 'For advanced projects that need extra power.',
            },
            all_features: {
                feature_next: 'Next.js 14 with app router',
                feature_prisma: 'Prisma ORM',
                feature_clerk: 'Clerk authentication',
                feature_supabase: 'Supabase integration',
                feature_resend: 'Resend integration',
                feature_sentry: 'Sentry integration',
                feature_i18n: 'i18n support',
                feature_tailwind: 'Tailwind & shadcn components',
                feature_dashboard: 'Dashboard template',
                feature_landing: 'Landing page template',
                feature_openai: 'OpenAI integration',
                feature_lemon: 'Lemon Squeezy integration',
                feature_mdx: 'MDX Documentation support',
            },
        },
        faq: {
            title: 'FAQ',
            description: 'Got questions? We’ve got answers.',
            content: [
                {
                    title: 'What is it exactly?',
                    description:
                        'SaasterKit is a Next.js boilerplate kit that helps you build and launch your app quicker. It provides pre-configured boilerplate code for common features such as authentication, user management, and data storage, so you can focus on building and growing your business.',
                },
                {
                    title: 'What is it not?',
                    description:
                        'SaasterKit is not a full-fledged SaaS product. It does not provide database or authentication services. It is a boilerplate kit that provides you with a starting point for your app. You can customize and extend it to fit your specific needs and requirements.',
                },
                {
                    title: 'Is it easy to navigate?',
                    description:
                        'Yes, this kit is designed to be easy to use, even if you are new to app development. We provide detailed documentation and tutorials to help you get started, as well as a showcase of example apps to inspire and guide you.',
                },
                {
                    title: 'How much does it cost?',
                    description:
                        'We offer a free tier that contains all the basic features you need to get started with your app, like authentication, user management, data storage, and mailing services. We are currently working on additional features that will be available in our premium tier. Join our waitlist to be the first to know when these features are available.',
                },
                {
                    title: 'How can I get started?',
                    description:
                        'To get started with this kit, simply click the "Get Started" button on our homepage and clone the codebase from our GitHub repository. You can then customize the code to fit your specific needs and start building your app.',
                },
            ],
        },
        waitlist: {
            title: 'Get Early Access',
            description:
                'Join our waitlist to get notified when we launch new features. We will never spam you.',
            form: {
                email: 'Email Address',
                join_waitlist: 'Join Waitlist',
            },
        },
        nav: {
            features: 'Features',
            pricing: 'Pricing',
            faq: 'FAQ',
            docs: 'Docs',
            dashboard: 'Dashboard',
            sign_in_for_demo: 'Sign in for Demo',
        },
        lemon_squeezy: {
            interval: {
                day: 'Day',
                week: 'Week',
                month: 'Month',
                year: 'Year',
            },
        },
    },
} as const;
