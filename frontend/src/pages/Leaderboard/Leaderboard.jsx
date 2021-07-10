import React, { useEffect, useState } from 'react'
import theme from '../../theme'
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  withStyles
} from '@material-ui/core'
import TablePaginationActions
  from '@material-ui/core/TablePagination/TablePaginationActions'
import * as PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import * as LeaderboardAPI from '../../api/LeaderboardAPI'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1
  },
  div: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    marginTop: theme.spacing(5),
    width: '50%',
    minWidth: 500,
    maxWidth: 1000
  }
}))

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    fontSize: 24
  },
  body: {
    fontSize: 24
  }
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow)

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
}

const Leaderboard = () => {
  const classes = useStyles(theme)
  const { enqueueSnackbar } = useSnackbar()

  const [pageNumber, setPageNumber] = React.useState(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [rows, setRows] = useState([])

  const context = {
    enqueueSnackbar,
    setLeaderboard: setRows
  }

  const pageStartIndex = (pageNumber - 1) * pageSize
  const pageEndIndex = pageStartIndex + pageSize

  useEffect(() => {
    LeaderboardAPI.getLeaderboard(pageNumber, pageSize, context)
  }, [pageNumber])

  const handleChangePageNumber = (newPageNumber) => (event) => {
    setPageNumber(newPageNumber)
  }

  const handleChangePageSize = (event) => {
    setPageSize(parseInt(event.target.value, 10))
    setPageNumber(1)
  }

  return (
    <div className={classes.div}>
      <Typography align="center" variant="h2">Betting Leaderboard</Typography>
      <TableContainer className={classes.container} component={Paper}>
        <Table aria-label="custom pagination table">
          <colgroup>
            <col style={{ width: '20%' }}/>
            <col style={{ width: '40%' }}/>
            <col style={{ width: '40%' }}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Position</StyledTableCell>
              <StyledTableCell align="center">User</StyledTableCell>
              <StyledTableCell align="center">Wallet Balance</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(
              pageSize > 0
                ? rows.slice(pageStartIndex, pageEndIndex)
                : rows
            ).map((row) => (
              <StyledTableRow key={row.position}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.position}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.username}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {`$ ${row.balance}`}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={pageSize}
                page={pageNumber - 1}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePageNumber}
                onChangeRowsPerPage={handleChangePageSize}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Leaderboard
