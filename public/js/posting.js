const newFormHandler = async (event) => {
    event.preventDefault();
  
    const make = document.querySelector('#make').value.trim();
    const model = document.querySelector('#model').value.trim();
    const year = document.querySelector('#year').value.trim();
    const color = document.querySelector('#color').value.trim();
    const isLuxury = document.querySelector('#is-luxury').checked;
    const bodyType = document.querySelector('#body-type').value.trim();
    const fuelType = document.querySelector('#fuel-type').value.trim();
    const seatingCapacity = document.querySelector('#seating-capacity').value.trim();
    const isAutomatic = document.querySelector('#is-automatic').checked;
    const filename = document.querySelector('#filename').value.trim();
  
    if (make && model && year && color && bodyType && fuelType && seatingCapacity && filename) {
      const response = await fetch(`/api/cars`, {
        method: 'POST',
        body: JSON.stringify({
          make,
          model,
          year,
          color,
          is_luxury: isLuxury,
          body_type: bodyType,
          fuel_type: fuelType,
          seating_capacity: seatingCapacity,
          is_automatic: isAutomatic,
          filename,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/cars');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const make = document.querySelector('#update-make').value.trim();
      const model = document.querySelector('#update-model').value.trim();
      const year = document.querySelector('#update-year').value.trim();
      const color = document.querySelector('#update-color').value.trim();
      const isLuxury = document.querySelector('#update-is-luxury').checked;
      const bodyType = document.querySelector('#update-body-type').value.trim();
      const fuelType = document.querySelector('#update-fuel-type').value.trim();
      const seatingCapacity = document.querySelector('#update-seating-capacity').value.trim();
      const isAutomatic = document.querySelector('#update-is-automatic').checked;
      const filename = document.querySelector('#update-filename').value.trim();
  
      const updatedCar = {
        make,
        model,
        year,
        color,
        is_luxury: isLuxury,
        body_type: bodyType,
        fuel_type: fuelType,
        seating_capacity: seatingCapacity,
        is_automatic: isAutomatic,
        filename,
      };
  
      const response = await fetch(`/api/cars/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedCar),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update post');
      }
    }
  };
  
  document.querySelector('.new-car-form').addEventListener('submit', newFormHandler);