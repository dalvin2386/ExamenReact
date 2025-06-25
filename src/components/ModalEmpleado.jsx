import React from 'react';
import Entrada from './Entrada';
import Swal from 'sweetalert2';

const ModalEmpleado = ({ show, onClose, form, setForm, onSubmit }) => {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    if (!form.nombre || !form.dni || !form.direccion || !form.email) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    onSubmit();
  };

  return (
    show && (
      <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Añadir Empleado</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <Entrada label="Nombre" type="text" name="nombre" value={form.nombre} onChange={handleChange} />
              <Entrada label="DNI" type="text" name="dni" value={form.dni} onChange={handleChange} />
              <Entrada label="Dirección" type="text" name="direccion" value={form.direccion} onChange={handleChange} />
              <Entrada label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline-secondary" onClick={onClose}>
                <i className="fas fa-times me-1"></i>Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleGuardar}>
                <i className="fas fa-save me-1"></i>Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalEmpleado;
