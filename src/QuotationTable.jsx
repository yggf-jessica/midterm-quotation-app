
// import { Container, Button, Table } from "react-bootstrap"
// import { CiShoppingCart } from "react-icons/ci"
// import { MdClear } from "react-icons/md"
// import { BsFillTrashFill } from "react-icons/bs"

// import style from "./mystyle.module.css"

// function QuotationTable({ data, deleteByIndex, clearAllItems }) {
//   // Guard condition
//   if (!data || data.length === 0) {
//     return (
//       <Container>
//         <h1>Quotation</h1>
//         <p>
//           <CiShoppingCart /> No items
//         </p>
//       </Container>
//     )
//   }

//   const total = data.reduce((acc, v) => acc + (v.qty * v.ppu - (v.discount || 0)), 0)
//   const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0) // Calculate total discount

//   const handleDelete = (index) => {
//     deleteByIndex(index)
//   }

//   return (
//     <Container>
//       <h1>Quotation</h1>
//       <Button variant="outline-dark" onClick={clearAllItems}>
//         <MdClear /> Clear
//       </Button>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th className={style.textCenter}>-</th>
//             <th className={style.textCenter}>Qty</th>
//             <th className={style.textCenter}>Item</th>
//             <th className={style.textCenter}>Price/Unit</th>
//             <th className={style.textCenter}>Discount</th> {/* New column header */}
//             <th className={style.textCenter}>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((v, i) => {
//             const amount = v.qty * v.ppu - (v.discount || 0) // Apply discount here
//             return (
//               <tr key={i}>
//                 <td className={style.textCenter}>
//                   <BsFillTrashFill onClick={() => handleDelete(i)} />
//                 </td>
//                 <td className={style.textCenter}>{v.qty}</td>
//                 <td>{v.item}</td>
//                 <td className={style.textCenter}>{v.ppu}</td>
//                 <td className={style.textCenter}>{v.discount || 0}</td> {/* Display discount */}
//                 <td className={style.textRight}>{amount}</td>
//               </tr>
//             )
//           })}
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan={4} className={style.textRight}>
//               Total Discount
//             </td>
//             <td className={style.textCenter}>{totalDiscount}</td> {/* Display total discount */}
//             <td></td> {/* Empty cell for alignment */}
//           </tr>
//           <tr>
//             <td colSpan={5} className={style.textRight}>
//               Total
//             </td>
//             <td className={style.textRight}>{total}</td>
//           </tr>
//         </tfoot>
//       </Table>
//     </Container>
//   )
// }

// export default QuotationTable
"use client"
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { ShoppingCart, X, Trash2 } from "lucide-react"

function QuotationTable({ data, deleteByIndex, clearAllItems }) {
  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>
          Quotation
        </Typography>
        <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
          <ShoppingCart size={20} /> No items
        </Typography>
      </Box>
    )
  }

  const total = data.reduce((acc, v) => acc + (v.qty * v.ppu - (v.discount || 0)), 0)
  const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0)

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Quotation
      </Typography>
      <Button variant="outlined" sx={{ mb: 2 }} onClick={clearAllItems} startIcon={<X size={16} />}>
        Clear
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: 50 }}>
                -
              </TableCell>
              <TableCell align="center" sx={{ width: 80 }}>
                Qty
              </TableCell>
              <TableCell>Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const amount = v.qty * v.ppu - (v.discount || 0)
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <Button variant="text" size="small" onClick={() => handleDelete(i)} sx={{ minWidth: 0, p: 0 }}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">{v.discount || 0}</TableCell>
                  <TableCell align="right">{amount.toFixed(2)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <tfoot style={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}>
            <TableRow>
              <TableCell colSpan={4} align="right" sx={{ fontWeight: "bold" }}>
                Total Discount
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                {totalDiscount.toFixed(2)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right" sx={{ fontWeight: "bold" }}>
                Total
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                {total.toFixed(2)}
              </TableCell>
            </TableRow>
          </tfoot>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default QuotationTable
