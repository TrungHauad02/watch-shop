import { CategoryDTO } from '../types';

const mockCategories: CategoryDTO[] = [
  {
    id: '1',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ thể thao',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&crop=center',
    description:
      'Dòng đồng hồ thiết kế dành cho hoạt động thể thao, có độ bền cao và nhiều tính năng hỗ trợ.',
  },
  {
    id: '2',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ cổ điển',
    image:
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Thiết kế thanh lịch, cổ điển phù hợp cho các dịp trang trọng và công việc.',
  },
  {
    id: '3',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ thông minh',
    image:
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Đồng hồ thông minh với nhiều tính năng hiện đại như theo dõi sức khỏe, GPS và kết nối smartphone.',
  },
  {
    id: '4',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ lặn',
    image:
      'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&h=600&fit=crop&crop=center',
    description:
      'Chuyên dụng cho lặn biển với khả năng chống nước cao và các tính năng chuyên nghiệp.',
  },
  {
    id: '5',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ kim cương',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=600&fit=crop&crop=center',
    description:
      'Đồng hồ cao cấp được trang trí kim cương và đá quý, thể hiện đẳng cấp và sang trọng.',
  },
  {
    id: '6',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ cơ',
    image:
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Đồng hồ mechanical truyền thống với bộ máy cơ học phức tạp, thể hiện nghệ thuật chế tác.',
  },
  {
    id: '7',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ nữ',
    image:
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Thiết kế tinh tế, thanh lịch dành riêng cho phái đẹp với kích thước nhỏ gọn và màu sắc nữ tính.',
  },
  {
    id: '8',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ chronograph',
    image:
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    description:
      'Đồng hồ bấm giờ với chức năng đo thời gian chính xác, phù hợp cho các môn thể thao.',
  },
  {
    id: '9',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ vintage',
    image:
      'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&h=600&fit=crop&crop=center',
    description:
      'Phong cách cổ điển hoài niệm, tái hiện vẻ đẹp của những thập kỷ trước với chất liệu và thiết kế đặc trưng.',
  },
  {
    id: '10',
    status: true,
    createdAt: '2025-09-26T12:00:00Z',
    updatedAt: '2025-09-26T12:00:00Z',
    name: 'Đồng hồ thời trang',
    image:
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=800&h=600&fit=crop&crop=center',
    description:
      'Đồng hồ trendy với thiết kế hiện đại, màu sắc bắt mắt và phong cách thời trang trẻ trung.',
  },
];

export { mockCategories };
