interface LoadingPageProps {
  message?: string;
}

export default function LoadingPage({
  message = 'Đang tải trang...',
}: LoadingPageProps) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Đang tải...</h1>
      <p>{message}</p>
    </div>
  );
}
