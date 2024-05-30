import { use, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { Box, Checkbox, TableCell, TableRow, TableHead, TableSortLabel, Toolbar, Typography, IconButton, Tooltip, Table, TableBody, TableContainer, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useSnackbar } from 'notistack';
import handleDataDelete from '../service/frontend/dataDeleteServiceHandler';
import { useUserContext } from '../context/userContext';

export default function EnhancedTable({ rows, headCells, title, handleClickOpen, tableTitle, brands, units, presentations, icon, iconTitle }) {
    const user = useUserContext();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');
    const [selected, setSelected] = useState([]);
    const [allRows, setAllRows] = useState(rows)
    const { enqueueSnackbar } = useSnackbar()

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        const catchAllRows = () => {
            setAllRows(rows)
        }

        catchAllRows()
    }, [rows])

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = allRows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleDeleteSelected = () => {
        selected.map(
            async row => {
                const data = {
                    table: tableTitle,
                    row: row,
                    userId: user.id
                }
                try {
                    await handleDataDelete(data)
                    enqueueSnackbar('successfully edit!', { variant: 'success' })
                } catch (error) {
                    console.error(error)
                }
            }
        )
    };

    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    function EnhancedTableToolbar(props) {
        const { numSelected } = props;

        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {title}
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Tooltip title={iconTitle}>
                            <IconButton
                                onClick={
                                    () => {
                                        handleDeleteSelected()
                                        setSelected([])
                                    }
                                }
                            >
                                {icon}
                            </IconButton>
                        </Tooltip>
                    </Box>
                ) : null
                }
            </Toolbar>
        );
    }

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    }
    
    return (
        <Box>
            {allRows.length ?
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2, border: '1px solid #d3d3d3', borderRadius: '5px' }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size='medium'
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={allRows.length}
                                />
                                <TableBody>
                                    {allRows.map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                onClick={() => {
                                                    handleClick(row.id)
                                                }}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id}
                                                selected={isItemSelected}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    {row.name}
                                                </TableCell>
                                                {row.barcode && (
                                                    <TableCell align="right">{row.barcode}</TableCell>
                                                )}
                                                {row.description && (
                                                    <TableCell align="right">{row.description}</TableCell>
                                                )}
                                                {row.type && (
                                                    <TableCell align="right">{row.type}</TableCell>
                                                )}
                                                {row.abbreviation && (
                                                    <TableCell align="right">{row.abbreviation}</TableCell>
                                                )}
                                                {row.price && (
                                                    <TableCell align="right">{row.price}</TableCell>
                                                )}
                                                {row.amount && (
                                                    <TableCell align="right">{row.amount}</TableCell>
                                                )}
                                                {row.brand_id && (
                                                    <TableCell align="right">
                                                        {brands?.map(x => {
                                                            if (x.id === row.brand_id) {
                                                                return x.name
                                                            }
                                                            return null;
                                                        })}
                                                    </TableCell>
                                                )}
                                                {row.presentation_id && (
                                                    <TableCell align="right">
                                                        {presentations?.map(x => {
                                                            if (x.id === row.presentation_id) {
                                                                return x.name
                                                            }
                                                            return null;
                                                        })}
                                                    </TableCell>
                                                )}
                                                {row.unit_id && (
                                                    <TableCell align="right">
                                                        {units?.map(x => {
                                                            if (x.id === row.unit_id) {
                                                                return x.name
                                                            }
                                                            return null;
                                                        })}
                                                    </TableCell>
                                                )}
                                                {row.createdAt && (
                                                    <TableCell align="right">{row.createdAt}</TableCell>
                                                )}
                                                {row.visible && (
                                                    <TableCell align="right">
                                                        <IconButton onClick={() => {
                                                            handleClickOpen(row)
                                                        }} >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                )}
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
                : null}
        </Box>
    );
}