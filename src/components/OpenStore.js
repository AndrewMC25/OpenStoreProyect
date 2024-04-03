import { useState } from "react";
import Link from 'next/link'
import { Stack } from "@mui/material";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Sidebar from "../Layout/Sidebar";
import Navbar from "../Layout/Navbar";
import ProductCard from "../Layout/ProductCard";

import FetchAllProducts from "../hooks/Fetchers/FetchAllProducts";
import FetchAllUnits from "../hooks/Fetchers/FetchAllUnits";
import FetchAllPresentations from "../hooks/Fetchers/FetchAllPresentations";

function OpenStore() {
  const [navMenu, setNavMenu] = useState(false)
  const [intentoryMenu, setInventoryMenu] = useState(true)

  const products = FetchAllProducts()
  const [openEditProduct, setOpenEditProduct] = useState(false)
  const [rowProduct, setRowProduct] = useState('')

  const handleOpenEditProduct = (id) => {
    setOpenEditProduct(true);
    const selectedProduct = products.find(product => (product.id === id))
    setRowProduct(selectedProduct)
  }
  const handleCloseEditProduct = () => {
    setOpenEditProduct(false);
  }

  const units = FetchAllUnits()
  const [openEditUnit, setOpenEditUnit] = useState(false)
  const [rowUnit, setRowUnit] = useState('')

  const handleOpenEditUnit = (id) => {
    setOpenEditUnit(true);
    const selectedUnit = units.find(unit => (unit.id === id))
    setRowUnit(selectedUnit)
  }
  const handleCloseEditUnit = () => {
    setOpenEditUnit(false);
  }

  const presentations = FetchAllPresentations()
  const [openEditPresentation, setOpenEditPresentation] = useState(false)
  const [rowPresentation, setRowPresentation] = useState('')

  const handleOpenEditPresentation = (id) => {
    setOpenEditPresentation(true);
    const selectedPresentation = presentations.find(presentation => (presentation.id === id))
    setRowPresentation(selectedPresentation)
  }
  const handleCloseEditPresentation = () => {
    setOpenEditPresentation(false);
  }

  return (
    <Stack>
      <Navbar navMenu={navMenu} setNavMenu={setNavMenu} />
      <Stack sx={{ textAlign: 'center', alignItems: 'center' }}>
        <br />
        <Sidebar
          navMenu={navMenu}
          setNavMenu={setNavMenu}
        />
        {
          products && (
            <ProductCard products={products} />
          )
        }
      </Stack>
    </Stack>
  );
}

export default OpenStore;