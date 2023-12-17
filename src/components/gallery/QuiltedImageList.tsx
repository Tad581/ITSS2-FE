import { ImageList, ImageListItem } from '@mui/material';
import { useMemo } from 'react';

type QuiltedImageListItem = {
  img: string;
  title: string;
};

type QuiltedImageListProps = {
  itemData: QuiltedImageListItem[];
};

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const quiltedSizes = [
  [[4, 2]],
  [
    [2, 2],
    [2, 2],
  ],
  [
    [2, 2],
    [2, 1],
    [2, 1],
  ],
  [
    [2, 2],
    [2, 1],
    [1, 1],
    [1, 1],
  ],
  [
    [2, 2],
    [1, 1],
    [1, 1],
    [1, 1],
    [1, 1],
  ],
];

export default function QuiltedImageList({ itemData }: QuiltedImageListProps) {
  if (!itemData.length) {
    return (
      <></>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const itemDataWithSizes = useMemo(() => {
    const length =
      itemData.length < quiltedSizes.length
        ? itemData.length
        : quiltedSizes.length;
    const quiltedSize = quiltedSizes[length - 1];
    return new Array(length).fill(0).map((_, i) => {
      return {
        ...itemData[i],
        cols: quiltedSize[i][0],
        rows: quiltedSize[i][1],
      };
    });
  }, [itemData]);

  return (
    <ImageList
      sx={{
        width: '100%',
        height: 'auto',
        margin: 'auto',
        borderRadius: 4,
      }}
      variant='quilted'
      cols={4}
      rowHeight={248}
    >
      {itemDataWithSizes.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
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
