import React, { useState, useEffect } from "react";
import { Box, Container, Pagination, Typography } from "@mui/material";
import { default as UserTable } from "./components/userTable";
import { default as SearchBar } from "./components/searchBar";
import { UserAPI } from "../../../api/userAPI";
import { IUser } from "../../../interfaces/user";

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalRecords: 0,
  });

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.uid !== userId));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(event);
    setPagination({ ...pagination, currentPage: page });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllUser({
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
      });
      const { currentPage, pageSize, totalRecords } = response;
      setUsers(
        response.content.filter(
          (user: IUser) =>
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.userName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setPagination({ currentPage, pageSize, totalRecords });
    };
    fetchData().catch((error) => console.log(error));
  }, [pagination.currentPage, pagination.pageSize, searchQuery]);

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom textAlign={"center"}>
        Quản lý thông tin người dùng
      </Typography>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Box sx={{ marginTop: 5 }}>
        <UserTable users={users} onDelete={handleDelete} />
      </Box>
      {Math.ceil(pagination.totalRecords / pagination.pageSize) <= 1 ? (
        <Box sx={{ marginBottom: 10 }}></Box>
      ) : (
        <Pagination
          sx={{ marginY: 6 }}
          count={Math.ceil(pagination.totalRecords / pagination.pageSize)}
          onChange={handlePageChange}
          page={pagination.currentPage}
        />
      )}
    </Container>
  );
};

export default AdminUsers;
