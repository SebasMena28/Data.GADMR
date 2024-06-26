import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import { useAuth } from '../context/supaContex';
import NewUserPage from './NewUserPage';
import EditUserPage from './EditUserPage';
import DeleteUserPage from './DeleteUserPage';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'nombreProgramaFinanciero', label: 'NOMBRE DEL PROGRAMA FINANCIERO / PROYECTO POA', alignRight: false },
  { id: 'nombrePartida', label: 'NOMBRE DE LA PARTIDA', alignRight: false },
  { id: 'descripcionGasto', label: 'DESCRIPCIÓN DEL GASTO', alignRight: false },
  { id: 'asignacionInicial', label: 'ASIGNACIÓN INICIAL', alignRight: false },
  { id: 'presupuestoCodigicado', label: 'PRESUPUESTO CODIFICADO CON APROBACIÓN POA 2023', alignRight: false },
  { id: '', label: '', alignRight: false },

];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(agentes, comparator, query) {
  const stabilizedThis = agentes.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(agentes, (_user) => _user.nombreProgramaFinanciero.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [agentes, setAgentes] = useState([]);

  const {getClientes} = useAuth();

  const [openNewUser, setOpenNewUser] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [openDeleteUser, setOpenDeleteUser] = useState(false);

  const [selectedRowData, setSelectedRowData] = useState({ 
  codigo: '',nombreProgramaFinanciero:'', partida:'',	nombrePartida:'',	codigoOrientadorGasto:'', descripcionGasto:'',	asignacionInicial:'',	codificado:'',	reformaPresupuesto:'',	presupuestoCodificado2023:'',	traspasos:'', presupuestoCodificado:''
});


  const handleClickOpen = () => {
    setOpenNewUser(true);
  };

  const handleClose = () => {
    setOpenNewUser(false);
  };

  const handleClickOpenEdit = () => {

    setOpenEditUser(true);
    handleCloseMenu();
  };

  const handleCloseEdit = () => {
    setOpenEditUser(false);
    
  };

  
  const handleClickOpenDelete = () => {

    setOpenDeleteUser(true);
    handleCloseMenu();

  };

  const handleCloseDelete = () => {
    setOpenDeleteUser(false);
  };



  const handleOpenMenu = (event, row) => {
    setSelectedRowData(row);
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = agentes.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const fetchAgentes = async () => 
  {
    const data =  await getClientes();

    setAgentes(data);
}


  useEffect(() => {

    const fetchAgentes = async () => 
    {
      const data =  await getClientes();
      setAgentes(data);
  }

    fetchAgentes();

  }, []);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - agentes.length) : 0;

  const filteredUsers = applySortFilter(agentes, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> GADM RIOBAMBA </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Plan Anual de Compras
          </Typography>
          <Button variant="contained" onClick={handleClickOpen}  startIcon={<Iconify icon="eva:plus-fill" />}>
            Nuevo PAC
          </Button>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName}  />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1000 }}>
              <Table >
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={agentes.length}
                  onRequestSort={handleRequestSort}
                  
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { nombreProgramaFinanciero, nombrePartida, descripcionGasto, asignacionInicial,createdAt, presupuestoCodificado,id } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}  >


                        <TableCell component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle3" >
                              {nombreProgramaFinanciero} 
                            </Typography>
                          </Stack>
                        </TableCell>


                        <TableCell align="left">{nombrePartida}</TableCell>

                        <TableCell align="left">{descripcionGasto}</TableCell>

                        <TableCell align="left">${asignacionInicial}</TableCell>
                    
                        <TableCell align="left">${presupuestoCodificado}</TableCell>


                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={agentes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleClickOpenEdit} >
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Editar
        </MenuItem>

        <MenuItem  onClick={handleClickOpenDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>
      <NewUserPage openNewUser={openNewUser} handleClose={handleClose}  fetchAgentes={fetchAgentes} />
      <EditUserPage openEditUser = {openEditUser} handleCloseEdit  = {handleCloseEdit} selectClient = {selectedRowData} setSelectedRowData={setSelectedRowData}  fetchAgentes={fetchAgentes} />
      <DeleteUserPage openDeleteUser={openDeleteUser} handleCloseDelete={handleCloseDelete} id={selectedRowData.id} fetchAgentes={fetchAgentes}/>
    </>
  );
}
