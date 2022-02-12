// All dictionares have px to rem key values. px=4rem

module.exports = {
    purge: {
        enabled: true,
        content: [
            './src/**/*.html',
            './src/**/*.scss'
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontSize: {
            'sm': '0.875rem',
            'baseMoreSeparate':['1rem', '1.5rem'],
            'lg':'1.125rem',
            'xl':'1.25rem',
            '2.5xl':'1.625rem',
            '3xl':'2rem',
            '4.5xl': '2.25rem',
            'veryXl':['1.5rem','2rem'],
            'ultraXl':['3rem', '3.65rem']
        },
        fontFamily: {
            sans: ['Montserrat', 'sans-serif'],
            alternative: '"Source Sans Pro"'
        },
        extend: {
            fontSize: {'xs':'0.75rem'},
            colors: {
                blanco: '#FFFFFF',
                celeste:'#4BC0BA',
                negroFondo:'#0F0F0F',
                azulOscuroFondo:'#1B1837',
                azulOscuroFondoTranspOcho:'rgba(27, 24, 55, 0.8)',
                celesteFondoTranspSeis: 'rgba(74, 191, 185, 0.3)',
                azulOscuroPlusFondo: '#02001E'
            },
            bottom: {
                '0':'0rem'
            },
            padding: {
                '6.5':'1.625rem',
                '22':'5.5rem'
            },
            width: {
                '16':'4rem',
                '74':'17rem',
                '40':'10rem',
                '80':'18rem',
                '120':'30rem',
                '164':'41rem',
                '180':'45rem',
                '280':'70rem',
                '292':'73rem',
            },
            height: {
                '7': '1.75rem',
                '10': '2.5rem',
                '12': '3rem',
                '16': '4rem',
                '26':'6.5rem',
                '27':'6.875rem',
                '30':'7.5rem',
                '32':'8rem',
                '58':'14.75rem',
                '60':'15rem',
                '68':'17rem',
                '70':'17.5rem',
                '80':'20rem',
                '88':'22rem',
                '100':'25rem',
                '120':'30rem',
                '180':'45rem',
            },
            borderRadius:{
                '2.5xl':'1.25rem'
            },
            borderWidth:{
                '1':'1px'
            },
            inset:{
                '18': '4.5rem'
            },
            left:{
                '92':'23rem'
            },
            right:{
                '4':'1rem',
                '8':'2rem',
                '10':'2.5rem',
                '14':'3.5rem'
            },
            marginTop:{
                '8':'2rem',
                '24':'6rem',
                '32':'8rem'
            },
            marginBottom:{
                '20': '5rem',
                '32':'8rem'
            }
        }
    },
    variants: {},
    plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
};