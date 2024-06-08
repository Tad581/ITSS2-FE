import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IUser } from "../../../interfaces/user";
import * as dayjs from "dayjs";

interface UserTableProps {
  users: IUser[];
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onDelete,
}) => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Tên đăng nhập</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell>
                  <Avatar src={user.avatarUrl} />
                </TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  {dayjs(user.dateOfBirth).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell>
                  {user.gender === "MALE"
                    ? "Nam"
                    : user.gender === "FEMALE"
                    ? "Nữ"
                    : "Khác"}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onDelete(user.uid)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;
