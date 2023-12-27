import { useState } from 'react';
import { Box, Grid } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

type ImageUploadCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePropsImage?: (files: any[]) => void;
  existedImageUrls?: string[];
};

export default function ImageUploadCard(props: ImageUploadCardProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const filesArray: File[] = []; //[...props.uploadFiles];
    if (files) {
      const previewArray = Array.from(files).map((file) => {
        filesArray.push(file);
        return URL.createObjectURL(file);
      });
      setPreviewImages(previewArray);
      if (props?.handlePropsImage) {
        // Handle the image field change here
        props.handlePropsImage(filesArray);
        console.log(filesArray);
      }
    }
  };

  return (
    <Grid container spacing={2} width={'calc(100%)'}>
      {props?.existedImageUrls &&
        props?.existedImageUrls?.map((url) => (
          <Grid item key={url} sm={2} md={2} lg={2} xl={2}>
            <img
              src={url}
              alt='Preview'
              style={{
                width: '100%',
                objectFit: 'cover',
                border: '1px solid black',
                borderRadius: '10px',
                aspectRatio: '1 / 1',
              }}
            />
          </Grid>
        ))}
      {previewImages.map((previewImage) => (
        <Grid item key={previewImage} sm={2} md={2} lg={2} xl={2}>
          <img
            src={previewImage}
            alt='Preview'
            style={{
              width: '100%',
              objectFit: 'cover',
              border: '1px solid black',
              borderRadius: '10px',
              aspectRatio: '1 / 1',
            }}
          />
        </Grid>
      ))}
      <Grid item sm={2} md={2} lg={2} xl={2}>
        <Box
          sx={{
            border: '1px solid black',
            padding: '0px',
            aspectRatio: '1 / 1',
            cursor: 'pointer',
            borderRadius: '10px',
          }}
        >
          <label
            htmlFor='image-upload'
            style={{
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AddOutlinedIcon sx={{ fontSize: 60 }} />
          </label>
          <input
            id='image-upload'
            type='file'
            name='images'
            accept='image/*'
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
            width='100%'
            height='100%'
          />
        </Box>
      </Grid>
    </Grid>
  );
}

// export default function ImageUploadCard() {
//   const [files, setFiles] = useState<unknown[]>([])
//   const [fileUrls, setFileUrls] = useState<String[]>([])

//   const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files)
//     if (!selectedFiles) {
//       return;
//     }
//     const selectedFileUrls = selectedFiles.map(f => URL.createObjectURL(f))
//     setFiles([...files, ...selectedFiles])
//     setFileUrls([...fileUrls, ...selectedFileUrls])
//   }
//   console.log(fileUrls)

//   return (
//     <Box>
//       {
//         fileUrls.map(f =>
//           <Image key={f} src={f} sx={{width: 100, height: 100}} />
//         )
//       }

//       <Button
//         variant="contained"
//         component="label"
//       >
//         Upload File {files.length}
//         <input type="file" multiple onChange={fileSelectedHandler}
//           hidden />
//       </Button>

//     </Box>
//   )
// }
