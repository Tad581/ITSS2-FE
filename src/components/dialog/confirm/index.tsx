import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { RoomAPI } from '../../../api/roomAPI';
import { toast } from 'react-toastify';


interface IProps {
  room_id: number;
  open: boolean;
  handleClose: () => void;
}

export default function ConfirmDialog(props: IProps) {
  const handleDelete = async (room_id: number) => {
      const response = await RoomAPI.deleteRoom({ id: room_id });
      if (response.success) {
        toast.success('Bạn đã xóa phòng thành công!', {
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
        toast.error('Bạn đã xóa phòng không thành công!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    };

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle id='alert-dialog-title'>
        Bạn có đồng ý xóa thông tin nhà trọ này ?
      </DialogTitle>

      <DialogActions>
        <Button onClick={props.handleClose}>Thoát</Button>
        <Button onClick={() => handleDelete(props.room_id)}>
          Đồng ý
        </Button>
      </DialogActions>

    </Dialog>
  );
}
