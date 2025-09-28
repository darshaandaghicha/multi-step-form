import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const customFont = localFont({
    src: [
        {
            path: './fonts/Ubuntu-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/Ubuntu-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/Ubuntu-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    display: 'swap',
    variable: '--font-custom',
});

export const metadata: Metadata = {
    title: 'Multi Step Form',
    description:
        'Multi step form created by Darshaan Aghicha (https://github.com/darshaandaghicha) challenge by Frontend Mentor (https://www.frontendmentor.io).',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={customFont.variable}
            suppressHydrationWarning={true}
        >
            <body className="font-sans">{children}</body>
        </html>
    );
}
