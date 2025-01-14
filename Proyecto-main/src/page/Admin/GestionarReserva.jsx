import { useEffect, useState } from 'react';
import { MenuAdmin } from '../../componentes/Menu';
import axios from 'axios';
import './Gestionar.css';
import DataTable from 'react-data-table-component';
import { API_BASE_URL } from '../../environment';
import Favicon from 'react-favicon';
export const GestionarReserva = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/reserva/get`);
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error en la data: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/reserva/update/${id}`, { estado: newStatus });
            console.log('Response:', response.data);

            const updatedData = data.map(item =>
                item.id === id ? { ...item, estado: newStatus } : item
            );
            setData(updatedData);
        } catch (error) {
            console.error('Error al actualizar el estado: ', error);
        }
    };

    const handleDelete = (id) => {
        updateStatus(id, 'CANCELADA');
    };

    const handleAccept = (id) => {
        updateStatus(id, 'ACEPTADA');
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email?.email,
            sortable: true
        },
        {
            name: 'Fecha',
            selector: row => row.fecha,
            sortable: true
        },
        {
            name: 'Lugar',
            selector: row => row.local?.nombre,
            sortable: true
        },
        {
            name: 'Paquete',
            selector: row => row.paquete?.nombre,
            sortable: true
        },
        {
            name: 'Categoria',
            selector: row => row.categoria?.descripcion,
            sortable: true
        },
        {
            name: 'Precio',
            selector: row => row.precio,
            sortable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sortable: true
        },
        {
            name: 'Acciones',
            cell: row => (

                <div>
                    <div>
                        <button className='btnprimary' onClick={() => handleAccept(row.id)}>Aceptar</button>
                    </div>
                    <div>
                        <button className='btnprimary1' onClick={() => handleDelete(row.id)}>Eliminar</button>
                    </div>

                </div>

            )
        }
    ];

    return (
        <div className='reserva'>
            <MenuAdmin />
            <div className="header2">
                <p className='texto'>Gestionar Reservas</p>
            </div>
            <div >

            </div>
            <div>
        <Favicon url="/images/eas.png" />
       
      </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    fixedHeader
                    
                />
            )}
        </div>
    );
};