import { Box, Container } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import FeaturedWatches from "../components/FeaturedWatches";
import AboutSection from "../components/AboutSection";
import useColor from "theme/useColor";

export default function HomePage() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const featuredWatches = [
    {
      id: 1,
      name: "Royal Oak Chronograph",
      price: "14000000",
      image:
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Nautilus Blue Dial",
      price: "25600000",
      image:
        "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Daytona Platinum",
      price: "42000000",
      image:
        "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: isDarkMode ? color.gray900 : color.gray100,
        mb: { xs: 2, sm: 4 },
      }}
    >
      <Container maxWidth="lg">
        <HeroSection />
        <FeaturesSection />
        <FeaturedWatches watches={featuredWatches} />
        <AboutSection />
      </Container>
    </Box>
  );
}
