import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Next.js App with Bootstrap',
  description: 'A Next.js app using Bootstrap for styling.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="">{children}</div>
      </body>
    </html>
  );
}
