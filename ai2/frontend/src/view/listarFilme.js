import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const baseUrl = "http://localhost:3001";

export default function ListFilme() {
    const [Filme, setFilme] = useState([]);


    useEffect(() => {
        LoadFilme()
    }, []);

    function LoadFilme() {
        const url = baseUrl + '/filmes/list';

        axios.get(url)
            .then(res => {
                if (res.data.success === true) {
                    const data = res.data.data;
                    setFilme(data);
                    console.log(data);
                }
                else {
                    alert("Error Web Service!");
                }
            })
            .catch(error => {
                alert(error)
            });
    }
    return (
        <table className="table table-hover table-striped">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">photo</th>
                    <th scope="col">descriçao</th>
                    <th scope="col">Genero</th>
                </tr>
            </thead>

            <tbody>
                <LoadFillData />
            </tbody>
        </table>
    );

    function LoadFillData() {
        return Filme.map((data, index) => {
            console.log(data);
            const Imagepath = data.photo;
            return (
                <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{data.titulo}</td>
                    <td>
                        <img src={Imagepath} style={{width: '50px',height: '50px'}}/>
                        </td>   
                    <td>{data.description}</td>
                    <td>{data.genero.description}</td>
                    
                    <td>
                    <button className='btn btn-outline-info' onClick={() => {window.location.href="/filmes/update/" + data.id}}> Editar</button>
                    </td>
                    <td>
                        <button className='btn btn-outline-danger' onClick={() => onDelete(data.id)}>apagar</button>
                    </td>
                </tr>
            )
        });
    }

    function onDelete(filme) {
        Swal.fire({
            title: 'Tem a certeza?',
            text: 'Nao vai ser possivel o rever apos!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, apagar',
            cancelButtonText: 'Nao, manter'
        }).then((resultado) => {
            console.log(resultado);
           
            
            if (resultado.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Filme nao foi apagado',
                    'error'
                )
            
            }
            else(sendDelete(filme))
        })
    }

    function sendDelete(filme) {
        const url = baseUrl + "/filmes/delete/" + filme
        console.log(url)
        axios.get(url)
            .then(response => {
                    Swal.fire(
                        'Apagado!',
                        'O filme foi removido',
                        'successo'
                    )
                    LoadFilme();
            })
            .catch(error => {
                alert("Error 325 ")
            });
    }
}