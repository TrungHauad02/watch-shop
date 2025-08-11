import { BRAND_COLORS } from '@/styles/colors';
import { AppBar, IconButton, Toolbar, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

export default function WSHeader() {
  const theme = useTheme();
  const isMobile = theme.breakpoints.down('sm');

  const handleMobileMenuToggle = () => {
    // Logic to toggle mobile menu
  };

  // ==============================================
  // RENDER COMPONENTS
  // ==============================================
  const renderLogo = () => {
    return (
      <div style={{ flexGrow: 1 }}>
        {/* Logo Component */}
        <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
      </div>
    );
  };

  const renderDesktopNavigation = () => {
    return (
      <nav style={{ flexGrow: 1 }}>
        {/* Desktop Navigation Links */}
        <ul
          style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}
        >
          <li style={{ marginRight: 20 }}>Home</li>
          <li style={{ marginRight: 20 }}>Products</li>
          <li>Contact</li>
        </ul>
      </nav>
    );
  };

  const renderSearchBox = () => {
    return (
      <div style={{ flexGrow: 1 }}>
        {/* Search Box Component */}
        <input
          type="text"
          placeholder="Search..."
          style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
        />
      </div>
    );
  };

  const renderActionButtons = () => {
    return (
      <div>
        {/* Action Buttons */}
        <IconButton color="inherit">
          {/* Cart Icon */}
          <span>🛒</span>
        </IconButton>
        <IconButton color="inherit">
          {/* User Icon */}
          <span>👤</span>
        </IconButton>
      </div>
    );
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleMobileMenuToggle}
              sx={{ mr: 1, color: BRAND_COLORS.secondary }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          {renderLogo()}

          {/* Desktop Navigation */}
          {!isMobile && renderDesktopNavigation()}

          {/* Search Box */}
          {renderSearchBox()}

          {/* Action Buttons */}
          {renderActionButtons()}
        </Toolbar>
      </AppBar>
    </>
  );
}
