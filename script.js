const options = [
  {
    weight: 100,
    article: "01306",
    oldPrice: "349.20",
    newPrice: "326.40",
  },
  {
    weight: 500,
    article: "01307",
    oldPrice: "1646.00",
    newPrice: "1432.00",
  },
  {
    weight: 1000,
    article: "01308",
    oldPrice: "2592.00",
    newPrice: "2064.00",
  },
  {
    weight: 5000,
    article: "01309",
    oldPrice: "8710.00",
    newPrice: "6320.00",
  },
]

const cart = []

const HIDDEN_CLASS_NAME = "card__product_hidden"
const DATA_WEIGHT_ATTRIBUTE = "data-weight"

const $selectionBlock = document.querySelector(".card__selectionblock")
const $select = document.querySelector(".card__select")
const $productBlock = document.querySelector(".card__product")
const $weight = document.querySelector(".card__weight")
const $article = document.querySelector(".card__article")
const $newPrice = document.querySelector(".card__newprice")
const $oldPrice = document.querySelector(".card__oldprice")
const $cartButton = document.querySelector(".cartbutton")
const $cartCounter = document.querySelector(".cartbutton__counter")

const loadItem = (weight) => {
  const item = options.find((option) => option.weight == weight)
  if (!item) {
    $productBlock.classList.add(HIDDEN_CLASS_NAME)
    $weight.innerHTML = ""
    $article.innerHTML = ""
    $newPrice.innerHTML = ""
    $oldPrice.innerHTML = ""
    $cartButton.removeAttribute(DATA_WEIGHT_ATTRIBUTE)
    $cartCounter.innerHTML = ""
    return
  }
  $weight.innerHTML = `${weight} г`
  $article.innerHTML = `арт ${item.article}`
  $newPrice.innerHTML = `${item.newPrice} ₽`
  $oldPrice.innerHTML = `${item.oldPrice} ₽`
  $cartButton.setAttribute(DATA_WEIGHT_ATTRIBUTE, weight.toString())
  $cartCounter.innerHTML = setCartCounterInnerHTML(weight)
  $productBlock.classList.remove(HIDDEN_CLASS_NAME)
}

const loadItems = () => {
  $select.innerHTML = options.map(
    (option, index) =>
      `<option value="${option.weight.toString()}" ${index === 0 && "selected"}>${option.weight}г</option>`,
  )

  $selectionBlock.classList.remove("card__selectionblock_hidden")
  loadItem(options[0].weight)
}

const countItems = (weight) => {
  return cart.filter((item) => item.weight == weight).length
}

const setCartCounterInnerHTML = (weight) => {
  const value = countItems(weight)
  if (!value) {
    return ""
  }
  return value
}

const onWeightChange = (e) => {
  loadItem(e.target.value)
}

const onCartClick = (e) => {
  const weight = e.target.attributes[DATA_WEIGHT_ATTRIBUTE].value
  cart.push({ weight })
  $cartCounter.innerHTML = setCartCounterInnerHTML(weight)
}

const main = () => {
  loadItems()
  $select.addEventListener("change", onWeightChange)
  $cartButton.addEventListener("click", onCartClick)
}

main()
