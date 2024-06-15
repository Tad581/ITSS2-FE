import { Box, IconButton, Stack } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useState } from 'react';

type QuiltedImageListItem = {
  img: string;
  title: string;
};

type QuiltedImageListProps = {
  itemData: QuiltedImageListItem[];
};

export default function QuiltedImageList({ itemData }: QuiltedImageListProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % itemData.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? itemData.length - 1 : prevIndex - 1
    );
  };

  if (!itemData.length) {
    return <></>;
  }

  return (
    <Box sx={{ textAlign: 'center', position: 'relative', maxWidth: '600px', margin: 'auto' }}>
      {/* Main Image List */}
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', marginTop: 2 }}>
        {itemData.map((item, index) => (
          <Box
            key={item.img}
            sx={{
              width: 50,
              height: 50,
              overflow: 'hidden',
              borderRadius: 1,
              cursor: 'pointer',
              border: index === currentImageIndex ? '2px solid #40A578' : '2px solid transparent',
            }}
            onClick={() => setCurrentImageIndex(index)}
          >
            <img
              src={item.img}
              alt={item.title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Stack>

      {/* Main Image Display */}
      <Box sx={{ position: 'relative', marginTop: 2 }}>
        <img
          src={itemData[currentImageIndex].img}
          alt={itemData[currentImageIndex].title}
          style={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 4 }}
        />
        {/* Previous and Next Buttons */}
        <IconButton
          onClick={handlePrevImage}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          }}
        >
          <ArrowBackIos />
        </IconButton>
        <IconButton
          onClick={handleNextImage}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
}


QuiltedImageList.defaultProps = {
  itemData: [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
  ],
};
