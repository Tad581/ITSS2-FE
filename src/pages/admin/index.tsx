import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { default as UserTable } from "./components/userTable";
import { default as SearchBar } from "./components/searchBar";
import { UserAPI } from "../../api/userAPI";
import { IUser } from "../../interfaces/user";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.uid !== userId));
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

  // const filteredUsers = users.filter(
  //   (user) =>
  //     user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     user.email.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  useEffect(() => {
    const fetchData = async () => {
      const users = await UserAPI.getAllUser({ page: 1, pageSize: 100 });
      setUsers(users);
    };
    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Quản lý thông tin người dùng
      </Typography>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box sx={{ marginTop: 5 }}>
        <UserTable
          users={users}
          onDelete={handleDelete}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default Admin;
