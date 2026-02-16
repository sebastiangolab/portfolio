import { ReactElement, ReactNode } from 'react';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { Roboto } from 'next/font/google';
import '@/styles/global.scss';

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'] });

export const metadata = {
   title: 'Sebastian Golab',
   description:
      'Experienced Software Engineer specializing in React, Next.js, TypeScript, and Node.js. Building scalable web applications and e-commerce platforms since 2017.',
};

export default function RootLayout({
   children,
}: {
   children: ReactNode;
}): ReactElement {
   return (
      <html lang="en">
         <body className={roboto.className}>
            <Layout>
               <>
                  <Header />
                  {children}
               </>
            </Layout>
         </body>
      </html>
   );
}
