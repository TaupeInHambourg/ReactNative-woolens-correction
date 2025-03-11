const productValidator = (product) => {
  const errors = {}
  if (!product.name || product.name.length < 1) {
    errors.name = 'Le nom du produit est vide'
  }
  if (!product.price || product.price < 0) {
    errors.price = 'Le prix du produit est incorrect'
  }
  if (!product.short_description || product.short_description.length < 1) {
    errors.short_description = 'La description du produit est vide'
  }
  return errors || null
}

export {
  productValidator
}
