import { UserDTO } from '@/shared/types';
import { useState } from 'react';
import { Box, Typography, Divider, Grid } from '@mui/material';
import { WSCard, WSButton, WSInput } from '@/components';
import { Edit, Save, Cancel, Lock } from '@mui/icons-material';
import { COLORS } from '@/styles/colors';

interface ProfileInfoProps {
  user: UserDTO;
  onUpdateUser: (
    data: Partial<UserDTO & { phoneNumber?: string }>
  ) => Promise<{ success: boolean; error?: string }>;
  onResetPassword: () => void;
}

export default function ProfileInfo({
  user,
  onUpdateUser,
  onResetPassword,
}: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber || '',
  });
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
    });
  };

  const handleSave = async () => {
    setLoading(true);
    const result = await onUpdateUser(editData);
    setLoading(false);

    if (result.success) {
      setIsEditing(false);
    } else {
      alert(result.error || 'Có lỗi xảy ra');
    }
  };

  return (
    <WSCard
      sx={{
        p: 4,
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        borderRadius: 2,
      }}
    >
      {/* Header with Actions */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: COLORS.primary,
          }}
        >
          Thông tin chi tiết
        </Typography>

        <Box display="flex" gap={2}>
          {isEditing ? (
            <>
              <WSButton
                variant="text"
                size="small"
                startIcon={<Cancel />}
                onClick={handleCancel}
                disabled={loading}
              >
                Hủy
              </WSButton>
              <WSButton
                variant="primary"
                size="small"
                startIcon={<Save />}
                onClick={handleSave}
                loading={loading}
                loadingText="Đang lưu..."
              >
                Lưu
              </WSButton>
            </>
          ) : (
            <>
              <WSButton
                variant="secondary"
                size="small"
                startIcon={<Lock />}
                onClick={onResetPassword}
              >
                Đổi mật khẩu
              </WSButton>
              <WSButton
                variant="primary"
                size="small"
                startIcon={<Edit />}
                onClick={handleEdit}
              >
                Chỉnh sửa
              </WSButton>
            </>
          )}
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Editable Fields */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* User Name */}
          <Box mb={3}>
            <Typography
              variant="subtitle2"
              sx={{
                color: COLORS.textSecondary,
                fontWeight: 600,
                mb: 1.5,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.5px',
              }}
            >
              Họ và tên
            </Typography>
            {isEditing ? (
              <WSInput
                fullWidth
                variant="outlined"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                disabled={loading}
              />
            ) : (
              <Typography
                variant="h6"
                sx={{
                  color: COLORS.primary,
                  fontWeight: 600,
                }}
              >
                {user.name}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Email */}
          <Box mb={3}>
            <Typography
              variant="subtitle2"
              sx={{
                color: COLORS.textSecondary,
                fontWeight: 600,
                mb: 1.5,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.5px',
              }}
            >
              Email
            </Typography>
            {isEditing ? (
              <WSInput
                fullWidth
                variant="outlined"
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                disabled={loading}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{
                  color: COLORS.textPrimary,
                  fontWeight: 500,
                }}
              >
                {user.email}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Phone Number */}
          <Box mb={3}>
            <Typography
              variant="subtitle2"
              sx={{
                color: COLORS.textSecondary,
                fontWeight: 600,
                mb: 1.5,
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.5px',
              }}
            >
              Số điện thoại
            </Typography>
            {isEditing ? (
              <WSInput
                fullWidth
                variant="outlined"
                type="tel"
                value={editData.phoneNumber}
                onChange={(e) =>
                  setEditData({ ...editData, phoneNumber: e.target.value })
                }
                disabled={loading}
                placeholder="Nhập số điện thoại (tùy chọn)"
              />
            ) : (
              <Typography
                variant="body1"
                sx={{
                  color: user.phoneNumber
                    ? COLORS.textPrimary
                    : COLORS.textSecondary,
                  fontWeight: 500,
                  fontStyle: !user.phoneNumber ? 'italic' : 'normal',
                }}
              >
                {user.phoneNumber || 'Chưa cập nhật'}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />
        </Grid>

        {/* Right Column - Read-only Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              backgroundColor: COLORS.gray50,
              borderRadius: 2,
              p: 3,
              height: 'fit-content',
            }}
          >
            {/* Created At */}
            <Box mb={3}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: COLORS.textSecondary,
                  fontWeight: 600,
                  mb: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.5px',
                }}
              >
                Ngày tạo
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: COLORS.textSecondary,
                  fontSize: '0.875rem',
                }}
              >
                {formatDate(user.createdAt)}
              </Typography>
            </Box>

            {/* Updated At */}
            <Box mb={0}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: COLORS.textSecondary,
                  fontWeight: 600,
                  mb: 1.5,
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.5px',
                }}
              >
                Cập nhật cuối
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: COLORS.textSecondary,
                  fontSize: '0.875rem',
                }}
              >
                {formatDate(user.updatedAt)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </WSCard>
  );
}
