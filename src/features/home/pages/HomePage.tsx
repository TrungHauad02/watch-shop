import { useLayout } from '@/components/WSLayout/WSLayout.utils';
import { useEffect } from 'react';

export default function HomePage() {
  const { setPageTitle, setBreadcrumb } = useLayout();

  useEffect(() => {
    setPageTitle('Trang chủ - WatchStore');
    setBreadcrumb([{ label: 'Trang chủ', path: '/', isActive: true }]);
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>WatchStore - Trang chủ</h1>
      <p>Chào mừng đến với cửa hàng đồng hồ cao cấp</p>
    </div>
  );
}
