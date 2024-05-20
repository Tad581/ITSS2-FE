import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { RoomAPI } from '../../../api/roomAPI';
import { toast } from 'react-toastify';

interface IProps {
  roomId: string | undefined;
  open: boolean;
  handleClose: () => void;
}

export default function ConfirmDialog(props: IProps) {
  const handleDelete = async (roomId: string | undefined) => {
    if (roomId) {
      const response = await RoomAPI.deleteRoom({ id: roomId });
      if (response.message === 'Success') {
        toast.success(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        props.handleClose();
      } else {
        toast.error(response.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        props.handleClose();
      }
    }
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle id='alert-dialog-title'>
        Bạn có đồng ý xóa thông tin nhà trọ này ?
      </DialogTitle>

      <DialogActions>
        <Button onClick={props.handleClose}>Thoát</Button>
        <Button onClick={() => handleDelete(props.roomId)}>Đồng ý</Button>
      </DialogActions>
    </Dialog>
  );
}
