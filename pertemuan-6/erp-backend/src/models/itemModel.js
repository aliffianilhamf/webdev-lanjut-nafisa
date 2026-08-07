let inventory = [{ id: 1, name: "Laptop", price: 1000, stock: 10 }];

// buat fungsi fungsi untuk memanipulasi data inventory
function find() {
  return inventory;
}

function findById(id) {
  return inventory.find((item) => item.id === id);
}

function add(item) {
  const newItem = {
    id: inventory.length + 1,
    name: item.name,
    price: item.price,
    stock: item.stock ? item.stock : 0,
  };
  inventory.push(newItem);
  return newItem;
}

function update(id, updatedItem) {
  const itemIndex = inventory.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    inventory[itemIndex] = {
      id: id,
      name: updatedItem.name,
      price: updatedItem.price,
      stock: updatedItem.stock,
    };
    return inventory[itemIndex];
  }
  return null;
}

function del(id) {
  const itemIndex = inventory.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    const deletedItem = inventory[itemIndex];
    inventory.splice(itemIndex, 1);
    return deletedItem;
  }
  return null;
}

module.exports = {
  find,
  findById,
  add,
  update,
  del,
};
