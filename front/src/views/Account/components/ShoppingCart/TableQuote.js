import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';


export default function TableQuote({rows,discount}) {
    const [tot,setTot]=React.useState(0)
    React.useEffect(()=>{
        var totale=0
        for(let i=0;i<rows.length;i++){
            totale+=rows[i].unitprice*rows[i].quantity
        }
        setTot(totale)
    },[])
    const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });
  
  return (
    <TableContainer sx={{width:'100%'}} component={Paper}>
      <Table  aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            {
              isSm?
              (<TableCell>product</TableCell>)
              :
              (<TableCell align="center" colSpan={2}>Code</TableCell>)
            }
            <TableCell align="right">Qty.</TableCell>
            {
              isSm &&
              <TableCell align="right">dur(Month)</TableCell>
            }
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,ind) => (
            <TableRow key={ind}>
             {
               isSm?
               ( <TableCell>{row.name}</TableCell>)
               :
               <TableCell align="center" colSpan={2}>{row.productcode}</TableCell>
             }
              <TableCell align="right">{row.quantity}</TableCell>
              {
                isSm &&
                <TableCell align="right">{row.duration__c}</TableCell>
              }
              <TableCell align="right">{row.quantity*row.unitprice}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{tot}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>discount</TableCell>
            <TableCell align="right">{discount ? discount:"0%"}</TableCell>
            <TableCell align="right">{discount ? discount*tot:"0"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{tot*(1-(discount/100))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
