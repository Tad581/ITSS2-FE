import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { default as UserTable } from "./components/userTable";
import { default as SearchBar } from "./components/searchBar";

interface User {
  id: number;
  avatar: string;
  fullname: string;
  email: string;
  phonenumber: string;
  dateOfBirth: string;
  gender: string;
}

const mockUsers: User[] = [
  // Thêm dữ liệu mẫu của người dùng tại đây
];

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quản lý thông tin tài khoản
      </Typography>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <UserTable
        users={filteredUsers}
        onDelete={handleDelete}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default Admin;
