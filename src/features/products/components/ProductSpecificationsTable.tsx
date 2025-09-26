import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { ProductDTO, GenderEnum } from '@/shared/types';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface ProductSpecificationsTableProps {
  product: ProductDTO;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa bảng specifications và các field hiển thị tại đây
export default function ProductSpecificationsTable({
  product,
}: ProductSpecificationsTableProps) {
  const getGenderText = (gender: GenderEnum) => {
    switch (gender) {
      case GenderEnum.MALE:
        return 'Nam';
      case GenderEnum.FEMALE:
        return 'Nữ';
      case GenderEnum.UNISEX:
        return 'Unisex';
      default:
        return 'Unisex';
    }
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const specifications = [
    { label: 'Mã sản phẩm', value: product.productId },
    { label: 'Tên sản phẩm', value: product.name },
    { label: 'Giới tính', value: getGenderText(product.gender) },
    { label: 'Kích thước vỏ', value: `${product.caseSize}mm` },
    { label: 'Độ dày vỏ', value: `${product.caseThickness}mm` },
    { label: 'Chống nước', value: `${product.waterResistance}m` },
    { label: 'Xuất xứ', value: product.origin },
    { label: 'Bộ máy', value: product.movement },
    { label: 'Loại kính', value: product.glassType },
    {
      label: 'Số lượng còn lại',
      value: product.quantity === 0 ? 'Hết hàng' : `${product.quantity} chiếc`,
    },
    { label: 'Lượt xem', value: formatNumber(product.view) },
    ...(product.warrantyYears
      ? [{ label: 'Bảo hành', value: `${product.warrantyYears} năm` }]
      : []),
  ];

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: COLORS.textPrimary,
        }}
      >
        Thông số kỹ thuật
      </Typography>

      <TableContainer
        sx={{
          border: `1px solid ${COLORS.borderLight}`,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableBody>
            {specifications.map((spec, index) => (
              <TableRow
                key={spec.label}
                sx={{
                  backgroundColor:
                    index % 2 === 0 ? COLORS.white : COLORS.gray50,
                  '&:hover': {
                    backgroundColor: COLORS.gold50,
                  },
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                    borderColor: COLORS.borderLight,
                    py: 2,
                    px: 3,
                    width: '40%',
                  }}
                >
                  {spec.label}
                </TableCell>
                <TableCell
                  sx={{
                    color: COLORS.textSecondary,
                    borderColor: COLORS.borderLight,
                    py: 2,
                    px: 3,
                  }}
                >
                  {spec.label === 'Số lượng còn lại' ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        label={spec.value}
                        size="small"
                        sx={{
                          backgroundColor:
                            product.quantity === 0
                              ? COLORS.gray300
                              : SEMANTIC_COLORS.success100,
                          color:
                            product.quantity === 0
                              ? COLORS.white
                              : SEMANTIC_COLORS.success700,
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  ) : spec.label === 'Giới tính' ? (
                    <Chip
                      label={spec.value}
                      size="small"
                      sx={{
                        backgroundColor: COLORS.gold100,
                        color: COLORS.gold700,
                        fontWeight: 500,
                      }}
                    />
                  ) : (
                    <Typography variant="body2" component="span">
                      {spec.value}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Additional Information Sections */}
      {product.description && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: COLORS.textPrimary,
            }}
          >
            Mô tả sản phẩm
          </Typography>
          <Box
            sx={{
              p: 3,
              backgroundColor: COLORS.gray50,
              borderRadius: 2,
              border: `1px solid ${COLORS.borderLight}`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: COLORS.textSecondary,
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
              }}
            >
              {product.description}
            </Typography>
          </Box>
        </Box>
      )}

      {product.productCondition && (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: COLORS.textPrimary,
            }}
          >
            Tình trạng sản phẩm
          </Typography>
          <Box
            sx={{
              p: 3,
              backgroundColor: COLORS.gold50,
              borderRadius: 2,
              border: `1px solid ${COLORS.gold200}`,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: COLORS.gold800,
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
                fontWeight: 500,
              }}
            >
              {product.productCondition}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
