import { Card } from "../components/Card";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-b from-[#FFFFFF] to-[#AFA3FF] h-screen">
      <Card>{children}</Card>
    </div>
  );
}
