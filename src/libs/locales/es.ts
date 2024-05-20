export default {
    // Not found page
    not_found: {
        title: 'Página no encontrada',
        description: 'La página que buscas no existe.',
        back_to_home: 'Volver a inicio',
    },
    // Error page
    error: {
        title: '¡Algo salió mal!',
    },
    // Theme related translations
    theme: {
        toggle_theme: 'Alternar tema',
        dark: 'Oscuro',
        light: 'Claro',
        system: 'Sistema',
    },
    // Alert dialog translations
    alert_dialog: {
        delete_element: {
            title: '¿Estás absolutamente seguro?',
            description: 'Esta acción no se puede deshacer.',
            pending: 'Eliminando...',
            success: 'Eliminado con éxito',
            error: 'Error al eliminar.',
        },
        save_element: {
            pending: 'Guardando...',
            success: 'Guardado con éxito',
            error: 'Error al guardar.',
        },
        cancel: 'Cancelar',
        continue: 'Continuar',
    },
    // Literal translations used across the app
    literals: {
        all: 'Todos',
        download: 'Descargar',
        coming_soon: 'Próximamente',
        pick_a_date: 'Elegir una fecha',
    },
    // Dashboard app translations
    dashboard: {
        // Routes and breadcrumbs
        nav: {
            dashboard: 'Tablero',
            todo: 'Por hacer',
            my_account: 'Mi cuenta',
            settings: 'Ajustes',
            settings_nav: {
                general: 'General',
                account: 'Cuenta',
                premium: 'Premium',
            },
            subscribe_now: 'Suscríbete',
        },
        todo: {
            title: 'Elementos por hacer',
            description: 'Tus elementos por hacer.',
            recent_title: 'Elementos por hacer recientes',
            recent_description: 'Tus elementos por hacer recientes.',
            upcoming_title: 'Próximos elementos por hacer',
            upcoming_description: 'Tus próximos elementos por hacer.',
            no_todo_items: 'No hay elementos por hacer',
            no_more_items: 'No hay más elementos por hacer',
            load_more: 'Cargar más',
            view_all: 'Ver todos',
            item: {
                item: 'Elemento',
                title: 'Título',
                description: 'Descripción',
                category: 'Categoría',
                due_date: 'Fecha de vencimiento',
                created_at: 'Creado en',
                status: 'Estado',
                done: 'Hecho',
                pending: 'Pendiente',
            },
            stats: {
                completed: 'Completado',
                pending: 'Pendiente',
                total: 'Total',
                items_from_to: 'Elementos de {from} a {to}',
                difference_from_last_month: '{value}% del mes pasado',
            },
            cta_card: {
                title: 'Tus elementos por hacer.',
                description: 'Comienza agregando tu primer elemento por hacer.',
                new: 'Nuevo',
            },
            form: {
                new: 'Nuevo elemento por hacer',
                edit: 'Editar',
                new_description: 'Crear un nuevo elemento por hacer.',
                select_category: 'Seleccionar categoría',
                delete: 'Eliminar',
                discard: 'Descartar',
                save: 'Guardar',
            },
            categories: {
                WORK: 'Trabajo',
                PERSONAL: 'Personal',
                SHOPPING: 'Compras',
                UNSPECIFIED: 'No especificado',
            },
        },
        settings: {
            title: 'Ajustes',
            general: {
                notifications: 'Notificaciones',
                notifications_description: 'Tus ajustes de notificación.',
                send_notifications_to_email: 'Enviar notificaciones al correo',
                send_deals_and_offers: 'Enviar ofertas y promociones',
                goals: 'Objetivos',
                goals_description:
                    'Establece tus objetivos semanales y mensuales.',
                weekly_goal: 'Objetivo semanal',
                monthly_goal: 'Objetivo mensual',
                delete_account: 'Eliminar cuenta',
                delete_account_description:
                    'Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta.',
            },
        },
        my_account: {
            no_subscriptions:
                'Parece que no tienes suscripciones. Por favor, regístrate en un plan a continuación.',
            billing: 'Facturación',
            billing_description:
                'Ver y administrar tu información de facturación.',
            renews_on: 'Renueva el {date}',
            change_plan: 'Cambiar plan',
            change_plan_description:
                'Elige un plan que se adapte a tus necesidades.',
            actions: {
                pause_payments: 'Pausar pagos',
                unpause_payments: 'Reanudar pagos',
                customer_portal: 'Portal del cliente',
                update_payment_method: 'Actualizar método de pago',
                cancel_subscription: 'Cancelar suscripción',
                cancel_subscription_confirm:
                    '¿Estás seguro de que deseas cancelar tu suscripción?',
            },
            no_plans_available: 'No hay planes disponibles.',
            demo_only: 'Solo demo',
            demo_description:
                'Esta función es solo para fines de demostración. La tienda está en "modo de prueba" y no se procesarán transacciones reales. Nunca uses información de tarjetas de crédito reales en este sitio de demostración. Puedes usar los siguientes números de tarjeta de prueba:',
        },
    },
    // Landing page translations
    landing: {
        hero: {
            slash: 'Recorta el',
            dev_time: 'desarrollo',
            fast_track: 'acelera al',
            launch: 'mercado',
            description:
                'Evita la rutina de configurar código repetitivo. SaasterKit se encarga del trabajo pesado y te permite saltar directamente a lo que realmente importa - ',
            business: 'tu negocio',
            get_started: 'Comenzar',
            view_demo: 'Ver demo',
        },
        features: {
            title: 'Características',
            description:
                'SaasterKit proporciona integraciones listas para usar con tecnologías y servicios populares, lo que te permite crear experiencias de usuario dinámicas e interactivas.',
            next_description:
                'Aprovecha las últimas características y mejoras de Next.js 14 para crear aplicaciones web rápidas, escalables y optimizadas.',
            tailwind_description:
                'Diseña hermosas interfaces de usuario con Tailwind CSS. Crea diseños receptivos y personalizables que se ven geniales en cualquier dispositivo.',
            prisma_description:
                'Optimiza tus operaciones de base de datos y administra tus datos de manera eficiente con Prisma ORM. Proporcionamos una integración lista para usar con Supabase, pero puedes cambiar fácilmente a tu proveedor de base de datos preferido.',
            clerk_description:
                'Autenticación y autorización seguras con Clerk. ¡Obtén tus claves de API y estás listo para empezar!',
            resend_description:
                'Potencia tu negocio con la capacidad de enviar correos electrónicos transaccionales, rastrear entregas y monitorear el compromiso.',
            sentry_description:
                'Monitorea y soluciona errores en tiempo real con Sentry. Obtén información detallada sobre la salud de tu aplicación y mejora la experiencia del usuario.',
            openai_description:
                'Aprovecha el potencial de la IA para generar contenido, analizar datos y hacer predicciones.',
            mdx_description:
                'Crea documentación interactiva y atractiva con MDX. Escribe archivos markdown con componentes JSX incrustados.',
            lemon_description:
                'Acepta pagos en línea, administra suscripciones y maneja facturas con Lemon Squeezy.',
            coming_soon: '¡Próximamente!',
        },
        pricing: {
            title: 'Precios',
            description:
                'Elige el plan que mejor se adapte a tus necesidades. Todos los planes vienen con un conjunto de características preconfiguradas para ayudarte a comenzar rápidamente.',
            get_started: 'Comenzar',
            sign_up: 'Regístrate para comenzar',
            your_plan: 'Tu plan',
            switch_to_plan: 'Cambiar a este plan',
            features: 'Características',
            coming_soon: '¡Próximamente!',
            most_popular: 'Más popular',
            checkout_error:
                'Error al crear un pago. Por favor, inténtalo de nuevo más tarde.',
            starter: {
                title: 'Starter',
                price: 'Gratis',
                description:
                    'Código preconfigurado con funciones comunes para iniciar rápidamente tu aplicación.',
            },
            pro: {
                title: 'Pro',
                description:
                    'Para proyectos avanzados que necesitan potencia adicional.',
            },
            all_features: {
                feature_next: 'Next.js 14 con app router',
                feature_prisma: 'Prisma ORM',
                feature_clerk: 'Autenticación con Clerk',
                feature_supabase: 'Integración de Supabase',
                feature_resend: 'Integración de Resend',
                feature_sentry: 'Integración de Sentry',
                feature_i18n: 'Soporte i18n',
                feature_tailwind: 'Componentes Tailwind y shadcn',
                feature_dashboard: 'Plantilla de Dashboard',
                feature_landing: 'Plantilla de Landing Page',
                feature_openai: 'Integración de OpenAI',
                feature_lemon: 'Integración de Lemon Squeezy',
                feature_mdx: 'Soporte de documentación MDX',
            },
        },
        faq: {
            title: 'FAQ',
            description: '¿Tienes preguntas? Tenemos respuestas.',
            content: [
                {
                    title: '¿Qué es SaasterKit?',
                    description:
                        'SaasterKit es un kit de inicio rápido para desarrolladores que desean crear aplicaciones web modernas y escalables. Proporcionamos código preconfigurado con funcionalidades comunes como autenticación, gestión de usuarios y almacenamiento de datos, para que puedas comenzar a construir tu aplicación de inmediato.',
                },
                {
                    title: '¿Qué no es SaasterKit?',
                    description:
                        'SaasterKit no es una solución SaaS completa. No proporciona servicios de base de datos o autenticación. Es un kit de inicio que te proporciona un punto de partida para tu aplicación. Puedes personalizarlo y extenderlo para adaptarlo a tus necesidades y requisitos específicos.',
                },
                {
                    title: '¿Es fácil de usar?',
                    description:
                        'Sí, este kit está diseñado para ser fácil de usar, incluso si eres nuevo en el desarrollo de aplicaciones. Proporcionamos documentación detallada y tutoriales para ayudarte a comenzar, así como una muestra de aplicaciones de ejemplo para inspirarte y guiarte.',
                },
                {
                    title: '¿Cómo puedo empezar?',
                    description:
                        'Para comenzar con este kit, simplemente haz clic en el botón "Comenzar" y clona el código base desde el repositorio de GitHub. Luego puedes personalizar el código para adaptarlo a tus necesidades específicas y comenzar a construir tu aplicación.',
                },
                {
                    title: '¿Cuánto cuesta?',
                    description:
                        'Ofrecemos un paquete gratuito que contiene todas las funciones básicas que necesitas para comenzar con tu aplicación, como autenticación, gestión de usuarios, almacenamiento de datos y servicios de correo. Actualmente estamos trabajando en funciones adicionales que estarán disponibles en nuestro paquete premium. Únete a nuestra lista de espera para ser el primero en saber cuándo estas funciones estén disponibles.',
                },
            ],
        },
        waitlist: {
            title: 'Obtener acceso anticipado',
            description:
                'Únete a nuestra lista de espera para recibir una notificación cuando lancemos nuevas funciones. Nunca te enviaremos spam.',
            form: {
                email: 'Dirección de correo electrónico',
                join_waitlist: 'Unirse a la lista de espera',
            },
        },
        nav: {
            features: 'Características',
            pricing: 'Precios',
            faq: 'FAQ',
            docs: 'Docs',
            dashboard: 'Tablero',
            sign_in_for_demo: 'Iniciar sesión para demo',
        },
        lemon_squeezy: {
            interval: {
                day: 'Día',
                week: 'Semana',
                month: 'Mes',
                year: 'Año',
            },
        },
    },
} as const;
