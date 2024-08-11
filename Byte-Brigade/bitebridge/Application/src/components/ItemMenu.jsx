import React, { useState } from 'react';
import './styles/ItemMenu.css'; // Import the CSS file

const ItemMenu = () => {
  // Initial test data for the table
  const initialData = [
    { name: 'Item 1', price: 10.0, quantity: 1, admin_id: 101, selected: false },
    { name: 'Item 2', price: 20.0, quantity: 2, admin_id: 102, selected: false },
    { name: 'Item 3', price: 30.0, quantity: 3, admin_id: 103, selected: false },
  ];

  const [items, setItems] = useState(initialData);
  const [formData, setFormData] = useState({ name: '', price: '', quantity: '', admin_id: '' });
  const [action, setAction] = useState(''); // 'add', 'update', or 'delete'
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleActionChange = (newAction) => {
    if (action === newAction) {
      // If the same action button is clicked, toggle the form off
      setAction('');
      setFormData({ name: '', price: '', quantity: '', admin_id: '' });
      setSelectedIndex(null);
    } else {
      setAction(newAction);
      if (newAction === 'add') {
        setFormData({ name: '', price: '', quantity: '', admin_id: '' });
        setSelectedIndex(null);
      } else if (newAction === 'update') {
        if (selectedIndex !== null) {
          setFormData(items[selectedIndex]);
        } else {
          setFormData({ name: '', price: '', quantity: '', admin_id: '' });
        }
      } else if (newAction === 'delete') {
        setFormData({ name: '' });
        setSelectedIndex(null);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === 'add') {
      const newItem = {
        name: formData.name,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity, 10),
        admin_id: parseInt(formData.admin_id, 10),
        selected: false, // New items start unselected
      };
      setItems(prevItems => [...prevItems, newItem]);
    } else if (action === 'update' && selectedIndex !== null) {
      setItems(prevItems =>
        prevItems.map((item, index) =>
          index === selectedIndex
            ? {
                ...item,
                name: formData.name,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity, 10),
                admin_id: parseInt(formData.admin_id, 10),
              }
            : item
        )
      );
    } else if (action === 'delete') {
      setItems(prevItems => prevItems.filter(item => !item.selected));
    }
    // Reset form and action after submission
    setFormData({ name: '', price: '', quantity: '', admin_id: '' });
    setAction('');
    setSelectedIndex(null);
  };

  const handleCheckboxChange = (index) => {
    setItems(prevItems =>
      prevItems.map((item, idx) =>
        idx === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <div className="item-menu-container">
      <div className="button-group">
        <button onClick={() => handleActionChange('add')}>Add Item</button>
        <button onClick={() => handleActionChange('delete')}>Delete Items</button>
        <button onClick={() => handleActionChange('update')}>Update Item</button>
      </div>

      {action && (
        <div className="form-container">
          <h2>{action.charAt(0).toUpperCase() + action.slice(1)} Item</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </label>
            {action !== 'delete' && (
              <>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Admin ID:
                  <input
                    type="number"
                    name="admin_id"
                    value={formData.admin_id}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </>
            )}
            <button className='itemMenu' type="submit">{action.charAt(0).toUpperCase() + action.slice(1)}</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Admin ID</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                if (action === 'update') {
                  setFormData(items[index]);
                }
              }}
              className={selectedIndex === index ? 'selected' : ''}
            >
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>{item.admin_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemMenu;
