import { RoleEnum, UserDTO } from '@/shared/types';
import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Person } from '@mui/icons-material';
import { COLORS } from '@/styles/colors';

// Components
import ProfileInfo from '../components/ProfileInfo';
import ResetPasswordModal from '../components/ResetPasswordModal';

export default function ProfilePage() {
  const userId: string = localStorage.getItem('userId') || '123456';
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // TODO: Implement an API call to fetch user data
        const response = await new Promise<UserDTO>((resolve) =>
          setTimeout(
            () =>
              resolve({
                id: userId,
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                role: RoleEnum.USER,
                createdAt: new Date('2023-01-15').toISOString(),
                updatedAt: new Date().toISOString(),
                status: true,
              }),
            1000
          )
        );
        setUser(response);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  const handleUpdateUser = async (updatedData: Partial<UserDTO>) => {
    try {
      // TODO: Implement update user API call
      console.log('Updating user:', updatedData);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user) {
        setUser({
          ...user,
          ...updatedData,
          updatedAt: new Date().toISOString(),
        });
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to update user:', error);
      return { success: false, error: 'Cập nhật thông tin thất bại' };
    }
  };

  const handleResetPassword = () => {
    setIsResetModalOpen(true);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Typography variant="h6" color="text.secondary">
            Đang tải thông tin...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Typography variant="h6" color="error">
            Không thể tải thông tin người dùng
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box mb={4}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: COLORS.primary,
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Person sx={{ fontSize: 32 }} />
          Thông tin cá nhân
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quản lý thông tin tài khoản của bạn
        </Typography>
      </Box>

      {/* Profile Information */}
      <ProfileInfo
        user={user}
        onUpdateUser={handleUpdateUser}
        onResetPassword={handleResetPassword}
      />

      {/* Reset Password Modal */}
      <ResetPasswordModal
        open={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        userEmail={user.email}
      />
    </Container>
  );
}
