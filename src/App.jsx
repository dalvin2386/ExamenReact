import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalEmpleado from './components/ModalEmpleado';
import Swal from 'sweetalert2';



const App = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formulario, setFormulario] = useState({ nombre: '', dni: '', direccion: '', email: '' });

  const cargarEmpleados = async () => {
    try {
      const res = await axios.get('https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado');
      setEmpleados(res.data);
    } catch (error) {//no pude solucionar este error
      Swal.fire('Error', 'No se pudieron cargar los empleados', 'error');
    }
  };

  const guardarEmpleado = async () => {
    try {
      await axios.post('https://674c84c054e1fca9290cd05f.mockapi.io/api/examen/empleado', formulario);
      Swal.fire('Éxito', 'Empleado guardado correctamente', 'success');
      setFormulario({ nombre: '', dni: '', direccion: '', email: '' });
      setMostrarModal(false);
      cargarEmpleados();
    } catch (error) {//no pude solucionar este error
      Swal.fire('Error', 'No se pudo guardar el empleado', 'error');
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center text-primary"> Lista de Empleados</h2>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-outline-primary" onClick={setMostrarModal}>
            <i className="fas fa-user-plus me-2"></i>Nuevo Empleado
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle text-center">
            <thead className="table-primary">
              <tr>
                <th>Nombre </th>
                <th>DNI </th>
                <th>Dirección </th>
                <th>Email </th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.nombre}</td>
                  <td>{emp.dni}</td>
                  <td>{emp.direccion}</td>
                  <td>{emp.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalEmpleado
        show={mostrarModal}
        onClose={() => setMostrarModal(false)}
        form={formulario}
        setForm={setFormulario}
        onSubmit={guardarEmpleado}
      />
    </div>
  );
};

export default App;
