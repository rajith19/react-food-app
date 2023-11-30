const ItemsList = ({ items }) => {
    return <div className="text-left border-b-2 py-5">
        <div className="font-medium">{items.name}</div>
        <div className="text-sm mb-3">₹ {items?.price ? (items?.price / 100) : (items?.defaultPrice / 100)} </div>
        <div className="text-xs text-gray-500">{items?.description}</div>
    </div>
}


export default ItemsList;