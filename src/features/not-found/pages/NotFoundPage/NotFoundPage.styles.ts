import { Theme } from '@mui/material/styles';
import { COLORS } from '@/styles/colors';

// CUSTOMIZE: Bạn có thể chỉnh sửa màu sắc và timing của đồng hồ tại đây
export const getNotFoundStyles = (theme: Theme) => ({
  // Full page container - standalone page
  pageContainer: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundPrimary,
    position: 'fixed' as const,
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  },

  // Main content container
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    gap: theme.spacing(4),
    maxWidth: '600px',
    padding: theme.spacing(0, 3),

    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(3),
      padding: theme.spacing(0, 2),
    },
  },

  // Watch clock container - main focal point
  clockContainer: {
    position: 'relative' as const,
    width: '300px',
    height: '300px',
    margin: theme.spacing(2, 0),

    [theme.breakpoints.down('md')]: {
      width: '250px',
      height: '250px',
    },

    [theme.breakpoints.down('sm')]: {
      width: '200px',
      height: '200px',
    },
  },

  // Watch face - outer circle
  watchFace: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: `8px solid ${COLORS.primary}`,
    backgroundColor: COLORS.white,
    position: 'relative' as const,
    boxShadow: `
      0 0 0 4px ${COLORS.gold400},
      0 20px 40px rgba(0, 0, 0, 0.1),
      inset 0 0 0 2px ${COLORS.gray200}
    `,

    [theme.breakpoints.down('md')]: {
      border: `6px solid ${COLORS.primary}`,
      boxShadow: `
        0 0 0 3px ${COLORS.gold400},
        0 15px 30px rgba(0, 0, 0, 0.1),
        inset 0 0 0 2px ${COLORS.gray200}
      `,
    },

    [theme.breakpoints.down('sm')]: {
      border: `5px solid ${COLORS.primary}`,
      boxShadow: `
        0 0 0 2px ${COLORS.gold400},
        0 10px 20px rgba(0, 0, 0, 0.1),
        inset 0 0 0 1px ${COLORS.gray200}
      `,
    },
  },

  // Center dot of watch
  centerDot: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    width: '16px',
    height: '16px',
    backgroundColor: COLORS.primary,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 3,
    boxShadow: `0 0 0 3px ${COLORS.white}`,

    [theme.breakpoints.down('sm')]: {
      width: '12px',
      height: '12px',
      boxShadow: `0 0 0 2px ${COLORS.white}`,
    },
  },

  // Hour markers (12, 3, 6, 9)
  hourMarker: {
    position: 'absolute' as const,
    width: '4px',
    height: '30px',
    backgroundColor: COLORS.primary,

    '&.marker-12': {
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '&.marker-3': {
      top: '50%',
      right: '10px',
      transform: 'translateY(-50%) rotate(90deg)',
    },
    '&.marker-6': {
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '&.marker-9': {
      top: '50%',
      left: '10px',
      transform: 'translateY(-50%) rotate(90deg)',
    },

    [theme.breakpoints.down('md')]: {
      width: '3px',
      height: '25px',
    },

    [theme.breakpoints.down('sm')]: {
      width: '2px',
      height: '20px',
    },
  },

  // Clock hands
  clockHand: {
    position: 'absolute' as const,
    backgroundColor: COLORS.primary,
    transformOrigin: 'bottom center',
    borderRadius: '2px',

    // Hour hand - pointing to 4 (404)
    '&.hour-hand': {
      width: '6px',
      height: '60px',
      bottom: '50%',
      left: '50%',
      marginLeft: '-3px',
      transform: 'rotate(120deg)', // 4 o'clock position
      zIndex: 2,
    },

    // Minute hand - pointing to 0 (404)
    '&.minute-hand': {
      width: '4px',
      height: '80px',
      bottom: '50%',
      left: '50%',
      marginLeft: '-2px',
      transform: 'rotate(0deg)', // 12 o'clock position
      zIndex: 2,
    },

    [theme.breakpoints.down('md')]: {
      '&.hour-hand': {
        width: '5px',
        height: '50px',
        marginLeft: '-2.5px',
      },
      '&.minute-hand': {
        width: '3px',
        height: '65px',
        marginLeft: '-1.5px',
      },
    },

    [theme.breakpoints.down('sm')]: {
      '&.hour-hand': {
        width: '4px',
        height: '40px',
        marginLeft: '-2px',
      },
      '&.minute-hand': {
        width: '2px',
        height: '50px',
        marginLeft: '-1px',
      },
    },
  },

  // 404 numbers positioned like clock numbers
  clockNumber: {
    position: 'absolute' as const,
    fontSize: '2.5rem',
    fontWeight: 800,
    color: COLORS.gold600,
    fontFamily: 'serif',

    '&.number-4-left': {
      top: '25%',
      left: '15%',
      transform: 'rotate(-30deg)',
    },
    '&.number-0-top': {
      top: '8%',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    '&.number-4-right': {
      top: '25%',
      right: '15%',
      transform: 'rotate(30deg)',
    },

    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },

  // Main title
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: COLORS.textPrimary,
    marginBottom: theme.spacing(1),

    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
    },
  },

  // Description text
  description: {
    fontSize: '1.125rem',
    color: COLORS.textSecondary,
    lineHeight: 1.6,
    marginBottom: theme.spacing(2),
    maxWidth: '500px',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },

  // Time display (like digital watch)
  timeDisplay: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: COLORS.gray900,
    fontFamily: 'monospace',
    backgroundColor: COLORS.gray100,
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    border: `2px solid ${COLORS.borderLight}`,
    marginBottom: theme.spacing(2),
    letterSpacing: '2px',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
      padding: theme.spacing(0.75, 1.5),
    },
  },

  // Button container
  buttonContainer: {
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'center',
    flexWrap: 'wrap',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      gap: theme.spacing(1.5),

      '& > *': {
        width: '100%',
        maxWidth: '280px',
      },
    },
  },

  // Watch brand text (like luxury watch brands)
  brandText: {
    position: 'absolute' as const,
    top: '65%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: '1px',

    [theme.breakpoints.down('sm')]: {
      fontSize: '0.65rem',
    },
  },

  // Simple ticking animation for second hand
  '@keyframes tick': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },

  // Second hand (optional, simple animation)
  secondHand: {
    position: 'absolute' as const,
    width: '2px',
    height: '90px',
    backgroundColor: COLORS.gold500,
    bottom: '50%',
    left: '50%',
    marginLeft: '-1px',
    transformOrigin: 'bottom center',
    animation: 'tick 60s linear infinite',
    zIndex: 1,
    borderRadius: '1px',

    [theme.breakpoints.down('md')]: {
      height: '75px',
    },

    [theme.breakpoints.down('sm')]: {
      height: '60px',
    },
  },
});
