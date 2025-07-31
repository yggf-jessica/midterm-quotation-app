
// import { useState, useRef } from "react"
// import { Container, Row, Col, Button, Form } from "react-bootstrap"
// import QuotationTable from "./QuotationTable"

// const products = [
//   { code: "p001", name: "Product A", price: 100 },
//   { code: "p002", name: "Product B", price: 200 },
//   { code: "p003", name: "Product C", price: 150 },
//   { code: "p004", name: "Product D", price: 250 },
// ]

// function App() {
//   const itemRef = useRef()
//   const ppuRef = useRef()
//   const qtyRef = useRef()
//   const discountRef = useRef()

//   const [dataItems, setDataItems] = useState([])
//   const [ppu, setPpu] = useState(products[0].price)
//   const [discount, setDiscount] = useState(0)

//   const addItem = () => {
//     const selectedProduct = products.find((v) => itemRef.current.value === v.code)
//     if (!selectedProduct) return // Should not happen with default selection

//     const newItem = {
//       item: selectedProduct.name,
//       ppu: Number.parseFloat(ppuRef.current.value),
//       qty: Number.parseInt(qtyRef.current.value),
//       discount: discountRef.current ? Number.parseFloat(discountRef.current.value) : 0,
//     }

//     // Check for redundant items
//     const existingItemIndex = dataItems.findIndex((item) => item.item === newItem.item && item.ppu === newItem.ppu)

//     if (existingItemIndex > -1) {
//       // Redundant item found, merge quantities and discounts
//       const updatedDataItems = [...dataItems]
//       updatedDataItems[existingItemIndex].qty += newItem.qty
//       updatedDataItems[existingItemIndex].discount += newItem.discount
//       setDataItems(updatedDataItems)
//     } else {
//       // Not redundant, add as a new item
//       setDataItems([...dataItems, newItem])
//     }
//   }

//   const deleteByIndex = (index) => {
//     const newDataItems = [...dataItems]
//     newDataItems.splice(index, 1)
//     setDataItems(newDataItems)
//   }

//   const clearAllItems = () => {
//     setDataItems([])
//   }

//   const productChange = () => {
//     const item = products.find((v) => itemRef.current.value === v.code)
//     setPpu(item.price)
//   }

//   return (
//     <Container>
//       <Row>
//         <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
//           <Row>
//             <Col>
//               Item
//               <Form.Select ref={itemRef} onChange={productChange}>
//                 {products.map((p) => (
//                   <option key={p.code} value={p.code}>
//                     {p.name}
//                   </option>
//                 ))}
//               </Form.Select>
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Label>Price Per Unit</Form.Label>
//               <Form.Control type="number" ref={ppuRef} value={ppu} onChange={(e) => setPpu(e.target.value)} />
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Label>Quantity</Form.Label>
//               <Form.Control type="number" ref={qtyRef} defaultValue={1} />
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <Form.Label>Discount</Form.Label>
//               <Form.Control
//                 type="number"
//                 ref={discountRef}
//                 value={discount}
//                 onChange={(e) => setDiscount(Number.parseFloat(e.target.value))}
//                 defaultValue={0}
//               />
//             </Col>
//           </Row>
//           <hr />
//           <div className="d-grid gap-2">
//             <Button variant="primary" onClick={addItem}>
//               Add
//             </Button>
//           </div>
//         </Col>
//         <Col md={8}>
//           <QuotationTable data={dataItems} deleteByIndex={deleteByIndex} clearAllItems={clearAllItems} />
//         </Col>
//       </Row>
//     </Container>
//   )
// }

// export default App
"use client"

import { useState, useRef } from "react"
import {
  Box,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Typography,
} from "@mui/material"
import QuotationTable from "./QuotationTable"

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
]

function App() {
  const itemRef = useRef()
  const ppuRef = useRef()
  const qtyRef = useRef()
  const discountRef = useRef()

  const [dataItems, setDataItems] = useState([])
  const [selectedProductCode, setSelectedProductCode] = useState(products[0].code)
  const [ppu, setPpu] = useState(products[0].price)
  const [discount, setDiscount] = useState(0)

  const addItem = () => {
    const selectedProduct = products.find((v) => itemRef.current.value === v.code)
    if (!selectedProduct) return

    const newItem = {
      item: selectedProduct.name,
      ppu: Number.parseFloat(ppuRef.current.value),
      qty: Number.parseInt(qtyRef.current.value),
      discount: discountRef.current ? Number.parseFloat(discountRef.current.value) : 0,
    }

    const existingItemIndex = dataItems.findIndex((item) => item.item === newItem.item && item.ppu === newItem.ppu)

    if (existingItemIndex > -1) {
      const updatedDataItems = [...dataItems]
      updatedDataItems[existingItemIndex].qty += newItem.qty
      updatedDataItems[existingItemIndex].discount += newItem.discount
      setDataItems(updatedDataItems)
    } else {
      setDataItems([...dataItems, newItem])
    }
  }

  const deleteByIndex = (index) => {
    const newDataItems = [...dataItems]
    newDataItems.splice(index, 1)
    setDataItems(newDataItems)
  }

  const clearAllItems = () => {
    setDataItems([])
  }

  const productChange = (event) => {
    const value = event.target.value
    setSelectedProductCode(value)
    const item = products.find((v) => value === v.code)
    if (item) {
      setPpu(item.price)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: "#e4e4e4", p: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Add Item
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="item-select-label">Item</InputLabel>
              <Select
                labelId="item-select-label"
                id="item-select"
                value={selectedProductCode}
                label="Item"
                onChange={productChange}
                inputRef={itemRef}
              >
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Price Per Unit"
              type="number"
              inputRef={ppuRef}
              value={ppu}
              onChange={(e) => setPpu(Number.parseFloat(e.target.value))}
              sx={{ mb: 2 }}
            />
            <TextField fullWidth label="Quantity" type="number" inputRef={qtyRef} defaultValue={1} sx={{ mb: 2 }} />
            <TextField
              fullWidth
              label="Discount"
              type="number"
              inputRef={discountRef}
              value={discount}
              onChange={(e) => setDiscount(Number.parseFloat(e.target.value))}
              defaultValue={0}
              sx={{ mb: 2 }}
            />
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" fullWidth onClick={addItem}>
              Add
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <QuotationTable data={dataItems} deleteByIndex={deleteByIndex} clearAllItems={clearAllItems} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default App
