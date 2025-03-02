import type { Metadata } from "next";
import { ConfigProvider, ThemeConfig } from "antd";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@/css/globals.scss'
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "Globetrotter - Online Quiz",
  description: "An online quiz app to test your knowledge",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  openGraph: {
    images: '/og-image.jpg',
    title: 'Globetrotter - Explore the World Through Trivia',
    description: 'Expand your global knowledge with our fun and engaging trivia app. Learn interesting facts about cities and countries while challenging your friends.'
  }
};

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#2d9f20"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={theme}
          >
            <MainLayout>
              {children}
            </MainLayout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
