export default function NotFoundPage() {
  return (
    <div
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
        404
      </h1>
      <h2 style={{ marginBottom: '1rem', color: '#666' }}>
        Không tìm thấy trang
      </h2>
      <p style={{ color: '#999', marginBottom: '2rem' }}>
        Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển
      </p>
      <button
        onClick={() => (window.location.href = '/')}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#FEE715',
          color: '#101820',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        Về trang chủ
      </button>
    </div>
  );
}
