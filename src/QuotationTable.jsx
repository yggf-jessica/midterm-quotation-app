
// "use client"
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material"
// import { ShoppingCart, X, Trash2 } from "lucide-react"

// function QuotationTable({ data, deleteByIndex, clearAllItems }) {
//   // Guard condition
//   if (!data || data.length === 0) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h5" gutterBottom>
//           Quotation
//         </Typography>
//         <Typography variant="body1" sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.secondary" }}>
//           <ShoppingCart size={20} /> No items
//         </Typography>
//       </Box>
//     )
//   }

//   const total = data.reduce((acc, v) => acc + (v.qty * v.ppu - (v.discount || 0)), 0)
//   const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0)

//   const handleDelete = (index) => {
//     deleteByIndex(index)
//   }

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         Quotation
//       </Typography>
//       <Button variant="outlined" sx={{ mb: 2 }} onClick={clearAllItems} startIcon={<X size={16} />}>
//         Clear
//       </Button>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell align="center" sx={{ width: 50 }}>
//                 -
//               </TableCell>
//               <TableCell align="center" sx={{ width: 80 }}>
//                 Qty
//               </TableCell>
//               <TableCell>Item</TableCell>
//               <TableCell align="center">Price/Unit</TableCell>
//               <TableCell align="center">Discount</TableCell>
//               <TableCell align="right">Amount</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((v, i) => {
//               const amount = v.qty * v.ppu - (v.discount || 0)
//               return (
//                 <TableRow key={i}>
//                   <TableCell align="center">
//                     <Button variant="text" size="small" onClick={() => handleDelete(i)} sx={{ minWidth: 0, p: 0 }}>
//                       <Trash2 size={16} />
//                     </Button>
//                   </TableCell>
//                   <TableCell align="center">{v.qty}</TableCell>
//                   <TableCell>{v.item}</TableCell>
//                   <TableCell align="center">{v.ppu}</TableCell>
//                   <TableCell align="center">{v.discount || 0}</TableCell>
//                   <TableCell align="right">{amount.toFixed(2)}</TableCell>
//                 </TableRow>
//               )
//             })}
//           </TableBody>
//           <tfoot style={{ borderTop: "1px solid rgba(224, 224, 224, 1)" }}>
//             <TableRow>
//               <TableCell colSpan={4} align="right" sx={{ fontWeight: "bold" }}>
//                 Total Discount
//               </TableCell>
//               <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                 {totalDiscount.toFixed(2)}
//               </TableCell>
//               <TableCell></TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell colSpan={5} align="right" sx={{ fontWeight: "bold" }}>
//                 Total
//               </TableCell>
//               <TableCell align="right" sx={{ fontWeight: "bold" }}>
//                 {total.toFixed(2)}
//               </TableCell>
//             </TableRow>
//           </tfoot>
//         </Table>
//       </TableContainer>
//     </Box>
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

  // Calculate total discount amount
  const totalDiscountAmount = data.reduce((acc, v) => acc + v.qty * v.ppu * (v.discount / 100 || 0), 0)
  // Calculate total amount after all discounts
  const total = data.reduce((acc, v) => acc + v.qty * v.ppu * (1 - (v.discount / 100 || 0)), 0)

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
              <TableCell align="center">Discount (%)</TableCell> {/* Updated header */}
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const amount = v.qty * v.ppu * (1 - (v.discount / 100 || 0)) // Apply percentage discount
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <Button variant="text" size="small" onClick={() => handleDelete(i)} sx={{ minWidth: 0, p: 0 }}>
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell align="center">{v.ppu.toFixed(2)}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.discount || 0}%</TableCell> {/* Display with % */}
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
                {totalDiscountAmount.toFixed(2)}
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
