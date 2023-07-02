import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import React ,{useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import { data } from 'jquery';


const baseUrl = "http://localhost:3001";

export default function ListGenero(){

    const [dataGenero, setdataGenero] = useState([]);

    useEffect(() => {
        LoadGenero();
    }, []);

    function LoadGenero() {
        const url = baseUrl + "/genero/list";
        axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setdataGenero(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert(error)
        });
    }

    return (
        <table className="table table-hover table-striped">
            <thead className = "thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Genero</th>
                </tr>
            </thead>
            <tbody>
                <LoadFillData/>
            </tbody>
        </table>
    );

    function LoadFillData(){
        return dataGenero.map((data, index) => {
            return(
            <tr key = {index}>
                <th>{index + 1}</th>
                <td>{data.description}</td>
                <td>
                    <Link className='btn btn-outline-info' to = {"/genero/update/" + data.id}>Update</Link>
                </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={() => onDelete(data.id)}>Delete</button>
                </td>
            </tr>
        )
        });
    }

    function onDelete(genero) {
        Swal.fire({
            title: 'Tem a certeza?',
            text: 'Nao vai ser possivel recuperar!',
            type: 'Warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Nao, manter!'
        }).then((result) => {
            if (result.value) {
                sendDelete(genero)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                'Cancelado',
                'O genero nao foi apagado',
                'error'
                )
            }
        })
    }

    function sendDelete(genero) {
        const url = baseUrl + "/genero/delete/" + genero
        axios.put(url)
        .then(response =>{
            if (response.data.success){
                Swal.fire(
                    'Apagado!',
                    'Genero foi removido.',
                    'successo'
                )
                LoadGenero();
            }
            else{
                Swal.fire(
                    'Cancelado',
                    'O genero foi asociado a um filme!',
                    'error'
                )
            }
        })
        .catch ( error => {
            alert("Error 325 ")
        });
    }
}